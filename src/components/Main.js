import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Gallery from './gallery/Gallery';
import Contact from './contact/Contact';
import Nav from './common/Nav';

const Main = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className=' min-h-dvh  flex flex-wrap items-stretch justify-center'>
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