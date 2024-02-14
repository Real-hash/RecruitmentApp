// WeatherContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWeather } from './WeatherService'; // Ensure the correct path here

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    condition: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await getWeather('Cape Town'); // Pass the city name here
        setWeatherData({
          temperature: weather.main.temp,
          condition: weather.weather[0].description,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const weatherData = useContext(WeatherContext);
  return weatherData;
};
