/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [inputData, setInputData] = useState({ password: '', email: '', name: '' });
  const history = useHistory();
  const toastOption = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const validateForm = () => {
    const regex = /[\w]+@[\w]+.com/i;
    if (inputData.password.length >= 8
      && regex.test(inputData.email) && inputData.name.length > 2) {
      return false;
    }
    return true;
  };
  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const fetchMethod = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inputData }),
      };
      const fetchData = await fetch('http://localhost:3001/user/register', fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      if (!fetchData.message.includes('successfully')) {
        return toast.error(fetchData.message, toastOption);
      }
      toast.success(fetchData.message, toastOption);
      history.push('/');
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };
  return (
    <div className="main">
      <h1>
        New user? Register here:
      </h1>
      <form className="login-form input-group" onChange={onChange} onSubmit={onSubmit}>
        <label className="form-label" htmlFor="email">
          <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
        </label>
        <label className="form-label" htmlFor="name">

          <input className="form-control" name="name" id="name" type="name" placeholder="Name" />
        </label>
        <label className="form-label" htmlFor="password">
          <input className="form-control" name="password" id="password" type="password" placeholder="Password" />
        </label>
        <button disabled={validateForm()} className="btn btn-primary" type="submit">Create new account</button>
      </form>
    </div>
  );
}
