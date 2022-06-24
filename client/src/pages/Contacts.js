import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Contact from '../components/Contact';
import NewContact from '../components/NewContact';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';

export default function Agenda() {
  const [newContact, setNewContact] = useState(false);
  const {
    token, contacts, setContacts, userDetails, setToken, setUserDetails,
  } = useContext(Context);
  const history = useHistory();

  useEffect(async () => {
    try {
      const localToken = localStorage.getItem('token');
      const fetchData = await fetch('http://localhost:3001/contact', { headers: { Authorization: `Bearer ${token || localToken}` } });
      const [jsonData] = await fetchData.json();
      const contact = jsonData?.contact;
      if (!userDetails.name) {
        const localUserDetails = localStorage.getItem('userDetails');
        setUserDetails(JSON.parse(localUserDetails));
      }
      setContacts(contact?.sort((a, b) => a.contactId - b.contactId));
      localStorage.setItem('contacts', JSON.stringify(contact?.sort((a, b) => a.contactId - b.contactId)));
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  }, []);

  const handleContactClick = () => {
    setNewContact(!newContact);
  };

  const handleTasksClick = () => {
    history.push('/tasks');
  };

  const handleLogout = async () => {
    try {
      setToken(undefined);
      setUserDetails({});
      setContacts([]);
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('contacts');
      toast.success('Logout Successful', toastOption);
      history.push('/');
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  return (
    <>
      <header className="agenda-header">
        <h1>
          {userDetails.name}
          &apos;s contacts
        </h1>
        <button className="btn btn-primary" onClick={handleContactClick} type="button">New contact</button>
        <button className="btn btn-secondary" onClick={handleTasksClick} type="button">Tasks</button>

        <button className="btn btn-danger" onClick={handleLogout} type="button">Log out</button>
      </header>
      <main>
        <div className="agenda-main">
          {newContact && (
          <section className="new-contact-section">
            <NewContact />
          </section>
          )}
          <aside className="center">
            {contacts ? contacts.sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((contact) => (
                <Contact
                  key={contact?.contactId}
                  name={contact?.name}
                  email={contact?.email}
                  phoneNumber={contact?.phoneNumber}
                  contactId={contact?.contactId}
                />
              ))
              : <h2 style={{ color: 'white' }}>Opss this seems a little empty...</h2>}
          </aside>
        </div>
      </main>
    </>
  );
}
