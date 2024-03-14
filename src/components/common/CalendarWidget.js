import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CalenderWidget = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-wrap flex-col items-center mb-4">
        <h1 className='mb-3'>Selected Date: {date.toDateString()}</h1>
        <Calendar
        onChange={onChange}
        value={date}
      />
      </div>
    </div>
  );
};

export default CalenderWidget;