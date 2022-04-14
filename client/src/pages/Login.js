import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function Login() {
  const [inputData, setInputData] = useState();
  const { setToken } = useContext(Context);

  const history = useHistory();
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
      const fetchData = await fetch('http://localhost:3001/user', fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      setToken(fetchData.token);
      window.alert(fetchData.message);
      history.push('/agenda');
    } catch (error) {
      window.alert(error);
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
          <button className="btn btn-primary login-btn" type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}
