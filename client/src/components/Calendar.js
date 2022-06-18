import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import DatePicker, { registerLocale } from 'react-datepicker';
import { toast } from 'react-toastify';
import ptBR from 'date-fns/locale/pt-BR';
import toastOption from '../toastifyOptions';
import 'react-datepicker/dist/react-datepicker.css';
import Context from '../context/Context';

registerLocale('pt-BR', ptBR);

export default function Calendar() {
  const [tasksList, setTasksList] = useState([]);

  const {
    token,
    setToken,
    contacts,
    setContacts, inputDetails, setInputDetails,
    taskEndDate,

    setTaskEndDate,

    taskStartDate,
    setTaskStartDate,
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
        taskId, title, taskStartDate: start, taskEndDate: end, contactId,
      }) => ({
        id: taskId, title, start, contactId, end,
      }));
    setTasksList(taskArray);
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
        contact,
        title,
        description,
        status: Number(status),
        taskStartDate: taskStartDate.toISOString(),
        taskEndDate: taskEndDate.toISOString(),
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
        // end: taskEndDate.toISOString(),
      }]);
      toast.success(fetchData.message, toastOption);
    } catch (error) {
      toast.error(error.message, toastOption);
    }
  };

  useEffect(
    async () => {
      const localStorageContacts = localStorage.getItem('contacts');
      setContacts(JSON.parse(localStorageContacts));

      await fetchTasks();
    },
    [],
  );

  return (
    <div className="calendar-container">

      <section className="date-input">
        <div className="dateselector-container">
          <DatePicker
            className="datepicker"
            selected={taskStartDate}
            onChange={(date) => setTaskStartDate(date)}
            showTimeSelect
            locale="pt-BR"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Start"
            required
          />
          <DatePicker
            className="datepicker"
            selected={taskEndDate}
            onChange={(date) => setTaskEndDate(date)}
            showTimeSelect
            locale="pt-BR"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="End"
            required
          />
        </div>

        <form onSubmit={onSubmit} onChange={onTaskInputChange} className="tasks-form input-group calendar-form">
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
            Status
            <select defaultValue="" name="status" className="form-control" id="status" type="number">
              <option value="" disabled>Select your option</option>
              <option value="0">To do</option>
              <option value="1">In progress</option>
              <option value="2">Done</option>
            </select>
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
          height="78vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={tasksList}
        />
      </section>
    </div>
  );
}
