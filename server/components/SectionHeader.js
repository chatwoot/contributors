/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

export default function SectionHeader({ title }) {
  return (
    <section className="flex items-center justify-center text-center px-4 md:px-24 pt-4 pb-12">
      <h3
        className="text-2xl md:text-3xl font-medium text-chennai-800"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </section>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
