import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the provided credentials match the static values
    if (username === 'admin' && password === 'admin') {
      // Call the onLogin function provided by the Main component
      onLogin();
      // Redirect to home page
      navigate('/');
    } else {
      // Handle invalid credentials
      alert('Invalid username or password');
    }
  };

  return (
    <Layout>
    <div class="flex items-start md:items-center justify-center h-screen">
        <form onSubmit={handleLogin} class="bg-slate-950/50 shadow-xl rounded px-8 pt-6 pb-8 mb-4 border-0 w-[500px]">
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
            <input
                class="shadow appearance-none border border-0 rounded w-full bg-slate-950 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                class="shadow appearance-none border border-0 rounded w-full bg-slate-950 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div class="flex items-center justify-between">
            <button
                class="bg-slate-950 hover:bg-slate-900 text-white border-0 font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Sign In
            </button>
            </div>
        </form>
    </div>
    </Layout>
  );
};

export default LoginPage;
