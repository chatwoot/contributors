import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import compareAsc from 'date-fns/compareAsc';
import db from '../lib/db';
import ContributorRow from '../components/ContributorRow';

export async function getStaticProps() {
  const authors = db.data ? db.data.authors : [];
  const authorsWithoutBots = authors.filter(
    author => !author.login.includes('bot')
  );

  return {
    props: {
      contributors: authorsWithoutBots.sort((a1, a2) => {
        const diff = a2.commitsCount - a1.commitsCount;
        if (!diff) {
          return compareAsc(
            parseISO(a2.lastCommitAt),
            parseISO(a1.lastCommitAt)
          );
        }
        return diff;
      }),
    },
  };
}
export default function ContributorsList({ contributors }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Chatwoot Contributors</title>
      </Head>
      <section className="flex  items-center justify-center px-24 py-4">
        <h3 className="text-3xl font-medium text-chennai-800">
          Showing all <strong>{contributors.length} contributors </strong>
        </h3>
      </section>

      <section className="flex  items-center justify-center px-24 py-8">
        <table className="table-auto min-w-3xl bg-chennai-100  border-2 text-chennai-700 border-chennai-600 drop-shadow-flat">
          <thead className="font-semibold">
            <tr>
              <th className="p-4 text-left text-lg text-chennai-800">#</th>
              <th className="p-4 text-left text-lg text-chennai-800">Name</th>
              <th className="p-4 pr-12 text-left text-lg text-chennai-800">
                Since
              </th>
              <th className="p-4  text-right text-lg text-chennai-800">
                Commits
              </th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor, index) => (
              <ContributorRow
                {...contributor}
                position={index + 1}
                key={contributor.id}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

ContributorsList.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
