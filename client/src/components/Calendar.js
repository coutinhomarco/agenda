import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import DatePicker, { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

export default function Calendar() {
  return (
    <div className="calendar-container">
      <section className="date-input">
        <DatePicker
          className="w-full"
        // selected={displayDate || new Date()}
        // onChange={(date) => handleChange(date)}
          showTimeSelect
          locale="pt-BR"
          timeIntervals={15}
          dateFormat="Pp"
          placeholderText="Selecione uma data..."
          required
        />
      </section>
      <section className="tasks-main">
        <FullCalendar
          className="tasks-calendar"
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
