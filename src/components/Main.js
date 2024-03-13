import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Gallery from './gallery/Gallery';
import Contact from './contact/Contact';
import Nav from './common/Nav';

const Main = () => {
  return (
    <Router>
      <div className=' min-h-dvh  bg-gradient-to-r from-fuchsia-400 to-cyan-400 flex flex-wrap items-stretch justify-center p-[2px]'>
        <div className='bg-slate-800 w-full md:min-h-100 p-3'>
            <Nav />
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default Main