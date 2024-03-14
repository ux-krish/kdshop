import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { FaDove } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi"; // Using icons from react-icons/fi

const DateTimeBadge = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();

  // Define conditions for different periods of the day
  let icon;
  if (hour >= 0 && hour < 6) {
    icon = <FiSunrise className='text-yellow-500' />;
  } else if (hour >= 6 && hour < 12) {
    icon = <FaDove className='text-yellow-500' />;
  } else if (hour >= 12 && hour < 18) {
    icon = <IoSunnyOutline className='text-yellow-500' />;
  } else if (hour >= 18 && hour < 24) {
    icon = <FiSunset className='text-yellow-500' />;
  } else {
    // Handle invalid hour
    icon = null;
  }

  return (
    <div className="text-white fixed right-14 flex flex-col sm:flex-row items-center md:gap-2 gap-1">
      <span className="text-[11px] flex gap-1 w-full">
        <span className='rounded-full font-medium flex bg-slate-800 gap-[5px] px-3 h-[30px] items-center justify-center shadow-lg '>
          <span className=' sm:inline'>
            <span className="mr-[3px] text-yellow-500">{currentDateTime.toLocaleString(undefined, { month: 'short' })}</span>
            <span className="mr-[4px] text-rose-500">{currentDateTime.getDate()}</span>
            <span className='text-emerald-100 text-[10px] bg-emerald-600 rounded-full px-1'>{currentDateTime.getFullYear()}</span>
          </span>
          {icon}
          <span className='flex gap-[2px] items-center'>
            <span className="block text-yellow-500">{hour < 10 ? '0' + hour : hour}</span> :
            <span className="block text-yellow-500">{minute < 10 ? '0' + minute : minute}</span> 
          </span>
        </span>
      </span>
    </div>
  );
};

export default DateTimeBadge;
