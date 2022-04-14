import PropTypes from 'prop-types';
import React from 'react';

export default function Contact({ name, email, phoneNumber }) {
  return (
    <div>
      <p>
        Name:
        {' '}
        <span>{name}</span>
      </p>
      <p>
        Email:
        {' '}
        <span>{email}</span>
      </p>
      <p>
        Phone number:
        {' '}
        <span>{phoneNumber}</span>
      </p>
    </div>
  );
}

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
