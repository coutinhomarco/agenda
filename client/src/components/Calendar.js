import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

export default function Calendar() {
  return (
    <section className="tasks-main">
      <FullCalendar
        className="tasks-calendar"
        locales={[ptBrLocale]}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // events={taskList}
        dateClick={(e) => console.log(e)}
      />

    </section>
  );
}
