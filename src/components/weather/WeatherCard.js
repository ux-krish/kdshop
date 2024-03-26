import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { FaWind, FaTint, FaThermometerHalf, FaLocationArrow ,FaMapPin   } from 'react-icons/fa';
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
  const [currentConditions , setCurrentConditions] = useState('');
  const [currentMinTemp , setCurrentMinTemp] =useState('');
  const [currentMaxTemp, setCurrentMaxTemp] = useState('');
  const [currentDew, setCurrentDew] = useState('');

  const [backgroundImage, setBackgroundImage] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);



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
      setCurrentTemp(data.currentConditions.feelslike);
      setHumidity(data.currentConditions.humidity);
      setWindSpeed(data.currentConditions.windspeed);
      setCloudCover(data.currentConditions.cloudcover);
      setWeatherDesc(data.description);
      setCurrentConditions(data.currentConditions.conditions);
      setCurrentDew(data.currentConditions.dew);
      setCurrentMinTemp(data.days[0].tempmin);
      setCurrentMaxTemp(data.days[0].tempmax);
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

  return (
    <div className="rounded-md shadow-md">
      <h1 className="text-2xl mb-4 text-slate-200 font-semibold">Weather Updates</h1>
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
      <div className="border border-slate-800 rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4 ">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
       </div>
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
          className="flex w-full overflow-hidden rounded-md shadow-md">

          <div className='flex flex-wrap items-center justify-between p-4  min-h-full bg-gray-950/70 w-full '>
            <div className="flex gap-3 flex-wrap grow flex-col mb-auto">
                <p className="text-slate-200 flex flex-wrap items-start text-6xl font-extrabold mt-2 w-full grow justify-between">
                  <span className='block w-full font-light text-sm px-4'>Feels Like</span>
                  <span className='flex items-center'>
                    <FaThermometerHalf className="mr-1 text-rose-600 text-5xl relative top-[2px]" /> 
                    {Math.round(currentTemp)} 
                    <sup className='text-[20px] relative -top-[12px] left-0'>°C</sup>
                    <span className='flex items-center text-[18px] relative -top-[12px] ms-4'>
                      <FaTint className="mr-[4px] text-sky-300 text-[14px]" />
                      {currentDew}<sup className='text-[8px] relative -top-[3px]'>°C</sup>
                    </span>
                  </span>
                  <span className='flex items-center w-full sm:w-auto text-[13px] mt-4 relative ms-3'>
                    Min {Math.round(currentMinTemp)} <sup className='text-[5px] relative -top-[4px]'>°C</sup> 
                    <FaThermometerHalf className="mr-1 text-sky-300 relative top-[0px]" /> 
                    <span className='mx-3'>-</span> 
                    Max {Math.round(currentMaxTemp)}<sup className='text-[5px] relative -top-[4px]'>°C</sup>
                    <FaThermometerHalf className="mr-1 text-rose-500 relative top-[0px]" />
                  </span>
                </p>
                <p className='px-3 text-3xl'>{currentConditions}</p>
                <div className='flex flex-col items-start px-3'>
                <p className="text-slate-200 flex items-center mb-1">
                  <FaWind className="mr-2 text-sky-300" /> {windSpeed} km/h
                </p>
                <p className="text-slate-200 flex items-center mb-1">
                  <FaTint className="mr-2 text-sky-300" /> {humidity}%
                </p>
                <p className="text-slate-200 flex items-center justify-start relative -left-[12px]">
                  <img src={`${process.env.PUBLIC_URL}/cloudy-day-1.svg`} className='w-9 h-8 object-cover' alt="cloudcover" /> {cloudCover}%
                </p>
                </div>
              </div>
              <div className='mt-2 w-full'>
                <p className="text-slate-400 flex items-center text-[12px]">
                  ***{weatherDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className='flex flex-wrap md:w-3/5'>
              <h2 className='text-3xl font-bold p-5'>15-Days Forcast</h2>
            {weather &&
            weather.days.slice(1, 16).map((day, index) => (
              <div key={index} className="bg-slate-950/90 p-0 shadow-md flex-grow basis-full mb-5 select-none rounded-lg overflow-hidden">
                <p className="text-slate-200 font-bold p-4 border-b-2 border-slate-800 cursor-pointer mb-0" onClick={() => handleDayClick(index)}>
                  {moment(day.datetime).format('MMM D')}
                </p>
                
                  <div className={`transition-all duration-100 ${selectedDayIndex === index ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <table className="text-slate-300 text-start w-full border-spacing-1 table-auto rounded-b-md">
                      <thead className='text-[13px]'>
                        <tr>
                          <th className='text-start bg-slate-900 py-2 px-3 font-medium'>Feels Like Max</th>
                          <th className='text-start bg-slate-900 py-2 px-3 font-medium'>Feels Like Min</th>
                          <th className='text-start bg-slate-900 py-2 px-3 font-medium'>Humidity %</th>
                          <th className='text-start bg-slate-900 py-2 px-3 font-medium'>Wind Speed km/h</th>
                          <th className='text-start bg-slate-900 py-2 px-3 font-medium'>Weather Condition</th>
                        </tr>
                      </thead>
                      <tbody className='bg-slate-100/20 text-[13px] font-extrabold'>
                        <tr>
                          <td className='py-2 px-3 bg-slate-700'>{Math.round(day.feelslikemax)}°C</td>
                          <td className='py-2 px-3 bg-slate-700'>{Math.round(day.feelslikemin)}°C</td>
                          <td className='py-2 px-3 bg-slate-700'>{day.humidity}</td>
                          <td className='py-2 px-3 bg-slate-700'>{day.windspeed}</td>
                          <td className='py-2 px-3 bg-slate-700'>{day.conditions}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
           
              </div>
            ))}
            </div>
            <div className='md:w-2/5'>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;

