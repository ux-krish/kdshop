import React, { useState, useEffect } from 'react';
import { RiSunLine, RiCloudyLine, RiFoggyLine } from 'react-icons/ri';

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
    <div className= " bg-gradient-to-br from-indigo-800 to-purple-900 w-full p-1 rounded-lg shadow-md">
      <div class=" bg-slate-100/20 h-full rounded-md py-4 px-3">
      <h1 className="text-2xl mb-4">Weather Information <span></span></h1>
      <div className="flex mb-4 w-full flex-row">
        <input
          type="text"
          placeholder="Search location..."
          className="shadow-md px-4 py-2 mr-2 border text-slate-50 border-slate-300 bg-stone-800  rounded-lg flex-1"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 py-2 shadow-md bg-stone-800 text-slate-400 rounded-lg basis-1/4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=' bg-gradient-to-br from-sky-400 to-pink-600 shadow-md p-[3px] rounded-lg flex'>
          {weather && (
            <div className='w-full bg-slate-950/80 p-3 rounded-md'>
              <h2 className="text-md mb-2 font-medium">{weather.name}</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-500 mr-2">Temperature:</span>
                <span className="text-md">{Math.floor(weather.main.temp)}°C</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-500 mr-2">Description:</span>
                <span className="text-md">{weather.weather[0].description}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Weather:</span>
                {weather.weather[0].main === 'Clear' && <RiSunLine size={24} />}
                {weather.weather[0].main === 'Clouds' && <RiCloudyLine size={24} />}
                {weather.weather[0].main === 'Mist' && <RiFoggyLine size={24} />}
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
