import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Contact from '../components/Contact';
import NewContact from '../components/NewContact';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';

export default function Agenda() {
  const [newContact, setNewContact] = useState(false);
  const {
    token, contacts, setContacts, userDetails, setToken, setUserDetails,
  } = useContext(Context);
  const history = useHistory();
  const toastOption = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(async () => {
    try {
      const localToken = localStorage.getItem('token');
      const fetchData = await fetch('http://localhost:3001/contact', { headers: { Authorization: `Bearer ${token || localToken}` } });
      const jsonData = await fetchData.json();
      if (!userDetails.name) {
        const localUserDetails = localStorage.getItem('userDetails');
        setUserDetails(JSON.parse(localUserDetails));
      }
      setContacts(jsonData);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  }, []);
  const handleContactClick = async () => {
    setNewContact(!newContact);
  };

  const handleLogout = async () => {
    try {
      setToken(undefined);
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
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
