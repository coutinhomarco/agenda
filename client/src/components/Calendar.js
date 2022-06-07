import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import DatePicker, { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';
import Context from '../context/Context';

registerLocale('pt-BR', ptBR);

export default function Calendar() {
  const {
    token, setToken, contacts, setContacts,
  } = useContext(Context);

  useEffect(async () => {
    if (!token) {
      const localStorageToken = localStorage.getItem('token');
      const localStorageContacts = localStorage.getItem('contacts');
      setContacts(JSON.parse(localStorageContacts));
      setToken(JSON.parse(localStorageToken));
    }
  }, []);

  return (
    <div className="calendar-container">
      <section className="date-input">
        <DatePicker
          className="datepicker"
        // selected={displayDate || new Date()}
        // onChange={(date) => handleChange(date)}
          showTimeSelect
          locale="pt-BR"
          timeIntervals={15}
          dateFormat="Pp"
          placeholderText="Selecione uma data..."
          required
        />
        <form className="login-form input-group calendar-form">
          <label className="form-label" htmlFor="contacts">
            Select a contact
            <select className="form-select" id="contacts">
              {contacts && (contacts.map(({ contactId, name }) => (
                <option key={contactId} value={contactId}>{name}</option>)))}
            </select>
          </label>
          <label className="form-label" htmlFor="title">
            Title
            <input className="form-control" id="title" type="text" />
          </label>
          <label className="form-label" htmlFor="description">
            Description
            <input className="form-control" id="description" type="text" />
          </label>
          <label className="form-label" htmlFor="status">
            Status (0 - todo, 1 - in progress, 2 - done)
            <input className="form-control" id="status" type="number" />
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
          height="70vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // events={taskList}
          dateClick={(e) => console.log(e)}
        />
      </section>
    </div>
  );
}
