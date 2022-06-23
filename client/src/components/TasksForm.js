/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import toastOption from '../toastifyOptions';
import 'react-toastify/dist/ReactToastify.css';

export default function TasksForm() {
  const {
    contacts, tasksList, setTasksList, token, inputDetails, setInputDetails, taskEndDate,
    taskStartDate, setTaskEndDate, setTaskStartDate, setSelectedTask,
  } = useContext(Context);

  const onTaskInputChange = (e) => {
    setInputDetails({ ...inputDetails, [e.target.name]: e.target.value });
  };

  const resetFormState = () => {
    setSelectedTask(false);
    setTaskStartDate(null);
    setTaskEndDate(null);
    setInputDetails({
      title: '',
      description: '',
      status: '',
      contact: '',
      tag: '',
    });
  };

  const validateFormField = () => {
    const {
      title, description, status, contact, tag,
    } = inputDetails;
    if (title?.length < 3) return true;
    if (description?.length < 3) return true;
    if (status < 0 || status > 2 || status === '') return true;
    if (contact === '') return true;
    if (tag === '') return true;
    return false;
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        contact, title, description, status, tag,
      } = inputDetails;
      const body = {
        contact: Number(contact),
        title,
        description,
        status: Number(status),
        taskStartDate,
        taskEndDate,
        tag: Number(tag),
      };
      const fetchMethod = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      const fetchData = await fetch(`http://localhost:3001/tasks/${contact}`, fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      console.log(fetchData);
      const newTask = fetchData.data;
      setTasksList([...tasksList, {
        title,
        id: Number(newTask.dataValues.taskId),
        extendedProps: { contactId: Number(contact), tag },
        start: taskStartDate.toISOString(),
        end: taskEndDate.toISOString(),
        description,
      }]);
      resetFormState();
      toast.success(fetchData.message, toastOption);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };
  return (
    <form onSubmit={onSubmit} onChange={onTaskInputChange} id="cf" className="tasks-form input-group calendar-form">

      <label className="form-label" htmlFor="contacts">
        Select a contact
        <select value={inputDetails.contact} defaultValue="" name="contact" className="form-select" id="contacts">
          <option value="" disabled>Select your option</option>

          {contacts && (contacts.map(({ contactId, name }) => (
            <option className="contact" key={contactId} value={contactId}>{name}</option>)))}

        </select>
      </label>
      <label className="form-label" htmlFor="title">
        Title
        <input value={inputDetails.title} name="title" className="form-control" id="title" type="text" />
      </label>
      <label className="form-label" htmlFor="description">
        Description
        <input value={inputDetails.description} name="description" className="form-control" id="description" type="text" />
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
      <label className="form-label" htmlFor="tag">
        Tag
        <select value={inputDetails.tag} defaultValue="" name="tag" className="form-select" id="tag" type="number">
          <option value="" disabled>Select your option</option>
          <option value="0">Entertainment</option>
          <option value="1">Alimentation</option>
          <option value="2">Health</option>
          <option value="3">Work</option>

        </select>
      </label>
      <button disabled={validateFormField()} className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}
