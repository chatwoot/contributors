import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import { compareAsc } from 'date-fns';
import db from '../../lib/db';
import AuthorCommits from '../../components/AuthorCommits';
import SectionHeader from '../../components/SectionHeader';

export async function getStaticProps(context) {
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

export async function getStaticPaths() {
  const authors = db.data ? db.data.authors : [];

  return {
    paths: authors.map(author => ({
      params: { id: author.login },
    })),
    fallback: false,
  };
}
export default function ContributorCommits({ authorCommits, author }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Chatwoot Contributors - {author.login}</title>
      </Head>
      <SectionHeader
        title={`Showing all contributions from <strong>${author.login}</strong>`}
      />
      <section className="items-center justify-center px-24 hidden md:flex">
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
                isMobile={false}
              />
            ))}
          </tbody>
        </table>
      </section>
      <section className="block md:hidden bg-chennai-100  border-2 text-chennai-700 border-chennai-600 drop-shadow-flat">
        {authorCommits.map((commit, index) => (
          <AuthorCommits
            {...commit}
            position={index + 1}
            key={commit.sha}
            isMobile
          />
        ))}
      </section>
    </div>
  );
}

ContributorCommits.propTypes = {
  authorCommits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  author: PropTypes.shape({ login: PropTypes.string }).isRequired,
};
