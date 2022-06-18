import React, { useContext } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import Context from '../context/Context';

registerLocale('pt-BR', ptBR);

export default function DatePickerCard() {
  const {
    taskEndDate,
    setTaskEndDate,
    taskStartDate,
    setTaskStartDate,
  } = useContext(Context);
  return (
    <div className="dateselector-container">
      <span>Select a date</span>
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

  );
}
