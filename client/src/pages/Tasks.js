import React, { useEffect, useContext } from 'react';
import Calendar from '../components/Calendar';
import Context from '../context/Context';

export default function Tasks() {
  const {
    userDetails, setUserDetails,
  } = useContext(Context);

  //   const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!userDetails.name) {
      const localUserDetails = localStorage.getItem('userDetails');
      setUserDetails(JSON.parse(localUserDetails));
    }
  });

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>
          {userDetails.name}
          &apos;s tasks
        </h1>
        <button className="btn btn-primary" type="button">Contacts</button>
        <button className="btn btn-danger" type="button">Log out</button>

      </header>
      <Calendar />
    </div>
  );
}
