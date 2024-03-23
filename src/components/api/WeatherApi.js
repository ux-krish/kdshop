import moment from "moment";

export async function fetchWeatherData(location) {
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
        const { lat, lon } = data[0];
        apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}`;
      } else {
        throw new Error('No location found.');
      }
    } catch (error) {
      throw new Error(`Error fetching geocoding data: ${error.message}`);
    }
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
}

export async function fetchGeolocationWeather() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(new Error(`Error getting user location: ${error.message}`));
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

export async function fetchReverseGeocoding(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      const address = data.display_name;
      return address;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(`Error fetching reverse geocoding data: ${error.message}`);
  }
}