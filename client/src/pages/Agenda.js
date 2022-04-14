import React, { useContext, useEffect, useState } from 'react';
import Contact from '../components/Contact';
import Context from '../context/Context';

export default function Agenda() {
  const [contacts, setContacts] = useState([]);
  const { token } = useContext(Context);
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
  return (
    <div>
      <div>Agenda</div>
      {contacts.map(({ name, email, phoneNumber }) => (
        <Contact name={name} email={email} phoneNumber={phoneNumber} />))}
    </div>
  );
}
