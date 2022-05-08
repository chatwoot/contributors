import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import { compareAsc } from 'date-fns';
import db from '../../lib/db';
import AuthorCommits from '../../components/AuthorCommits';
import SectionHeader from '../../components/SectionHeader';
import contributorsConfig from '../../../contributors.config';

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
        <title>
          {contributorsConfig.siteMetadata.title} - {author.login}
        </title>
      </Head>
      <SectionHeader
        backButtonLink="/"
        title={`Showing all contributions from <strong>${author.login}</strong>`}
      />
      <section className="items-center justify-center px-12 hidden lg:flex">
        <table className="table-auto min-w-3xl text-brand-600">
          <thead>
            <tr className="text-left text-lg font-semibold text-brand-700">
              <th className="p-4 pr-8">#</th>
              <th className="p-4 pr-8">Commit Details</th>
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
      <section className="block lg:hidden text-brand-600 ">
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
