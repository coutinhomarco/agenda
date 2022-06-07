import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import DatePicker, { registerLocale } from 'react-datepicker';
import { toast } from 'react-toastify';
import ptBR from 'date-fns/locale/pt-BR';
import { useHistory } from 'react-router-dom';
import toastOption from '../toastifyOptions';
import 'react-datepicker/dist/react-datepicker.css';
import Context from '../context/Context';

registerLocale('pt-BR', ptBR);

export default function Calendar() {
  const history = useHistory();
  const {
    token, setToken, contacts,
    setContacts, taskDate, setTaskDate, inputDetails, setInputDetails,
    tasksList, setTasksList,
  } = useContext(Context);

  const fetchTasks = async () => {
    const localStorageToken = localStorage.getItem('token');
    setToken(localStorageToken);
    const fetchMethod = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorageToken}`, 'Content-Type': 'application/json' },
    };
    const response = await fetch('http://localhost:3001/tasks', fetchMethod).then((res) => res.json());
    const taskArray = response
      .map(({
        taskId, title, taskDate: start, contactId,
      }) => ({
        id: taskId, title, start, contactId,
      }));
    setTasksList(taskArray);
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    return taskArray;
  };

  const onTaskInputChange = (e) => {
    setInputDetails({ ...inputDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      const {
        contact, title, description, status,
      } = inputDetails;
      e.preventDefault();
      const body = {
        contact, title, description, status, taskDate: taskDate.toISOString(),
      };
      const fetchMethod = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      const fetchData = await fetch(`http://localhost:3001/tasks/${contact}`, fetchMethod)
        .then((response) => response.json())
        .then((json) => json);
      setTasksList([...tasksList, { title, id: fetchData.data.id, contactId: contact }]);
      localStorage.setItem('tasks', JSON.stringify(tasksList));
      history.go(0);
      toast.success(fetchData.message, toastOption);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  useEffect(
    async () => {
      if (!contacts.lenght > 0) {
        const localStorageContacts = localStorage.getItem('contacts');
        setContacts(JSON.parse(localStorageContacts));
      }
      if (!tasksList.length > 0) {
        await fetchTasks();
      }
    },
    [tasksList],
  );

  return (
    <div className="calendar-container">
      <section className="date-input">
        <DatePicker
          className="datepicker"
          selected={taskDate || new Date()}
          onChange={(date) => setTaskDate(date)}
          showTimeSelect
          locale="pt-BR"
          timeIntervals={15}
          dateFormat="Pp"
          placeholderText="Select a date..."
          required
        />

        <form onSubmit={onSubmit} onChange={onTaskInputChange} className="login-form input-group calendar-form">
          <label className="form-label" htmlFor="contacts">
            Select a contact
            <select defaultValue="" name="contact" className="form-select" id="contacts">
              <option value="" disabled>Select your option</option>

              {contacts && (contacts
                .map(({ contactId, name }) => {
                  if (tasksList.some((task) => task.contactId === contactId)) {
                    return null;
                  }
                  return <option key={contactId} value={contactId}>{name}</option>;
                }))}

            </select>
          </label>
          <label className="form-label" htmlFor="title">
            Title
            <input name="title" className="form-control" id="title" type="text" />
          </label>
          <label className="form-label" htmlFor="description">
            Description
            <input name="description" className="form-control" id="description" type="text" />
          </label>
          <label className="form-label" htmlFor="status">
            Status (0 - todo, 1 - in progress, 2 - done)
            <input name="status" className="form-control" id="status" type="number" />
          </label>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </section>

      <section className="tasks-main">
        <FullCalendar
          locales={[ptBrLocale]}
          headerToolbar={{
            right: 'prev,next,today',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="75vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={tasksList}
          dateClick={({ date }) => setTaskDate(date)}
        />
      </section>
    </div>
  );
}
