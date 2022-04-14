import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function Agenda() {
  const [contacts, setContacts] = useState([]);
  const { token } = useContext(Context);
  useEffect(async () => {
    if (token) {
      const fetchData = await fetch('http://localhost:3001/user', { headers: { Authorization: `Bearer ${token}` } });
      const jsonData = await fetchData.json();
      setContacts(jsonData);
      if (jsonData.message) {
        window.alert(jsonData.message);
      }
    }
  }, []);
  return (
    <div>
      <div>Agenda</div>
      {contacts.map((contact) => (<p>{contact.name}</p>))}
    </div>
  );
}
