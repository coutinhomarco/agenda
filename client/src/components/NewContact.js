import React, { useState, useContext } from 'react';
import Context from '../context/Context';

export default function NewContact() {
  const { contacts, setContacts, token } = useContext(Context);
  const [inputData, setInputData] = useState();

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const fetchMethod = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...inputData }),
      };
      const fetchData = await fetch('http://localhost:3001/contact', fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      window.alert(fetchData.message);
      setContacts([...contacts, fetchData.data]);
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <form className="login-form input-group" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="name">
        <input className="form-control" name="name" id="name" type="text" placeholder="Name" />
      </label>
      <label className="form-label" htmlFor="email">
        <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
      </label>
      <label className="form-label" htmlFor="phoneNumber">
        <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" placeholder="Phone number" />
      </label>
      <button className="btn btn-primary" type="submit">Add contact</button>
    </form>
  );
}
