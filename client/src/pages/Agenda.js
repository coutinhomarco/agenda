import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Contact from '../components/Contact';
import NewContact from '../components/NewContact';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';

export default function Agenda() {
  const [newContact, setNewContact] = useState(false);
  const { token, contacts, setContacts } = useContext(Context);
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
        if (jsonData.message) {
          toast.success(fetchData.message, toastOption);
        }
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
    <main>
      <h1>Agenda</h1>
      <button className="btn btn-secondary" onClick={handleClick} type="button">New contact</button>
      <div className="agenda-main">
        <aside>
          {newContact && (
          <NewContact />
          )}
        </aside>
        <section className="center">
          {contacts.map(({ name, email, phoneNumber }) => (
            <Contact name={name} email={email} phoneNumber={phoneNumber} />))}
        </section>
      </div>
    </main>
  );
}
