import React from 'react';
import Layout from '../common/Layout';
import profilepic from '../../assets/uxkd.jpg'

const Contact = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-5 text-slate-100 ">
      <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className=' bg-gradient-to-br from-emerald-500 to-purple-400 h-full items-center flex flex-col justify-center rounded-md py-7 px-3 text-center'>
          <img src={profilepic} className='w-40 rounded-md mb-5' alt="" />
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p>Email: <a href='mailto:krishnendu.rantu@gmail.com'>krishnendu.rantu@gmail.com</a></p>
          <p>Phone: <a href='tel:+919804619061'>+919804619061</a></p>
          <p>Address: 298, Purba Sinthee Bye Lane, Dum Dum, Kolkata - 700030</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Form</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-200 font-semibold mb-2">Name</label>
              <input placeholder='Enter Full Name' type="text" id="name" name="name" className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-200 font-semibold mb-2">Email</label>
              <input placeholder='Enter Email Address' type="email" id="email" name="email" className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-slate-200 font-semibold mb-2">Message</label>
              <textarea placeholder='Enter your query or suggestion...' id="message" name="message" rows="4" className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"></textarea>
            </div>
            <button type="submit" className="bg-gradient-to-br from-cyan-400 to-pink-500 text-slate-200 py-1 px-6 rounded-full hover:bg-blue-600 transition duration-200">Send</button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
