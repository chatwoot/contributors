import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import { compareAsc } from 'date-fns';
import db from '../../lib/db';
import AuthorCommits from '../../components/AuthorCommits';

export async function getServerSideProps(context) {
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
export default function ContributorCommits({ authorCommits, author }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Chatwoot Contributors - {author.login}</title>
      </Head>
      <section className="flex items-center justify-center px-24 py-4">
        <h3 className="text-3xl font-medium text-chennai-800">
          Showing all contributions of <strong>{author.login} </strong>
        </h3>
      </section>
      <section className="flex items-center justify-center px-24 py-8">
        <table className="table-auto  min-w-3xl bg-chennai-100  border-2 text-chennai-700 border-chennai-600 drop-shadow-flat">
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
              <AuthorCommits
                {...commit}
                position={index + 1}
                key={commit.sha}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

ContributorCommits.propTypes = {
  authorCommits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  author: PropTypes.shape({ login: PropTypes.string }).isRequired,
};
