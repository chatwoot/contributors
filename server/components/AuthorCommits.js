import React from 'react';
import PropTypes from 'prop-types';
import { getParsedDate, trimMessage } from '../helpers';

function AuthorCommits({
  sha,
  position,
  orgName,
  repoName,
  message,
  createdAt,
}) {
  return (
    <tr key={sha}>
      <td className="px-4">{`#${position}`}</td>
      <td className="px-4 py-2 text-left">
        <a
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center underline text-chennai-700"
          href={`https://github.com/${orgName}/${repoName}/commit/${sha}`}
        >
          {trimMessage(message)}
        </a>
      </td>
      <td className="px-4 py-2 text-left text-chennai-700">
        {getParsedDate(createdAt)}
      </td>

      <td className="px-4 py-2 text-left text-chennai-700">
        {`${orgName}/${repoName}`}
      </td>
    </tr>
  );
}

AuthorCommits.propTypes = {
  createdAt: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  repoName: PropTypes.string.isRequired,
  sha: PropTypes.string.isRequired,
};

export default AuthorCommits;
