import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaWind, FaTint, FaThermometerHalf, FaLocationArrow ,FaMapPin   } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi'
import LoadingUi from '../common/LoadingUi';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaArrowUpLong } from "react-icons/fa6";



const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [currentTempFeel, setCurrentTempFeel] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDir, setWindDir] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [weatherDesc, setWeatherDesc] = useState('');
  const [currentConditions , setCurrentConditions] = useState('');
  const [currentMinTemp , setCurrentMinTemp] =useState('');
  const [currentMaxTemp, setCurrentMaxTemp] = useState('');
  const [currentDew, setCurrentDew] = useState('');

  const [sunrise, setSunrise ] = useState('');
  const [sunset, setSunset] = useState('');

  const [backgroundImage, setBackgroundImage] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const [currentHour, setCurrentHour] = useState(new Date().getHours());



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
        
        // Convert sunset and sunrise times to 12-hour format
        const convertTo12HourFormat = (timeString) => {
            const time = new Date(`1970-01-01T${timeString}`);
            return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
        };
        console.log(data);
        setWeather(data);
        setCurrentTemp(data.currentConditions.temp);
        setCurrentTempFeel(data.currentConditions.feelslike);
        setHumidity(data.currentConditions.humidity);
        setWindSpeed(data.currentConditions.windspeed);
        setWindDir(data.currentConditions.winddir);
        setCloudCover(data.currentConditions.cloudcover);
        setWeatherDesc(data.days[0].description);
        setCurrentConditions(data.currentConditions.conditions);
        setCurrentDew(data.currentConditions.dew);
        setCurrentMinTemp(data.days[0].tempmin);
        setCurrentMaxTemp(data.days[0].tempmax);
        setSunrise(convertTo12HourFormat(data.currentConditions.sunrise));
        setSunset(convertTo12HourFormat(data.currentConditions.sunset));
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
  

  const updateBackground = () => {
    const hour = new Date().getHours(); // Get the current hour
    let background;

    if (hour >= 6 && hour < 12) {
      // Morning
      background = 'morning.jpg';
    } else if (hour >= 12 && hour < 18) {
      // Noon
      background = 'noon.jpg';
    } else if (hour >= 18 && hour < 24) {
      // Evening
      background = 'evening.jpg';
    } else {
      // Night
      background = 'night.jpg';
    }

    setBackgroundImage(background);
  };

  useEffect(() => {
    updateBackground();
    const interval = setInterval(updateBackground, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  
  
  const handleDayClick = (index) => {
    if (selectedDayIndex === index) {
      setSelectedDayIndex(null); // Close the details if the same day is clicked again
    } else {
      setSelectedDayIndex(index); // Open details for the clicked day
    }
  };


  const handleRowClick = (hourIndex) => {
    setCurrentHour(hourIndex === currentHour ? null : hourIndex);
  };
  

  return (
    <div className="rounded-md shadow-md">
      {/* <h1 className="text-2xl mb-4 text-slate-200 font-semibold">Weather Updates</h1> */}
      <div className="flex items-center mb-4 gap-2">
      <button
          className="w-12 h-12 flex items-center justify-center bg-slate-950/30 hover:bg-slate-950/60 text-white rounded-md group focus:outline-none"
          onClick={fetchGeolocationWeather}
        >
          <GiPositionMarker className="text-xl text-slate-500 group-hover:text-green-200" />
        </button>
        <input
          type="text"
          placeholder="Enter location..."
          className="px-4 h-12 flex-grow bg-slate-950/30 border-0 rounded-md focus:outline-none text-slate-300"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 h-12 bg-slate-950/30 hover:bg-slate-950/60 text-white rounded-md group focus:outline-none"
          onClick={handleSearch}
        >
          <FaLocationArrow className="text-xl text-slate-500 group-hover:text-blue-200" />
        </button>
       
      </div>
      {loading ? (
        <LoadingUi />
      ) : (
        <>
          <p className="mb-4 text-slate-400 font-light flex items-start"><span className='font-bold mr-2 ms-2 relative top-[3px]'><FaMapPin  /></span> {location}</p>
          <div
            style={{
              width: '100%',
              minHeight: '300px',
              background: `url(${process.env.PUBLIC_URL}/${backgroundImage}) no-repeat center center fixed`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} 
            className="flex w-full overflow-hidden rounded-md shadow-lg">

              <div className='flex flex-wrap items-center justify-between p-4  min-h-full bg-gray-950/70 w-full '>
                <div className="flex gap-3 flex-wrap grow flex-col mb-auto">
                  <p className="text-slate-200 flex flex-wrap items-start text-6xl font-extrabold mt-2 w-full grow justify-between">
                    <span className='block w-full font-light text-sm px-4 mb-1'>Real Feel : <span className='font-bold'>{currentTempFeel}</span><sup className='text-[8px] relative -top-[4px] font-bold'>°C</sup></span>
                    <span className='flex items-center'>
                      <FaThermometerHalf className="mr-1 text-rose-600 text-5xl relative top-[2px]" /> 
                      {Math.round(currentTemp)} 
                      <sup className='text-[20px] relative -top-[12px] left-0'>°C</sup>
                      <span className='flex items-center text-[18px] relative -top-[12px] ms-4'>
                        <FaTint className="mr-[4px] text-sky-300 text-[14px]" />
                        {currentDew}<sup className='text-[8px] relative -top-[3px]'>°C</sup>
                      </span>
                    </span>
                    <span className='flex items-center w-full sm:w-auto text-[13px] mt-4 sm:mt-1 sm:absolute sm:right-10 relative ms-3'>
                      Max <FaThermometerHalf className="ms-1 mr-1 text-rose-500 relative  text-[10px]" /> {Math.round(currentMaxTemp)}<sup className='text-[5px] relative -top-[4px]'>°C</sup>
                      
                      <span className='mx-3'>-</span> 
                      Min <FaThermometerHalf className="ms-1 mr-1 text-sky-300 relative text-[10px]" /> {Math.round(currentMinTemp)} <sup className='text-[5px] relative -top-[4px]'>°C</sup> 
                       
                    </span>
                  </p>
                  <p className='px-3 md:text-3xl text-lg font-medium'>
                    {currentConditions}
                    {currentConditions === 'Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/cloudy-day-2.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Overcast' && <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Clear' && <img src={`${process.env.PUBLIC_URL}/day.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Rain, Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/rainy-3.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                    {currentConditions === 'Rain, Overcast' && <img src={`${process.env.PUBLIC_URL}/rainy-6.svg`} className='w-20 h-14 mt-2 object-cover' alt="cloudcover" />}
                  </p>
                  <div className='flex flex-wrap items-start px-3'>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    <FaWind className="mr-[6px] text-sky-300" /> {windSpeed} km/h
                  </p>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    Wind Dir : <FaArrowUpLong className="relative ms-1 top-[0px]" style={{ transform : `rotate(${windDir}deg)`, transformOrigin : 'center' }} />
                  </p>
                  <p className="text-slate-200 flex items-center mb-1 mr-4">
                    <FaTint className="mr-[4px] text-sky-300" /> {humidity}%
                  </p>
                  <p className="text-slate-200 flex items-center justify-start -mt-[4px] -ms-[10px] mr-4">
                    <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-9 h-8 object-cover' alt="cloudcover" /> {cloudCover}%
                  </p>
                  <p className='text-slate-200 flex items-center mb-1 mr-4'><FiSunrise className='text-yellow-400 mr-2 text-[15px]' /> {sunrise}</p>
                  <p className='text-slate-200 flex items-center mb-1 mr-4'><FiSunset className='text-orange-600 mr-2 text-[15px]' /> {sunset}</p>
                  </div>
                </div>
                <div className='mt-2 w-full'>
                  <details className='mt-2 w-full cursor-pointer'>
                    <summary className='select-none text-[12px]'>Weather Note.</summary>
                    <p className='text-slate-400 flex items-center text-[10px] px-2'>{weatherDesc}</p>
                  </details>
                </div>
              </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
              <div className='flex flex-wrap justify-between items-start overflow-hidden gap-4'>
                <h2 className='text-lg md:text-3xl font-bold tracking-wider p-5 basis-full text-center'>15-Days <span className='text-slate-600 border-t border-t-rose-400 border-b border-indigo-400 py-2'>24x7</span> Forcast</h2>
                {weather &&
                weather.days.slice(0, 15).map((day, index) => (
                  <div key={index} className="bg-slate-950/50 w-full p-0 shadow-md rounded-lg overflow-hidden">
                    <p className="text-slate-200 flex justify-between font-bold p-4 border-slate-800 cursor-pointer mb-0" onClick={() => handleDayClick(index)}>
                      <span>{moment(day.datetime).format('MMM D, Y')}</span>
                      <span><FaThermometerHalf className="mr-[0px] -mt-[3px] text-rose-500 inline-block text-[14px]" /> {Math.round(day.tempmax)}<sup className='text-[10px]'>°C</sup> - <FaThermometerHalf className="mr-[0px] -mt-[3px] text-sky-500 inline-block text-[14px]" /> {Math.round(day.tempmin)}<sup className='text-[10px]'>°C</sup></span>
                    </p>
                    <div className={`overflow-x-auto w-full transition-all duration-100 ${selectedDayIndex === index ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
                      <table className="text-slate-400 text-center w-full table-fixed rounded-b-md">
                        <thead className='text-[10px] md:text-[15px]'>
                          <tr>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[50px]'>Time</th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[70px]'>Temp</th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[80px]'>Humidity </th>
                            <th className='text-center bg-gray-950 py-2 px-3 font-medium w-[90px]'>Wind Speed</th>
                            <th className='text-left bg-gray-950 py-2 px-3 font-medium w-[150px]'>Weather Condition</th>
                          </tr>
                        </thead>
                        <tbody className='bg-slate-100/20 text-[10px] md:text-[15px] font-extrabold divide-y divide-x-2 divide-solid divide-slate-900'>
                          {day && day.hours.slice(0, 25).map((hour, hourIndex) => (
                            <tr key={hourIndex} className={`${hourIndex === currentHour ? ' bg-gradient-to-r from-sky-600 to-yellow-700 text-slate-900' : ''}`} onClick={() => handleRowClick(hourIndex)}>
                              <td className='py-2 px-3  w-[50px]'>
                              {hourIndex}:00
                              </td>
                              <td className='py-2 px-3  w-[70px]'><FaThermometerHalf className="mr-[2px] -mt-[1px] text-rose-500 inline-block text-[11px] md:text-[15px]" /> {Math.round(hour.temp)}<sup className='text-[7px]'>°C</sup></td>
                              <td className='py-2 px-3  w-[80px]'><FaTint className="mr-[3px] -mt-[2px] text-sky-300 inline-block text-[11px] md:text-[15px]" /> {hour.humidity} %</td>
                              <td className='py-2 px-3  w-[90px]'><FaWind className="mr-[3px] -mt-[2px] text-sky-300 inline-block text-[11px] md:text-[15px]" /> {hour.windspeed} <sup className='font-light text-[7px]'>km/h</sup></td>
                              <td className='py-2 px-3  w-min-[150px] text-center flex items-center justify-start'>
                                
                                <span>
                                {hour.conditions === 'Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/cloudy-day-2.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Overcast' && <img src={`${process.env.PUBLIC_URL}/cloudy.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Clear' && <img src={`${process.env.PUBLIC_URL}/day.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Rain, Partially cloudy' && <img src={`${process.env.PUBLIC_URL}/rainy-3.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                {hour.conditions === 'Rain, Overcast' && <img src={`${process.env.PUBLIC_URL}/rainy-6.svg`} className='w-9 h-8 mx-auto object-cover' alt="cloudcover" />}
                                </span>
                                <span className='text-[11px] md:text-[15px] font-normal'>{hour.conditions}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;

