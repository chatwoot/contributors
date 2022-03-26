import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import compareAsc from 'date-fns/compareAsc';
import db from '../lib/db';
import ContributorRow from '../components/ContributorRow';
import SectionHeader from '../components/SectionHeader';

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
      <SectionHeader
        title={`Showing all <strong>${contributors.length}</strong> contributors`}
      />

      <section className="items-center justify-center px-24 hidden md:flex">
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
                isMobile={false}
              />
            ))}
          </tbody>
        </table>
      </section>
      <section className="block md:hidden bg-chennai-100  border-2 text-chennai-700 border-chennai-600 drop-shadow-flat">
        {contributors.map((contributor, index) => (
          <ContributorRow
            {...contributor}
            position={index + 1}
            key={contributor.id}
            isMobile
          />
        ))}
      </section>
    </div>
  );
}

ContributorsList.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
