import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import toastOption from '../toastifyOptions';
import UpdatingForm from './UpdatingForm';

export default function SelectedTask() {
  const [contactInfo, setContactInfo] = useState({});
  const [tagString, setTagString] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    selectedTask, setSelectedTask, setTasksList, tasksList,
  } = useContext(Context);

  const {
    start, end, title, description, extendedProps, id,
  } = selectedTask;

  useEffect(async () => {
    const localToken = localStorage.getItem('token');
    const fetchData = await fetch(`http://localhost:3001/contact/${extendedProps?.contactId}`, { headers: { Authorization: `Bearer ${localToken}` } });
    const jsonData = await fetchData.json();
    setContactInfo(jsonData);
    const { tag } = extendedProps;
    switch (tag) {
      case 0:
        return setTagString('Entertainment');
      case 1:
        return setTagString('Alimentation');
      case 2:
        return setTagString('Health');
      case 3:
        return setTagString('Work');
      default:
        return setTagString(null);
    }
  }, [extendedProps?.contactId]);

  const handleDeleteTask = async () => {
    try {
      const localToken = localStorage.getItem('token');
      await fetch(`http://localhost:3001/tasks/${extendedProps?.contactId}`, { headers: { Authorization: `Bearer ${localToken}` }, method: 'DELETE' });
      const remainingTasks = tasksList
        .filter((task) => task?.id !== Number(id));
      setTasksList(remainingTasks);
      setSelectedTask(false);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  const handleUpdateClick = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <div className="selected-task">
      {
        isUpdating ? (
          <UpdatingForm contactId={extendedProps.contactId} setIsUpdating={setIsUpdating} />
        ) : (
          <>
            <p>{`Title: ${title}`}</p>
            <p>{`Contact related: ${contactInfo.name}`}</p>
            <p>{`Tag: ${tagString}`}</p>

            <p>{`Description: ${description}`}</p>
            <p>{`Start Date: ${moment(start).format('DD/MM/YYYY')} ${moment(start).hours()}:${moment(start).minutes()}`}</p>
            <p>{`End Date: ${moment(end).format('DD/MM/YYYY')} ${moment(end).hours()}:${moment(end).minutes()}`}</p>
            <p>{`Duration: ${moment(end).diff(start, 'minutes')} minutes`}</p>
            <div>
              <button onClick={handleUpdateClick} className="btn btn-warning" type="button">Edit</button>
              <button onClick={handleDeleteTask} className="btn btn-danger" type="button">Delete</button>
            </div>
          </>
        )
      }
    </div>
  );
}
