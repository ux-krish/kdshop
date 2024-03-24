import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './home/Home';
import Weather from './weather/Weather';
import Contact from './contact/Contact';
import Nav from './common/Nav';
import LoginPage from './auth/LoginPage';

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Chrome requires returnValue to be set
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className='min-h-dvh flex flex-wrap items-stretch justify-center'>
        <div className='bg-slate-800 w-full md:min-h-100 p-3'>
          <Nav loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route
              exact
              path="/"
              element={loggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/weather"
              element={loggedIn ? <Weather /> : <Navigate to="/login" />}
            />
            <Route
              path="/contact"
              element={loggedIn ? <Contact /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Main;
