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
  isMobile,
}) {
  return !isMobile ? (
    <tr
      key={sha}
      className="border-b border-solid border-brand-100 text-brand-600"
    >
      <td className="px-4">{`#${position}`}</td>
      <td className="px-4 py-3 text-left">
        <a
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center underline text-brand-600"
          href={`https://github.com/${orgName}/${repoName}/commit/${sha}`}
        >
          {trimMessage(message)}
        </a>
        <span className="w-100 flex justify-between">
          <span>{`${orgName}/${repoName}`}</span>
          <span>{getParsedDate(createdAt)}</span>
        </span>
      </td>
    </tr>
  ) : (
    <div className="py-4 border-b border-solid border-brand-100 text-brand-600">
      <div className="px-4">{`#${position}`}</div>
      <div className="px-4 py-1 text-left">
        <a
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center underline text-brand-600"
          href={`https://github.com/${orgName}/${repoName}/commit/${sha}`}
        >
          {trimMessage(message, 100)}
        </a>

        {`${orgName}/${repoName}`}
      </div>
      <div className="flex justify-between">
        <div className="px-4 py-2 text-left text-brand-600">
          {getParsedDate(createdAt)}
        </div>
      </div>
    </div>
  );
}

AuthorCommits.propTypes = {
  createdAt: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  repoName: PropTypes.string.isRequired,
  sha: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default AuthorCommits;
