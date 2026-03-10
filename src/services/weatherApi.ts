const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  windSpeed: number; // in m/s
  windDeg: number;   // in degrees
}

export const fetchWeatherForCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  if (!API_KEY) {
    return { windSpeed: 5, windDeg: 45 };
  }

  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    
    const data = await response.json();
    return {
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { windSpeed: 5, windDeg: 45 };
  }
};
