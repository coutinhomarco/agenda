import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Contact from '../components/Contact';
import NewContact from '../components/NewContact';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';

export default function Agenda() {
  const [newContact, setNewContact] = useState(false);
  const {
    token, contacts, setContacts, userDetails,
  } = useContext(Context);
  const toastOption = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(async () => {
    try {
      if (token) {
        const fetchData = await fetch('http://localhost:3001/contact', { headers: { Authorization: `Bearer ${token}` } });
        const jsonData = await fetchData.json();
        console.log(jsonData);
        setContacts(jsonData);
      }
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  }, []);
  const handleClick = async () => {
    setNewContact(!newContact);
  };
  return (
    <>
      <header className="agenda-header">
        <h1>
          {userDetails.name}
          &apos;s contacts
        </h1>
        <button className="btn btn-primary" onClick={handleClick} type="button">New contact</button>
      </header>
      <main>
        <div className="agenda-main">
          {newContact && (
          <section className="new-contact-section">
            <NewContact />
          </section>
          )}
          <aside className="center">
            {contacts.map(({
              name, email, phoneNumber, contactId,
            }) => (
              <Contact
                key={contactId}
                name={name}
                email={email}
                phoneNumber={phoneNumber}
                contactId={contactId}
              />
            ))}
          </aside>
        </div>
      </main>
    </>
  );
}
