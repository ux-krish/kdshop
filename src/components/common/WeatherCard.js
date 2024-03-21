import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaWind, FaTint, FaCloudSun, FaThermometerHalf } from 'react-icons/fa';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [cloudCover, setCloudCover] = useState('');

  useEffect(() => {
    fetchGeolocationWeather();
  }, []);

  const fetchWeatherData = async (location) => {
    const apiKey = '3HFR2ZDMXKY4WATWKALPE5EXT';
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeather(data);
      setLocation(data.resolvedAddress);
      setCurrentTemp(data.days[0].temp);
      setHumidity(data.days[0].humidity);
      setWindSpeed(data.days[0].windspeed);
      setCloudCover(data.days[0].cloudcover);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const fetchGeolocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`${latitude},${longitude}`);
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

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      setLoading(true);
      fetchWeatherData(searchInput);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h1 className="text-2xl mb-4 text-gray-800 font-semibold">Weather Updates</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter location..."
          className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="mb-4 flex justify-end">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          onClick={fetchGeolocationWeather}
        >
          Fetch Geolocation
        </button>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <p className="mb-4 text-gray-600">Location: {location}</p>
          <div className="mb-4 flex flex-wrap justify-between">
            <div className="bg-white p-4 rounded-md shadow-md flex-grow mr-4 mb-4 sm:mb-0">
              <p className="text-gray-600 flex items-center">
                <FaThermometerHalf className="mr-2" /> {currentTemp} °C
              </p>
              <p className="text-gray-600 flex items-center">
                <FaWind className="mr-2" /> {windSpeed} km/h
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex-grow mr-4 mb-4 sm:mb-0">
              <p className="text-gray-600 flex items-center">
                <FaTint className="mr-2" /> {humidity}%
              </p>
              <p className="text-gray-600 flex items-center">
                <FaCloudSun className="mr-2" /> {cloudCover}%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {weather && weather.days.slice(1, 16).map((day, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <p className="text-gray-600">{moment(day.datetime).format('MMM D')}</p>
                <p className="text-gray-600">{day.temp} °C</p>
                <p className="text-gray-600">{day.humidity}% Humidity</p>
                <p className="text-gray-600">{day.windspeed} km/h Wind</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
