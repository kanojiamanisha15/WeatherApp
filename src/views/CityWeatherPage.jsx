import { useParams, Link } from 'react-router-dom';
import { hasApiKey } from '../services/api';
import { useCurrentWeather, useForecast } from '../services/weatherQueries';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';

export default function CityWeatherPage() {
  const { city } = useParams();
  const decodedCity = city ? decodeURIComponent(city) : '';

  const {
    data: currentData,
    isLoading: currentLoading,
    isError: currentError,
    error: currentWeatherError,
  } = useCurrentWeather(decodedCity);

  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;

  const {
    data: forecastData,
    isLoading: forecastLoading,
    isError: forecastIsError,
    error: forecastError,
  } = useForecast(lat, lon);

  if (!hasApiKey()) {
    return (
      <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-amber-800 dark:text-amber-200 animate-fade-in">
        <p className="font-medium">API key required</p>
        <p className="text-sm mt-1">
          Create a <code className="bg-amber-100 dark:bg-slate-700 px-1 rounded">.env</code> file with{' '}
          <code className="bg-amber-100 dark:bg-slate-700 px-1 rounded">VITE_OPENWEATHER_API_KEY=your_key</code> and restart the dev server.
        </p>
        <Link to="/" className="inline-block mt-3 text-sky-600 dark:text-sky-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  if (!decodedCity) {
    return (
      <div className="animate-fade-in">
        <p className="text-slate-600 dark:text-slate-400">No city specified.</p>
        <Link to="/" className="text-sky-600 dark:text-sky-400 hover:underline mt-2 inline-block">
          ← Search for a city
        </Link>
      </div>
    );
  }

  if (currentLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in" role="status" aria-live="polite">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-600 dark:text-slate-400">Loading weather for {decodedCity}…</p>
      </div>
    );
  }

  if (currentError) {
    const message = currentWeatherError?.response?.data?.message || currentWeatherError?.message || 'Failed to load weather';
    return (
      <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-800 dark:text-red-200 animate-fade-in">
        <p className="font-medium">Could not load weather</p>
        <p className="text-sm mt-1">{message}</p>
        <Link to="/" className="inline-block mt-3 text-sky-600 dark:text-sky-400 hover:underline">
          ← Try another city
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <nav className="text-sm" aria-label="Breadcrumb">
        <Link to="/" className="text-sky-600 dark:text-sky-400 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-700 dark:text-slate-300">{decodedCity}</span>
      </nav>
      <CurrentWeather data={currentData} cityName={decodedCity} />
      {forecastLoading ? (
        <div className="flex justify-center py-8" role="status" aria-live="polite">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : forecastIsError ? (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-800 dark:text-red-200 animate-fade-in">
          <p className="font-medium">Could not load forecast</p>
          <p className="text-sm mt-1">{forecastError?.response?.data?.message || forecastError?.message || 'Failed to load forecast'}</p>
        </div>
      ) : forecastData ? (
        <Forecast forecastData={forecastData} />
      ) : null}
    </div>
  );
}
