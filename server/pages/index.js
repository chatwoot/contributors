import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import db from '../lib/db';

export async function getServerSideProps() {
  await db.read();
  const authors = db.data ? db.data.authors : [];
  const authorsWithoutBots = authors.filter(
    author => !author.login.includes('bot')
  );

  return {
    props: {
      contributors: authorsWithoutBots.sort(
        (a, b) => b.commitsCount - a.commitsCount
      ),
    },
  };
}

const getParsedDate = date => {
  if (!date) {
    return '';
  }

  const parsedDate = format(parseISO(date), 'MMM dd, yyyy');
  return parsedDate;
};

export default function Home({ contributors }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Chatwoot Contributors</title>
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
          Showing all <strong>{contributors.length} contributors 🌈</strong>
        </h3>
      </section>

      <section className="flex  items-center justify-center px-24 py-8">
        <table className="table-auto  min-w-3xl bg-chennai-100  border-2 text-varakala-700 font-semibold border-madiwala-600 drop-shadow-flat">
          <thead>
            <tr>
              <th className="p-4 pr-8 text-left text-lg font-bold text-chennai-800">
                #
              </th>
              <th className="p-4 pr-8 text-left text-lg font-bold text-chennai-800">
                Name
              </th>
              <th className="p-4 pr-12 text-left text-lg font-bold text-chennai-800">
                Since
              </th>
              <th className="p-4  text-right text-lg font-bold text-chennai-800">
                Commits
              </th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor, index) => (
              <tr key={contributor.id}>
                <td className="px-4">{`#${index + 1}`}</td>
                <td className="px-4 py-2 text-left">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center"
                    href={`/contributors/${contributor.login}`}
                  >
                    <div className="flex items-center">
                      <Image
                        alt={`Profile picture of ${contributor.login}`}
                        src={contributor.avatarUrl}
                        width="20"
                        height="20"
                        className="rounded-full"
                      />
                    </div>
                    <span className="pl-2 underline text-ulsoor-700">
                      {contributor.login}
                    </span>
                  </a>
                </td>
                <td className="px-4 py-2 text-left text-ulsoor-700  font-semibold">
                  {getParsedDate(contributor.firstCommitAt)}
                </td>
                <td className="px-4 py-2 text-right text-ulsoor-700  font-semibold">
                  <Link href={`/contributors/${contributor.login}`}>
                    <a className="pl-2 hover:underline text-ulsoor-700">
                      {contributor.commitsCount}
                    </a>
                  </Link>
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
  contributors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
