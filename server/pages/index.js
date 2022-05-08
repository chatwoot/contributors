import Head from 'next/head';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import compareAsc from 'date-fns/compareAsc';
import db from '../lib/db';
import ContributorRow from '../components/ContributorRow';
import SectionHeader from '../components/SectionHeader';
import ContributorConfig from '../../contributors.config';

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
        <title>{ContributorConfig.siteMetadata.title}</title>
      </Head>
      <SectionHeader
        title={`Showing all <strong>${contributors.length}</strong> contributors`}
      />
      <section className="items-center justify-center px-12 pb-24 hidden lg:flex">
        <table className="table-auto min-w-3xl text-brand-600">
          <thead className="font-semibold text-brand-700">
            <tr>
              <th className="p-4 text-left text-lg">#</th>
              <th className="p-4 text-left text-lg">Name</th>
              <th className="p-4 pr-12 text-left text-lg">Since</th>
              <th className="p-4  text-right text-lg">Commits</th>
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
      <section className="block lg:hidden">
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
