/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

export default function SectionHeader({ title, backButtonLink }) {
  return (
    <section
      className={`flex items-center ${
        backButtonLink ? 'justify-start' : 'justify-center'
      } text-center px-4 lg:px-12 pt-8 pb-8 text-brand-700`}
    >
      {backButtonLink && (
        <a href={backButtonLink}>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer mr-4"
          >
            <path
              d="M10.733 19.79a.75.75 0 0 0 1.034-1.086L5.516 12.75H20.25a.75.75 0 0 0 0-1.5H5.516l6.251-5.955a.75.75 0 0 0-1.034-1.086l-7.42 7.067a.995.995 0 0 0-.3.58.754.754 0 0 0 .001.289.995.995 0 0 0 .3.579l7.419 7.067Z"
              fill="#8d291f"
            />
          </svg>
        </a>
      )}
      <h3
        className="text-lg lg:text-xl font-medium "
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </section>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backButtonLink: PropTypes.string,
};

SectionHeader.defaultProps = {
  backButtonLink: '',
};
