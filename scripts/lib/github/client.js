import { Octokit } from '@octokit/core';

const BASE_URL = 'https://api.github.com';

class GithubClient {
  constructor(accessToken) {
    this.client = new Octokit({ auth: accessToken });
  }

  getCommits(page = 1, orgName = '', repoName = '') {
    const url = `${BASE_URL}/repos/${orgName}/${repoName}/commits`;
    return this.client.request(url, {
      owner: this.organizationName,
      repo: this.repoName,
      per_page: 100,
      page,
    });
  }
}

export default GithubClient;
