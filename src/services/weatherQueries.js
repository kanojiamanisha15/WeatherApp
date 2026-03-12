import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getForecast, hasApiKey } from './api';

const weatherKeys = {
  current: (city) => ['weather', 'current', city],
  forecast: (lat, lon) => ['weather', 'forecast', lat, lon],
};

export function useCurrentWeather(city, options = {}) {
  return useQuery({
    queryKey: weatherKeys.current(city),
    queryFn: async () => {
      const { data } = await getCurrentWeather(city);
      return data;
    },
    enabled: Boolean(city?.trim()) && hasApiKey(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

export function useForecast(lat, lon, options = {}) {
  return useQuery({
    queryKey: weatherKeys.forecast(lat, lon),
    queryFn: async () => {
      const { data } = await getForecast(lat, lon);
      return data;
    },
    enabled: typeof lat === 'number' && typeof lon === 'number' && hasApiKey(),
    staleTime: 1000 * 60 * 30,
    ...options,
  });
}
