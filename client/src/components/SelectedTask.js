import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Context from '../context/Context';

export default function SelectedTask() {
  const [contactInfo, setContactInfo] = useState({});
  const { selectedTask } = useContext(Context);
  const {
    start, end, title, description, extendedProps: { contactId },
  } = selectedTask;
  useEffect(async () => {
    const localToken = localStorage.getItem('token');

    const fetchData = await fetch(`http://localhost:3001/contact/${contactId}`, { headers: { Authorization: `Bearer ${localToken}` } });
    const jsonData = await fetchData.json();
    setContactInfo(jsonData);
  }, []);
  return (
    <div className="selected-task">
      <p>{`Title: ${title}`}</p>
      <p>{`Contact related: ${contactInfo.name}`}</p>

      <p>{`Description: ${description}`}</p>
      <p>{`Start Date: ${moment(start).format('DD/MM/YYYY')} ${moment(start).hours()}:${moment(start).minutes()}`}</p>
      <p>{`End Date: ${moment(end).format('DD/MM/YYYY')} ${moment(end).hours()}:${moment(end).minutes()}`}</p>
      <p>{`Duration: ${moment(end).diff(start, 'minutes')} minutes`}</p>
      <div>
        <button className="btn btn-warning" type="button">Edit</button>
        <button className="btn btn-danger" type="button">Delete</button>
      </div>
    </div>
  );
}
