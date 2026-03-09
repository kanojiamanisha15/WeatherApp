import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CitySearch from '../components/CitySearch';

export default function HomePage() {
  const recentCities = useSelector((state) => state.search.recentCities);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Check the weather
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Search for a city to see current weather and 5-day forecast.
      </p>
      <CitySearch recentCities={recentCities} placeholder="e.g. London, Tokyo" />
      {recentCities.length > 0 && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Or pick a recent city above to view its weather.
        </p>
      )}
    </div>
  );
}
