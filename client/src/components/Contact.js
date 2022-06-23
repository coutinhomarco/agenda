/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import toastOption from '../toastifyOptions';

export default function Contact({
  name, email, phoneNumber, contactId,
}) {
  const [clicked, setClicked] = useState(false);
  const {
    setContacts, contacts,
  } = useContext(Context);

  const handleClick = async () => {
    setClicked(!clicked);
  };
  const handleDelete = async () => {
    try {
      const localToken = localStorage.getItem('token');
      const a = await fetch(`http://localhost:3001/contact/${contactId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localToken}` },
      });
      if (a.status !== 200) return toast.error('Contact not deleted', toastOption);
      const newList = contacts.filter(({ contactId: id }) => id !== contactId);
      toast.success('Contact deleted successfully', toastOption);
      return setContacts(newList);
    } catch (error) {
      return toast.error(error.message, toastOption);
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
