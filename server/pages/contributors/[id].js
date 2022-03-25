import Head from 'next/head';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { compareAsc } from 'date-fns';
import db from '../../lib/db';

export async function getServerSideProps(context) {
  await db.read();
  const { id } = context.params;

  const authors = db.data ? db.data.authors : [];
  const commits = db.data ? db.data.commits : [];
  const author = authors.find(a => a.login === id) || {};
  const authorCommits = commits
    .filter(c => c.author === author.id)
    .sort((c1, c2) =>
      compareAsc(parseISO(c2.createdAt), parseISO(c1.createdAt))
    );
  return {
    props: {
      author,
      authorCommits,
    },
  };
}
export const trimMessage = (content = '', maxLength = 60) => {
  if (content.length > maxLength) {
    return `${content.substring(0, maxLength)}...`;
  }
  return content;
};

const getParsedDate = date => {
  if (!date) {
    return '';
  }

  const parsedDate = format(parseISO(date), 'MMM dd, yyyy');
  return parsedDate;
};

export default function Home({ authorCommits, author }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Chatwoot Contributors - {author.login}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header />
      <section className="flex flex-col items-center justify-center p-8 pt-16 text-center">
        <h1 className="text-4xl text-madiwala-900 font-bold mb-4">
          We thank all our contributors.
        </h1>
        <p className="text-lg mb-8 text-madiwala-800 max-w-lg ml-auto mr-auto">
          Chatwoot would not have been what it is today without the help of our
          amazing contributors.
        </p>
        <div className="py-4">
          <a
            href="https://github.com/chatwoot/chatwoot"
            className="px-4 py-2 border-2 text-madiwala-700 font-semibold border-madiwala-600 bg-varakala-100 drop-shadow-flat mr-4"
          >
            🐙 See us on GitHub
          </a>
          <a
            href="https://www.chatwoot.com/docs/contributing-guide"
            className="px-4 py-2 border-2 text-chennai-700 font-semibold border-madiwala-600 bg-varakala-100 drop-shadow-flat mr-4"
          >
            📚 How to contribute
          </a>
          <a
            href="https://github.com/sponsors/chatwoot"
            className="px-4 py-2 border-2 text-varakala-700 font-semibold border-madiwala-600 bg-varakala-100 drop-shadow-flat"
          >
            ❤️ Sponsor us
          </a>
        </div>
      </section>
      <section className="flex  items-center justify-center px-24 py-4">
        <h3 className="text-3xl font-bold text-chennai-800">
          Showing all contributions of <strong>{author.login} </strong>
        </h3>
      </section>

      <section className="flex  items-center justify-center px-24 py-8">
        <table className="table-auto  min-w-3xl bg-chennai-100  border-2 text-varakala-700 border-madiwala-600 drop-shadow-flat">
          <thead>
            <tr>
              <th className="p-4 pr-8 text-left text-lg font-semibold text-chennai-800">
                #
              </th>
              <th className="p-4 pr-8 text-left text-lg font-semibold text-chennai-800">
                Message
              </th>
              <th className="p-4 pr-12 text-left text-lg font-semibold text-chennai-800">
                Date
              </th>
              <th className="p-4  text-left text-lg font-semibold text-chennai-800">
                Repo
              </th>
            </tr>
          </thead>
          <tbody>
            {authorCommits.map((commit, index) => (
              <tr key={commit.sha}>
                <td className="px-4">{`#${index + 1}`}</td>
                <td className="px-4 py-2 text-left">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center underline text-ulsoor-700"
                    href={`https://github.com/${commit.orgName}/${commit.repoName}/${commit.sha}`}
                  >
                    {trimMessage(commit.message)}
                  </a>
                </td>
                <td className="px-4 py-2 text-left text-ulsoor-700">
                  {getParsedDate(commit.createdAt)}
                </td>

                <td className="px-4 py-2 text-left text-ulsoor-700">
                  {`${commit.orgName}/${commit.repoName}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

Home.propTypes = {
  authorCommits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  author: PropTypes.shape({ login: PropTypes.string }).isRequired,
};
