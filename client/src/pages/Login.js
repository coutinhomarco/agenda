import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [inputData, setInputData] = useState({ password: '', email: '' });
  const { setToken } = useContext(Context);

  const toastOption = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

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
      setToken(fetchData.token);

      if (!fetchData.token) { return toast.error(fetchData.message, toastOption); }
      toast.success(fetchData.message, toastOption);
      if (fetchData.token) {
        localStorage.setItem('token', fetchData.token);
        history.push('/agenda');
      }
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };
  return (
    <div className="main">
      <h1>
        Login
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
