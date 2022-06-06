import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  return (
    <section className="tasks-main">
      <FullCalendar
        className="tasks-calendar"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </section>
  );
}
