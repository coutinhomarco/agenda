import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';
import Context from '../context/Context';

export default function UpdatingForm({ setIsUpdating, contactId, handleUpdateClick }) {
  const {
    tasksList, setTasksList, selectedTask, setSelectedTask,
  } = useContext(Context);

  const [inputData, setInputData] = useState({ title: '', description: '', status: 0 });

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const validateFormField = () => {
    const { title, description, status } = inputData;
    if (title.length < 3) return true;
    if (description.length < 3) return true;
    if (status < 0 || status > 2) return true;
    return false;
  };

  const handleUpdateTask = async (e) => {
    try {
      e.preventDefault();
      const localToken = localStorage.getItem('token');
      const fetchMethod = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localToken}` },
        body: JSON.stringify({ ...inputData, taskId: selectedTask.id }),
      };
      await fetch(`http://localhost:3001/tasks/${contactId}`, fetchMethod);
      toast.success('Task updated', toastOption);
      const filteredTasks = tasksList.filter((task) => task.id !== selectedTask.id);
      setTasksList([...filteredTasks, { ...selectedTask, ...inputData }]);
      setSelectedTask({ ...selectedTask, ...inputData });
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  return (
    <form className="update-form" onSubmit={handleUpdateTask}>
      <label className="form-label" htmlFor="title">
        Title
        <input onChange={onChange} value={inputData.title} name="title" className="form-control" id="title" type="text" />
      </label>
      <label className="form-label" htmlFor="description">
        Description
        <input onChange={onChange} value={inputData.description} name="description" className="form-control" id="description" type="text" />
      </label>
      <label className="form-label" htmlFor="status">
        Status
        <select onChange={onChange} defaultValue="" name="status" className="form-select" id="status" type="number">
          <option value="" disabled>Select your option</option>
          <option value="0">To do</option>
          <option value="1">In progress</option>
          <option value="2">Done</option>
        </select>
      </label>
      <button className="btn btn-primary" disabled={validateFormField()} type="submit">Edit</button>
      <button onClick={handleUpdateClick} className="btn btn-danger" type="button">Cancel</button>

    </form>
  );
}
UpdatingForm.propTypes = {
  setIsUpdating: PropTypes.func.isRequired,
  handleUpdateClick: PropTypes.func.isRequired,
  contactId: PropTypes.number.isRequired,
};
