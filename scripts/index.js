/* eslint-disable no-console, import/extensions */

import 'dotenv/config';
import compareAsc from 'date-fns/compareAsc/index.js';
import parseISO from 'date-fns/parseISO/index.js';
import GithubClient from './lib/github/client.js';
import db from './lib/db/index.js';

const { GITHUB_ACCESS_TOKEN } = process.env;
const { GITHUB_ORG } = process.env;
const REPO_NAMES = (process.env.REPO_NAMES || []).split(',');
const githubClient = new GithubClient(GITHUB_ACCESS_TOKEN);

const saveCommitToDB = (commitObj, orgName, repoName) => {
  const { author, commit, sha } = commitObj;

  const commitData = {
    author: author ? author.id : 0,
    message: commit.message,
    sha,
    orgName,
    repoName,
  };

  commitData.createdAt = commit.committer.date;
  db.data.commits.push(commitData);

  if (author) {
    const dbAuthor = db.data.authors.find(
      authorObj => authorObj.id === author.id
    );
    if (!dbAuthor) {
      db.data.authors.push({
        id: author.id,
        login: author.login,
        avatarUrl: author.avatar_url,
        commitsCount: 1,
        firstCommitAt: commitData.createdAt,
        lastCommitAt: commitData.createdAt,
      });
    } else {
      if (
        compareAsc(
          parseISO(dbAuthor.firstCommitAt),
          parseISO(commitData.createdAt)
        ) < 0
      ) {
        dbAuthor.firstCommitAt = commitData.createdAt;
      }

      if (
        compareAsc(
          parseISO(commitData.createdAt),
          parseISO(dbAuthor.lastCommitAt)
        ) < 0
      ) {
        dbAuthor.lastCommitAt = commitData.createdAt;
      }

      dbAuthor.commitsCount += 1;
    }
  }
};

const fetchCommits = async (page, orgName, repoName) => {
  console.log(`[FETCH]: ${orgName}/${repoName} - page ${page}`);
  try {
    const { data: commits } = await githubClient.getCommits(
      page,
      orgName,
      repoName
    );
    commits.forEach(commitObj => {
      const dbCommit = db.data.commits.find(
        commit => commitObj.sha === commit.sha
      );
      if (!dbCommit) {
        saveCommitToDB(commitObj, orgName, repoName);
      }
    });
    db.write();
    if (commits.length === 100) {
      await fetchCommits(page + 1, orgName, repoName);
    }
  } catch (e) {
    console.log(e);
  }
};

db.data = { commits: [], authors: [] };

const fetchCommitPromises = [];
REPO_NAMES.forEach(repo => {
  fetchCommitPromises.push(fetchCommits(1, GITHUB_ORG, repo));
});

Promise.all(fetchCommitPromises)
  .then(() => {
    console.log(`[FETCH]: Repo Count - ${REPO_NAMES.length}`);
    console.log(`[FETCH]: Commits Count - ${db.data.commits.length}`);
    console.log(`[FETCH]: Authors Count - ${db.data.authors.length}`);
    console.log('[FETCH]: Fetching data complete');
  })
  .catch(e => {
    console.log(e);
  });
