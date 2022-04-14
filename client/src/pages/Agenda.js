import React, { useContext, useEffect, useState } from 'react';
import Contact from '../components/Contact';
import NewContact from '../components/NewContact';
import Context from '../context/Context';

export default function Agenda() {
  const [newContact, setNewContact] = useState(false);
  const { token, contacts, setContacts } = useContext(Context);
  useEffect(async () => {
    try {
      if (token) {
        const fetchData = await fetch('http://localhost:3001/contact', { headers: { Authorization: `Bearer ${token}` } });
        const jsonData = await fetchData.json();
        if (jsonData.message) {
          window.alert(jsonData.message);
        }
        setContacts(jsonData);
      }
    } catch (error) {
      window.alert(error.message);
    }
  }, []);
  const handleClick = async () => {
    setNewContact(!newContact);
  };
  return (
    <div>
      <h1>Agenda</h1>
      <button className="btn btn-secondary" onClick={handleClick} type="button">New contact</button>
      <aside>
        {newContact && (
          <NewContact />
        )}
      </aside>
      <main>
        {contacts.map(({ name, email, phoneNumber }) => (
          <Contact name={name} email={email} phoneNumber={phoneNumber} />))}
      </main>
    </div>
  );
}
