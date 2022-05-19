/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';

export default function Contact({
  name, email, phoneNumber, contactId,
}) {
  const [clicked, setClicked] = useState(false);
  const { token, setContacts, contacts } = useContext(Context);
  const toastOption = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClick = async () => {
    setClicked(!clicked);
  };
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/contact/${contactId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const newList = contacts.filter(({ contactId: id }) => id !== contactId);
      setContacts(newList);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
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
            <button onClick={handleDelete} type="button" className="btn btn-danger">Deletar</button>
          </>
        ) : <p className="contact-name">{name}</p>
      }
    </div>
  );
}

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  contactId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
