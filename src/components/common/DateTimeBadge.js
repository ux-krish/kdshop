import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { MdBedtime } from "react-icons/md";

const DateTimeBadge = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const month = currentDateTime.toLocaleString(undefined, { month: 'short' });
  const date = currentDateTime.getDate();
  const year = currentDateTime.getFullYear();
  let hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();
  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return (
    <div className="text-white fixed right-14 flex flex-col sm:flex-row items-center md:gap-2 gap-1">
      <span className="text-[11px] flex gap-1 w-full">
        <span className='rounded-full font-medium flex bg-slate-800 gap-[5px] px-3 h-[30px] items-center justify-center shadow-lg '>
          <span className=' sm:inline'>
            <span className="mr-[3px] text-yellow-500">{month}</span>
            <span className="mr-[4px] text-rose-500">{date}</span>
            <span className='text-emerald-100 text-[10px] bg-emerald-600 rounded-full px-1'>{year}</span>
          </span>
          {
            hour >= 6 ? (
              <MdBedtime className="text-blue-500" />
            ) : (
              <IoSunnyOutline className='text-yellow-500' />
            )
          }
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
