// WeatherService.js

// Assuming you are using fetch in a React Native or Expo environment

const getWeather = async (city) => {
  const apiKey = 'c8dc99fb06ed67379f5fb76518c4c3f7'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export { getWeather };
