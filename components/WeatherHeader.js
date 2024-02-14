// WeatherHeader.js

import React from 'react';
import { View, Text } from 'react-native';
import { useWeather } from '../WeatherContext'; // Ensure the correct path here

const WeatherHeader = () => {
  const { temperature, condition } = useWeather();

  return (
    <View>
      {temperature !== null && condition !== null ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
          {`Weather: ${Math.round(temperature - 273.15)}°C, ${condition}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = {
  weatherContainer: {
    backgroundColor: '#f4511e',
    padding: 10,
    alignItems: 'center',
    width:'100%',
  },
  weatherText: {
    color: 'white',
    fontSize: 16,
  },
};

export default WeatherHeader;
