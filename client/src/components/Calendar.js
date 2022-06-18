import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Context from '../context/Context';
import DatePickerCard from './DatePickerCard';
import TasksForm from './TasksForm';
import SelectedTask from './SelectedTask';

export default function Calendar() {
  const {
    setToken, setContacts, tasksList, setTasksList, selectedTask, setSelectedTask,
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
        taskId, title, taskStartDate: start, taskEndDate: end, contactId, description,
      }) => ({
        id: taskId, title, start, end, description, extendedProps: { contactId },
      }));
    setTasksList(taskArray);
  };

  const handleEventClick = ({ event }) => {
    const id = Number(event.id);
    const task = tasksList.find((obj) => obj.id === id);
    setSelectedTask(task);
    console.log(task);
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
        <div className="tasks-inner-container">
          <DatePickerCard />
          <TasksForm />
        </div>
        {
          selectedTask && <SelectedTask />
        }
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
          eventClick={handleEventClick}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={tasksList}
        />
      </section>
    </div>
  );
}
