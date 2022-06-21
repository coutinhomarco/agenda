import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';
import UpdatingForm from './UpdatingForm';

export default function SelectedTask() {
  const [contactInfo, setContactInfo] = useState({});

  const { selectedTask } = useContext(Context);

  const {
    start, end, title, description, extendedProps: { contactId },
  } = selectedTask;

  const [inputData, setInputData] = useState({ title: '', description: '', status: 0 });
  const [isUpdating, setIsUpdating] = useState(false);

  const onChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(async () => {
    const localToken = localStorage.getItem('token');
    const fetchData = await fetch(`http://localhost:3001/contact/${contactId}`, { headers: { Authorization: `Bearer ${localToken}` } });
    const jsonData = await fetchData.json();
    setContactInfo(jsonData);
  }, [contactId]);

  const handleDeleteTask = async () => {
    try {
      const localToken = localStorage.getItem('token');
      const fetchData = await fetch(`http://localhost:3001/tasks/${contactId}`, { Authorization: `Bearer ${localToken}`, method: 'DELETE' });
      const jsonData = await fetchData.json();
      toast.success(jsonData.message, toastOption);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  const handleUpdateTask = async () => {
    try {
      setIsUpdating(true);
      const localToken = localStorage.getItem('token');
      const fetchMethod = { Authorization: `Bearer ${localToken}`, method: 'PUT', body: JSON.stringify(inputData) };
      const fetchData = await fetch(`http://localhost:3001/tasks/${contactId}`, fetchMethod);
      const jsonData = await fetchData.json();
      toast.success(jsonData.message, toastOption);
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  return (
    <div className="selected-task">
      {
        isUpdating ? (
          <UpdatingForm
            selectedTask={selectedTask}
            onChange={onChange}
            handleUpdateTask={handleUpdateTask}
          />
        ) : (
          <>
            <p>{`Title: ${title}`}</p>
            <p>{`Contact related: ${contactInfo.name}`}</p>
            <p>{`Description: ${description}`}</p>
            <p>{`Start Date: ${moment(start).format('DD/MM/YYYY')} ${moment(start).hours()}:${moment(start).minutes()}`}</p>
            <p>{`End Date: ${moment(end).format('DD/MM/YYYY')} ${moment(end).hours()}:${moment(end).minutes()}`}</p>
            <p>{`Duration: ${moment(end).diff(start, 'minutes')} minutes`}</p>
            <div>
              <button onClick={handleUpdateTask} className="btn btn-warning" type="button">Edit</button>
              <button onClick={handleDeleteTask} className="btn btn-danger" type="button">Delete</button>
            </div>
          </>
        )
      }
    </div>
  );
}
