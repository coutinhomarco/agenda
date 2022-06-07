import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastOption from '../toastifyOptions';
import Calendar from '../components/Calendar';
import Context from '../context/Context';

export default function Tasks() {
  const {
    userDetails, setUserDetails, setToken, setContacts,
  } = useContext(Context);
  const history = useHistory();
  //   const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!userDetails.name) {
      const localUserDetails = localStorage.getItem('userDetails');
      setUserDetails(JSON.parse(localUserDetails));
    }
  });

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
        <button className="btn btn-secondary" onClick={handleContactClick} type="button">Contacts</button>
        <button className="btn btn-danger" onClick={handleLogout} type="button">Log out</button>
      </header>
      <Calendar />
    </div>
  );
}
