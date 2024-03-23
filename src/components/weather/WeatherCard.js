import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaWind, FaTint, FaCloudSun, FaThermometerHalf, FaLocationArrow  } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi'


const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [weatherDesc, setWeatherDesc] = useState('');

  useEffect(() => {
    fetchGeolocationWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async (location) => {
    const apiKey = '3HFR2ZDMXKY4WATWKALPE5EXT';
  
    // Check if location is coordinates or name
    const isCoordinates = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(location);
    let apiUrl;
  
    if (isCoordinates) {
      // If location is coordinates, directly fetch weather data
      apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;
    } else {
      // If location is name, fetch coordinates first using geocoding API
      const geocodingApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
      
      try {
        const response = await fetch(geocodingApiUrl);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];
          setLocation(display_name); // Update location state with actual address
          apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}`;
        } else {
          console.error('No location found.');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        setLoading(false);
        return;
      }
    }
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeather(data);
      console.log(data);
      setCurrentTemp(data.days[0].temp);
      setHumidity(data.days[0].humidity);
      setWindSpeed(data.days[0].windspeed);
      setCloudCover(data.days[0].cloudcover);
      setWeatherDesc(data.description);
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
          fetchReverseGeocoding(latitude, longitude);
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

  const fetchReverseGeocoding = async (latitude, longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        const address = data.display_name;
        setLocation(address);
        fetchWeatherData(`${latitude},${longitude}`);
      } else {
        console.error('Reverse geocoding error:', data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      setLoading(true);
      setLocation(searchInput); // Update location state with the search input
      fetchWeatherData(searchInput);
      setSearchInput(''); // Reset search input after search
    }
  };
  


  return (
    <div className="rounded-md shadow-md">
      <h1 className="text-2xl mb-4 text-slate-500 font-semibold">Weather Updates</h1>
      <div className="flex items-center mb-4 gap-2">
      <button
          className="w-12 h-12 flex items-center justify-center bg-slate-950/30 text-white rounded-md hover:bg-green-600 focus:outline-none"
          onClick={fetchGeolocationWeather}
        >
          <GiPositionMarker className="text-xl text-slate-500" />
        </button>
        <input
          type="text"
          placeholder="Enter location..."
          className="px-4 h-12 flex-grow bg-slate-950/30 border-0 rounded-md focus:outline-none text-slate-300"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 h-12 bg-slate-950/30 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          <FaLocationArrow className="text-xl text-slate-500" />
        </button>
       
      </div>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <>
          <p className="mb-4 text-slate-500 font-light"><span className='font-bold'>Location:</span> {location}</p>
          <div className="flex flex-wrap items-start justify-between bg-gradient-to-br from-purple-700/30 to-sky-300/30 p-4 rounded-md shadow-md  sm:mb-0 mb-4 min-h-80">
            <div className="flex gap-5 gap-y-2 md:gap-10 mb-0 flex-wrap">
              <p className="text-slate-500 flex items-center">
                <FaThermometerHalf className="mr-2 text-rose-600" /> {currentTemp} °C
                
              </p>
              <p className="text-slate-500 flex items-center">
                <FaWind className="mr-2 text-sky-300" /> {windSpeed} km/h
              </p>
              <p className="text-slate-500 flex items-center">
                <FaTint className="mr-2" /> {humidity}%
              </p>
              <p className="text-slate-500 flex items-center">
                <img src={`${process.env.PUBLIC_URL}/cloudy-day-1.svg`} className='w-10 h-8 object-contain' /> {cloudCover}%
              </p>
            </div>
            <div>
            <p className="text-slate-500 flex items-center">
              ***{weatherDesc}
            </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {weather && weather.days.slice(1, 16).map((day, index) => (
              <div key={index} className="bg-slate-950/30 p-4 rounded-md shadow-md flex-grow">
                <p className="text-slate-500 font-bold">{moment(day.datetime).format('MMM D')}</p>
                <p className="text-slate-500 flex items-center"><FaThermometerHalf className="mr-1" /> {day.temp} °C</p>
                <p className="text-slate-500 flex items-center"><FaTint className="mr-1" />{day.humidity}% Humidity</p>
                <p className="text-slate-500 flex items-center"><FaWind className="mr-1" />{day.windspeed} km/h Wind</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
