import React, { useEffect, useContext } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import Calendar from '../components/Calendar';
import Context from '../context/Context';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

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
        <button className="btn btn-danger" type="button">Log out</button>
      </header>
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
      <Calendar />
    </div>
  );
}
