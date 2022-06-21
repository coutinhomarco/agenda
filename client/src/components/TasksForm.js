/* eslint-disable react/button-has-type */
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import toastOption from '../toastifyOptions';
import 'react-toastify/dist/ReactToastify.css';

export default function TasksForm() {
  const {
    contacts, tasksList, setTasksList, token, inputDetails, setInputDetails, taskEndDate,
    taskStartDate, setTaskEndDate, setTaskStartDate, setContacts, setSelectedTask,
  } = useContext(Context);

  const onTaskInputChange = (e) => {
    setInputDetails({ ...inputDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setContacts([...contacts]);
  }, [tasksList]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        contact, title, description, status,
      } = inputDetails;
      const body = {
        contact,
        title,
        description,
        status: Number(status),
        taskStartDate,
        taskEndDate,
      };
      const fetchMethod = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      const fetchData = await fetch(`http://localhost:3001/tasks/${contact}`, fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      setTasksList([...tasksList, {
        title,
        id: Number(fetchData.data.taskId),
        contactId: Number(contact),
        start: taskStartDate.toISOString(),
        end: taskEndDate.toISOString(),
      }]);
      setSelectedTask(false);
      setTaskStartDate(null);
      setTaskEndDate(null);
      setInputDetails({
        title: '',
        description: '',
        status: '',
        contact: '',
      });
      toast.success(fetchData.message, toastOption);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };
  return (
    <form onSubmit={onSubmit} onChange={onTaskInputChange} id="cf" className="tasks-form input-group calendar-form">

      <label className="form-label" htmlFor="title">
        Title
        <input value={inputDetails.title} name="title" className="form-control" id="title" type="text" />
      </label>
      <label className="form-label" htmlFor="description">
        Description
        <input value={inputDetails.description} name="description" className="form-control" id="description" type="text" />
      </label>
      <label className="form-label" htmlFor="contacts">
        Select a contact
        <select value={inputDetails.contact} defaultValue="" name="contact" className="form-select" id="contacts">
          <option value="" disabled>Select your option</option>

          {contacts && (contacts.map(({ contactId, name }) => (
            <option key={contactId} value={contactId}>{name}</option>)))}

        </select>
      </label>
      <label className="form-label" htmlFor="status">
        Status
        <select value={inputDetails.status} defaultValue="" name="status" className="form-select" id="status" type="number">
          <option value="" disabled>Select your option</option>
          <option value="0">To do</option>
          <option value="1">In progress</option>
          <option value="2">Done</option>
        </select>
      </label>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}
