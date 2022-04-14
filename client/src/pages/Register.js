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
    e.preventDefault();
    const metodoRequisicao = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...inputData }),
    };
    const fetchData = await fetch('http://localhost:3001/user/register', metodoRequisicao)
      .then((response) => response.json())
      .then((json) => json);
    window.alert(fetchData.message);
    history.push('/');
  };
  return (
    <form className="login-form" onChange={onChange} onSubmit={onSubmit}>
      <label htmlFor="email">
        <input name="email" id="email" type="email" placeholder="Email" />
      </label>
      <label htmlFor="name">
        <input name="name" id="name" type="name" placeholder="Name" />
      </label>
      <label htmlFor="password">
        <input name="password" id="password" type="password" placeholder="Password" />
      </label>
      <button type="submit">Create new account</button>
    </form>
  );
}
