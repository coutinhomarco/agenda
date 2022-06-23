import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';

export default function Login() {
  const [inputData, setInputData] = useState({ password: '', email: '' });
  const { setUserDetails } = useContext(Context);

  const history = useHistory();

  const validateForm = () => {
    const regex = /[\w]+@[\w]+.com/i;
    if (inputData.password.length >= 8 && regex.test(inputData.email)) return false;
    return true;
  };
  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const fetchMethod = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inputData }),
      };
      const fetchData = await fetch('http://localhost:3001/user', fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      if (!fetchData.token) { return toast.error(fetchData.message, toastOption); }
      toast.success(fetchData.message, toastOption);
      setUserDetails(fetchData.userDetails);
      localStorage.setItem('token', fetchData.token);
      localStorage.setItem('tasks', JSON.stringify([]));
      localStorage.setItem('userDetails', JSON.stringify(fetchData.userDetails));
      history.push('/contacts');
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };
  return (
    <div className="main">
      <h1>
        Your Agenda
      </h1>
      <form className="login-form input-group" onChange={onChange} onSubmit={onSubmit}>
        <label className="form-label" htmlFor="email">
          <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
        </label>
        <label className="form-label" htmlFor="password">
          <input className="form-control" name="password" id="password" type="password" placeholder="Password" />
        </label>
        <div className="flex btn-div">
          <Link to="/register">
            <button className="btn btn-secondary" type="button">Create new account</button>
          </Link>
          <button disabled={validateForm()} className="btn btn-primary login-btn" type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}
