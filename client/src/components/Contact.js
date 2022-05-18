/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function Contact({ name, email, phoneNumber }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(!clicked);
  };
  return (
    <div role="cell" onClick={handleClick} className="contact-card">
      {
        clicked ? (
          <>
            <p>
              Name:
              {` ${name}`}
            </p>
            <p>
              Email:
              {` ${email}`}
            </p>
            <p>
              Phone:
              {` ${phoneNumber}`}
            </p>
          </>
        ) : <p className="contact-name">{name}</p>
      }
    </div>
  );
}

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
