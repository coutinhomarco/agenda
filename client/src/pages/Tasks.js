import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastOption from '../toastifyOptions';
import Calendar from '../components/Calendar';
import Context from '../context/Context';

export default function Tasks() {
  const {
    userDetails, setUserDetails, setToken, setContacts, setTasksList, token,
  } = useContext(Context);
  const history = useHistory();

  const [inputData, setInputData] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!userDetails.name) {
      const localUserDetails = localStorage.getItem('userDetails');
      setUserDetails(JSON.parse(localUserDetails));
    }
    const localToken = localStorage.getItem('token');
    setToken(localToken);
  });

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = async () => {
    try {
      setToken(undefined);
      setUserDetails({});
      setContacts([]);
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('contacts');
      toast.success('Logout Successful', toastOption);
      history.push('/');
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  const handleSearchButtonClick = async () => {
    setIsSearching(!isSearching);
  };

  const handleSearchSubmit = async (e) => {
    const { search } = inputData;
    e.preventDefault();
    const fetchMethod = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...inputData }),
    };
    const fetchData = await fetch(`http://localhost:3001/tasks/search?q=${search}`, fetchMethod)
      .then((response) => response.json())
      .then((json) => json);
    const taskArray = fetchData
      .map(({
        taskId, title, taskStartDate: start, taskEndDate: end, contactId, description, tag,
      }) => ({
        id: taskId, title, start, end, description, extendedProps: { contactId, tag },
      }));
    setTasksList(taskArray);
  };

  const handleContactClick = () => {
    history.push('/contacts');
  };

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>
          {userDetails.name}
          &apos;s tasks
        </h1>
        {
          isSearching && (
            <>
              <input placeholder="Search for tasks" name="search" onChange={onChange} type="text" />
              <button className="btn btn-primary" onClick={handleSearchSubmit} type="button">Search</button>
            </>
          )
        }
        <button className="btn btn-primary" onClick={handleSearchButtonClick} type="button">Search tasks</button>
        <button className="btn btn-secondary" onClick={handleContactClick} type="button">Contacts</button>
        <button className="btn btn-danger" onClick={handleLogout} type="button">Log out</button>
      </header>
      <Calendar />
    </div>
  );
}
