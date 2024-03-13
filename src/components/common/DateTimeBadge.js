import React, { useState, useEffect } from 'react';

const DateTimeBadge = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  let hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();
  //const second = currentDateTime.getSeconds();
  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return (
    <div className="text-white fixed right-5 flex flex-col md:flex-row  items-center md:gap-2 gap-1">
      <span className="text-[12px] px-3 md:py-[5px] py-[2px] rounded-full bg-yellow-800">{formattedDate}</span>
      <span className="text-[11px] flex gap-1">
        <span className=' rounded-full font-medium flex bg-blue-800 gap-[2px] px-3 py-[2px] items-center'>
          <span className="block">{hour < 10 ? '0' + hour : hour}</span> :
          <span className="block">{minute < 10 ? '0' + minute : minute}</span> 
          {/*: <span className="block">{second < 10 ? '0' + second : second}</span>  */}
        </span>
        <span className="w-[30px] h-[30px] bg-rose-800 rounded-full flex items-center justify-center">{amPm}</span>
      </span>
    </div>
  );
};

export default DateTimeBadge;
