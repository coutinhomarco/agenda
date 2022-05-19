import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';

export default function NewContact() {
  const { contacts, setContacts, token } = useContext(Context);
  const [inputData, setInputData] = useState({ name: '', email: '', phoneNumber: '' });

  const validateForm = () => {
    const data = { ...inputData };
    const regex = /[\w]+@[\w]+.com/i;
    if (data.phoneNumber.length >= 8 && regex.test(data.email) && data.name.length > 2) {
      return false;
    }
    return true;
  };
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
      toast.success(fetchData.message, toastOption);
      setContacts([...contacts, fetchData.data]);
    } catch (error) {
      toast.fail(error.message, toastOption);
    }
  };
  return (
    <form className="agenda-form  input-group" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="name">
        <input className="form-control" name="name" id="name" type="text" placeholder="Name" />
      </label>
      <label className="form-label" htmlFor="email">
        <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
      </label>
      <label className="form-label" htmlFor="phoneNumber">
        <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" placeholder="Phone number" />
      </label>
      <button disabled={validateForm()} className="btn btn-primary" type="submit">Add contact</button>
    </form>
  );
}
