import React, { useState, useEffect } from 'react';
import { RiSunLine, RiCloudyLine, RiFoggyLine } from 'react-icons/ri';
import { LiaSkyatlas } from "react-icons/lia";
import { BsGeoAlt } from "react-icons/bs"; // Add the location icon
import moment from 'moment';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = 'fec40eb498208bde1cbf13a788a62e34'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

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
          fetchLocationName(latitude, longitude);
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

  const fetchLocationName = async (latitude, longitude) => {
    const apiKey = 'fec40eb498208bde1cbf13a788a62e34'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLocation(data.name);
      setCurrentTemp(data.main.feels_like);
      console.log(data);
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when initiating the search
    
    // Fetch geolocation data first
    if (searchInput.trim() === '') {
      await getUserLocation();
    }
    
    if (searchInput.trim() === '' || searchInput === location) {
      setLoading(false); // Set loading to false as geolocation data is already fetched
      return; // Skip fetching weather data if search input is empty or matches current location
    } else {
      // Otherwise, fetch weather for the searched location
      const apiKey = 'fec40eb498208bde1cbf13a788a62e34'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=metric`;
  
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
          setLocation(data.city.name); // Update location based on the search result
        } else {
          console.error('Error fetching weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data, regardless of success or failure
      }
    }
  };
  
  



  // Function to render weather icons based on weather description
  const renderWeatherIcon = (description) => {
    switch (description) {
      case 'Clear':
        return <RiSunLine className='text-slate-950' size={18} />;
      case 'Clouds':
        return <RiCloudyLine className='text-slate-950' size={18} />;
      case 'Mist':
        return <RiFoggyLine className='text-slate-950' size={18} />;
      default:
        return <LiaSkyatlas className='text-slate-950' size={18} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-sky-400 w-full p-[2px] rounded-lg shadow-md">
      <div className="bg-indigo-600/50 h-full rounded-md py-4 px-3 relative flex-col justify-between flex">
        <h1 className="text-2xl mb-4 text-sky-300 font-semibold">Weather Updates</h1>
        <div className="flex mb-4 w-full flex-row flex-wrap gap-2">
          <button
            className="px-2 text-[12px] py-2 shadow-md border-sky-300 font-semibold border-[2px] bg-stone-800 hover:bg-emerald-500 hover:text-slate-800 active:border-pink-400 active:bg-pink-400 text-sky-300 rounded-lg sm:basis-1/4 lg:basis-1/3 w-full flex items-center justify-center"
            onClick={getUserLocation} // Call getUserLocation when the button is clicked
          >
            <BsGeoAlt className="mr-2" size={18} /> {/* Location icon */}
            Use My Location
          </button>
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
          <div className='h-full bg-gradient-to-br from-sky-300 to-pink-600 shadow-md p-[2px] rounded-lg flex flex-wrap '>
            <div className="flex items-center justify-between mt-4 w-full px-5 mb-4">
              <p className="text-slate-900 text-lg font-bold ">{location}</p>
              <div>
                {weather && weather.list && (
                  <div className="flex items-center">
                    <span className="text-slate-900 text-md mr-2 font-black">{Math.floor(currentTemp - 273.15)}°C</span>
                    {/* Render animated weather icon based on current weather */}
                    {weather.list.map((forecast, index) => {
                      if (moment().isSameOrAfter(moment(forecast.dt_txt)) && moment().isBefore(moment(forecast.dt_txt).add(3, 'hours'))) {
                        return (
                          <div key={index}>
                            {renderWeatherIcon(forecast.weather[0].main)}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
            {weather && weather.list && (
              <div className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-4 pb-4'>
                {weather.list.reduce((accumulator, current) => {
                  const date = moment(current.dt_txt).format('YYYY-MM-DD');
                  const existingIndex = accumulator.findIndex(item => item.date === date);
                  if (existingIndex === -1) {
                    accumulator.push({ date, data: [current] });
                  } else {
                    accumulator[existingIndex].data.push(current);
                  }
                  return accumulator;
                }, []).map((item, index) => (
                  <div key={index} className='bg-slate-950/50 p-3 rounded-md text-xs'>
                    <h2 className='text-sky-300 text-sm font-semibold mb-3'>{moment(item.date).format('dddd')}</h2>
                    {/* <ul className='table flex-wrap'> */}
                    <table className='text-left w-full border-separate rounded-md border-spacing-2 border border-sky-300 bg-slate-950/30'>
                     
                        <>
                          <thead>
                          <tr>
                            <th>Time</th>
                            <th>Temp</th>
                            <th>Sky</th>
                            <th className='text-center'>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          {item.data.map((forecast, i) => (
                          <tr key={i}>
                            <td>{moment(forecast.dt_txt).format('HH:mm')}</td>
                            <td>{Math.floor(forecast.main.temp)}°C</td>
                            <td>{forecast.weather[0].description}</td>
                            <td className='flex justify-center'>{renderWeatherIcon(forecast.weather[0].main)}</td>
                          </tr>
                           ))}
                        </tbody>
                        </>
                     
                    {/* </ul> */}
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default WeatherCard;
