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
    e.preventDefault();
    const metodoRequisicao = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...inputData }),
    };
    const fetchData = await fetch('http://localhost:3001/user', metodoRequisicao)
      .then((response) => response.json())
      .then((json) => json);
    setToken(fetchData.token);
    window.alert(fetchData.message);
    history.push('/agenda');
  };
  return (
    <div>
      <h1>
        Login
      </h1>
      <form className="login-form" onChange={onChange} onSubmit={onSubmit}>
        <label htmlFor="email">
          <input name="email" id="email" type="email" placeholder="Email" />
        </label>
        <label htmlFor="password">
          <input name="password" id="password" type="password" placeholder="Password" />
        </label>
        <div>
          <Link to="/register">
            <button type="button">Create new account</button>
          </Link>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}
