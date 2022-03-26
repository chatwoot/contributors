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
}) {
  return (
    <tr key={id} className="border-b border-solid border-chennai-200">
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
            <span className="pl-2 underline text-chennai-700">{login}</span>
          </a>
        </Link>
      </td>
      <td className="px-4 py-4 text-left text-chennai-700">
        {getParsedDate(firstCommitAt)}
      </td>
      <td className="px-4 py-4 text-right text-chennai-700">
        <Link href={`/contributors/${login}`}>
          <a
            className="pl-2 hover:underline text-chennai-700"
            href={`/contributors/${login}`}
          >
            {commitsCount}
          </a>
        </Link>
      </td>
    </tr>
  );
}

ContributorRow.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  firstCommitAt: PropTypes.string.isRequired,
  commitsCount: PropTypes.number.isRequired,
};

export default ContributorRow;
