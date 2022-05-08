import Link from 'next/link';
import PropTypes from 'prop-types';
import { getParsedDate } from '../helpers';

function ContributorRow({
  id,
  position,
  login,
  avatarUrl,
  firstCommitAt,
  commitsCount,
  isMobile,
}) {
  return (
    <>
      {!isMobile && (
        <tr key={id} className="border-b border-solid border-brand-100">
          <td className="px-4 py-4 ">{`#${position}`}</td>
          <td className="px-4 py-4 text-left">
            <Link href={`/contributors/${login}`}>
              <a className="flex items-center" href={`/contributors/${login}`}>
                <div className="flex items-center">
                  <img
                    alt={`Profile of ${login}`}
                    src={avatarUrl}
                    width="32"
                    height="32"
                    className="rounded-full"
                  />
                </div>
                <span className="pl-2 underline text-brand-600">{login}</span>
              </a>
            </Link>
          </td>
          <td className="flex-3 px-4 py-4 text-left text-brand-600">
            {getParsedDate(firstCommitAt)}
          </td>
          <td className="flex-2 px-4 py-4 text-right text-brand-600">
            <Link href={`/contributors/${login}`}>
              <a
                className="pl-2 hover:underline text-brand-600"
                href={`/contributors/${login}`}
              >
                {commitsCount}
              </a>
            </Link>
          </td>
        </tr>
      )}
      <div className="block lg:hidden p-4 border-b border-solid border-brand-100">
        <div className="flex flex-row items-center">
          <div className="mr-2 w-6">{`#${position}`}</div>
          <Link href={`/contributors/${login}`}>
            <a className="flex" href={`/contributors/${login}`}>
              <div className="flex items-center pl-2 pr-4">
                <img
                  alt={`Profile of ${login}`}
                  src={avatarUrl}
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="underline text-brand-600">{login}</span>
                <div className="flex flex-row">
                  <Link href={`/contributors/${login}`}>
                    <a
                      className="mt-1 text-brand-600"
                      href={`/contributors/${login}`}
                    >
                      <span className="font-semibold">{commitsCount}</span>
                      {` commits since`}&nbsp;
                      <span className="text-left font-semibold text-brand-600 mr-4">
                        {getParsedDate(firstCommitAt)}
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

ContributorRow.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  firstCommitAt: PropTypes.string.isRequired,
  commitsCount: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ContributorRow;
