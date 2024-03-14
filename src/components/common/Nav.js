import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateTimeBadge from './DateTimeBadge';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Nav = ({onLogout, loggedIn}) => {
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (path) => {
    setActive(path);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div onClick={() => handleSidebarToggle()} className={`backdrop ${isOpen ? 'z-20' : '-z-50'}`}></div>
    <div className="h-[72px] bg-slate-900 fixed z-20 flex justify-between items-center inset-0 w-full">
      
      <div className={`mt-0 ml-4 fixed transform z-20 ease-in-out transition-all duration-300 ${
          isOpen ? 'translate-x-[255px]' : 'translate-x-0'
        }`}>
        <div
          className={`flex items-center justify-center w-12 h-10 cursor-pointer group rounded-full py-[2px] px-[5px]  hover:bg-gradient-to-r from-pink-500 to-blue-500 hover:border-slate-950 ${isOpen ? 'bg-gradient-to-r from-pink-500 to-blue-500' : ''}`}
          onClick={handleSidebarToggle}
        >
          <div className={`w-10 h-10 px-[8px] flex flex-col justify-center gap-1  group-hover:bg-slate-900 rounded-md ${isOpen ? "bg-slate-900" : "bg-slate-800"}`}>
            <span className={` w-full h-1 rounded-full group-hover:bg-blue-400 ${isOpen ? 'bg-blue-400' : 'bg-slate-400'}`}></span>
            <span className={` w-full h-1 rounded-full group-hover:bg-rose-400 ${isOpen ? 'bg-rose-400' : 'bg-slate-400'}`}></span>
            <span className={` w-full h-1 rounded-full group-hover:bg-yellow-400 ${isOpen ? 'bg-yellow-400' : 'bg-slate-400'}`}></span>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transform top-0 left-0 w-64 bg-slate-900 h-full overflow-y-auto ease-in-out transition-all duration-300 fixed z-20`}
      >
        <div className="p-[2px] bg-gradient-to-r to-fuchsia-400 from-yellow-400 min-h-dvh flex">
          <ul className="flex flex-col gap-2 bg-slate-950/90 min-h-full w-full p-4 rounded-sm ">
            <li>
              <Link
                to="/"
                onClick={() => {
                  handleClick('/');
                  handleSidebarToggle();
                  
                }}
                className={`px-5 w-full block py-2 text-sm font-medium rounded-sm tracking-wider uppercase text-gray-300 hover:bg-rose-500 transition-all ease-in-out duration-150 ${
                  active === '/' ? 'bg-rose-500  text-slate-800' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                onClick={() => {
                  handleClick('/gallery');
                  handleSidebarToggle();
                }}
                className={`px-5 py-2 w-full block text-sm font-medium  rounded-sm tracking-wider uppercase text-gray-300 hover:bg-indigo-500 transition-all ease-in-out duration-150 ${
                  active === '/gallery' ? 'bg-indigo-500  text-slate-800' : ''
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  handleClick('/contact');
                  handleSidebarToggle();
                }}
                className={`px-5 py-2 w-full block text-sm font-medium rounded-sm tracking-wider uppercase text-gray-300 hover:bg-teal-500 transition-all ease-in-out duration-150 ${
                  active === '/contact' ? 'bg-teal-500   text-slate-800' : ''
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`fixed left-20 md:inset-0 md:mx-auto h-[70px]  flex justify-center items-center ${isOpen ? '-z-50' : 'z-0'}`}>
        <Link to={'/'} className='font-black text-[40px] tracking-widest inline' onClick={() => setIsOpen(false)}>
          <span className='text-blue-500'>U</span>
          <span className='text-pink-500'>X</span>
          <span className='text-yellow-500'>K</span>
          <span className='text-lime-500'>D</span>
        </Link>
      </div>

      <DateTimeBadge />

      <div className="flex items-center justify-center fixed right-4">
        {loggedIn ? (
          <button className="text-slate-600 rounded-full w-8 h-8 bg-slate-950 p-[5px] flex items-center justify-center shadow-lg" onClick={onLogout}>
            <FaSignOutAlt />
          </button>
        ) : (
          <Link to="/login" className="text-slate-500 rounded-full w-8 h-8 bg-slate-950 p-[5px] flex items-center justify-center shadow-lg">
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </div>

    {/* Conditionally render login/logout icons */}
   
    </>
  );
};

export default Nav;
