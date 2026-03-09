import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import CitySearch from './CitySearch';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const recentCities = useSelector((state) => state.search.recentCities);
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              to="/"
              className="text-xl font-bold text-sky-600 dark:text-sky-400 hover:underline focus-ring rounded-lg"
            >
              Weather App
            </Link>
            <div className="flex-1 w-full sm:max-w-md">
              <CitySearch recentCities={recentCities} compact />
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus-ring shrink-0 self-start sm:self-center"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? (
                <span className="text-xl" aria-hidden="true">☀️</span>
              ) : (
                <span className="text-xl" aria-hidden="true">🌙</span>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-700 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Data from OpenWeatherMap</p>
      </footer>
    </div>
  );
}
