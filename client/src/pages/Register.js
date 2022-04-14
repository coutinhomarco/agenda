import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const [inputData, setInputData] = useState();
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
      const fetchData = await fetch('http://localhost:3001/user/register', fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      window.alert(fetchData.message);
      history.push('/');
    } catch (error) {
      window.alert(error);
    }
  };
  return (
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
      <button className="btn btn-primary" type="submit">Create new account</button>
    </form>
  );
}
