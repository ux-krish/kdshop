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

  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  let hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();
  //const second = currentDateTime.getSeconds();
  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return (
    <div className="text-white fixed right-14 flex flex-col sm:flex-row  items-center md:gap-2 gap-1">
      <span className="text-[11px] flex gap-1 w-full">
        <span className=' rounded-full font-medium flex bg-slate-800 gap-[5px] px-3 h-[30px] items-center w-full justify-center shadow-lg '>
          <span className='hidden sm:inline'>{formattedDate}</span>
          {
            hour >= 6 ? (
              <MdBedtime className="text-blue-500" />
            ) : (
              <IoSunnyOutline className='text-yellow-500' />
            )
          }
          <span className='flex gap-[2px]'>
            <span className="block">{hour < 10 ? '0' + hour : hour}</span> :
            <span className="block">{minute < 10 ? '0' + minute : minute}</span> 
          </span>
         
          {/*: <span className="block">{second < 10 ? '0' + second : second}</span>  */}
        </span>
        {/* <span className="w-[30px] h-[30px] bg-rose-800 rounded-full flex items-center justify-center">{amPm}</span> */}
      </span>
    </div>
  );
};

export default DateTimeBadge;
