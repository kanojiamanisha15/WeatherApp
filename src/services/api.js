import axios from 'axios';

const API_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export const weatherApi = axios.create({
  baseURL: API_BASE,
  params: { appid: API_KEY, units: 'metric' },
  timeout: 10000,
});

export const getCurrentWeather = (city) =>
  weatherApi.get('/weather', { params: { q: city } });

export const getForecast = (lat, lon) =>
  weatherApi.get('/forecast', { params: { lat, lon } });

export function hasApiKey() {
  return Boolean(API_KEY);
}
