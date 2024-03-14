import React, { useState, useEffect } from 'react';
import { RiSunLine, RiCloudyLine, RiFoggyLine } from 'react-icons/ri';
import { LiaSkyatlas } from "react-icons/lia";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = 'fec40eb498208bde1cbf13a788a62e34'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      // If search input is empty, fetch weather for default location
      setLoading(true);
      setSearchInput('');
      await getUserLocation();
    } else {
      // Otherwise, fetch weather for the searched location
      setLoading(true);
      const apiKey = 'fec40eb498208bde1cbf13a788a62e34'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-sky-400 w-full p-[2px] rounded-lg shadow-md">
      <div className="bg-indigo-600/50 h-full rounded-md py-4 px-3 relative flex-col justify-between flex">
        <h1 className="text-2xl mb-4 text-sky-300 font-semibold">Weather Updates</h1>
        <div className="flex mb-4 w-full flex-row flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search location..."
            className="shadow-md px-4 py-2 border-[2px] text-slate-50 border-sky-300 bg-stone-800 focus:outline-none focus:border-pink-400 rounded-lg grow flex-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="px-2 text-[12px] py-2 shadow-md border-sky-300 font-semibold border-[2px] bg-stone-800 hover:bg-emerald-500 hover:text-slate-800 active:border-pink-400 active:bg-pink-400 text-sky-300 rounded-lg sm:basis-1/4 lg:basis-1/3 w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className='h-full bg-gradient-to-br from-sky-300 to-pink-600 shadow-md rounded-lg flex min-h-[148px] p-5 items-center justify-center'>
          <p className='text-sky-400 text-xl font-medium'>Loading...</p>
          </div>
        ) : (
          <div className='h-full bg-gradient-to-br from-sky-300 to-pink-600 shadow-md p-[2px] rounded-lg flex'>
            {weather && (
              <div className='w-full h-full bg-slate-950/80 p-3 rounded-md'>
                <h2 className="text-md mb-2 font-medium text-sky-300">{weather.name}</h2>
                <div className='flex flex-wrap gap-2'>
                <div className="flex items-center mr-4">
                  <span className="text-gray-500 mr-2"><RiSunLine size={18} /></span>
                  <span className="text-md text-slate-400">{Math.floor(weather.main.temp)}°C</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="text-gray-500 mr-2"><RiCloudyLine size={18} /></span>
                  <span className="text-md text-slate-400">{weather.main.humidity}%</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="text-gray-500 mr-2"><RiFoggyLine size={18} /></span>
                  <span className="text-md text-slate-400">{weather.wind.speed} m/s</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="text-gray-500 mr-2"><LiaSkyatlas size={18} /></span>
                  <span className="text-md text-slate-400">{weather.visibility} meters</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="text-gray-500 mr-2">Description:</span>
                  <span className="text-md text-slate-400">{weather.weather[0].description}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Weather:</span>
                  {weather.weather[0].main === 'Clear' && <RiSunLine size={24} />}
                  {weather.weather[0].main === 'Clouds' && <RiCloudyLine size={24} />}
                  {weather.weather[0].main === 'Mist' && <RiFoggyLine size={24} />}
                  {weather.weather[0].main == '' && <LiaSkyatlas size={24} className='text-slate-400' />}
                  {console.log(weather.weather[0].main )}
                </div>
                </div>
                
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
