import { getWeatherIconUrl, getWeatherAlt } from '../utils/weatherIcons';

export default function CurrentWeather({ data, cityName, className = '' }) {
  if (!data) return null;

  const { main, weather, wind, name } = data;
  const desc = weather?.[0];
  const temp = Math.round(main?.temp ?? 0);
  const feelsLike = Math.round(main?.feels_like ?? 0);
  const humidity = main?.humidity ?? 0;
  const windSpeed = wind?.speed ?? 0;
  const displayName = cityName || name;

  return (
    <section
      className={`rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 p-6 animate-slide-up ${className}`}
      aria-labelledby="current-weather-heading"
    >
      <h2 id="current-weather-heading" className="sr-only">
        Current weather
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIconUrl(desc?.icon)}
            alt={getWeatherAlt(desc?.description)}
            className="w-20 h-20"
            width="80"
            height="80"
          />
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              {displayName}
            </p>
            <p className="text-slate-600 dark:text-slate-300 capitalize">
              {desc?.description ?? '—'}
            </p>
            <p className="text-4xl font-bold text-sky-600 dark:text-sky-400 mt-1">
              {temp}°C
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Feels like {feelsLike}°C
            </p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Humidity</dt>
            <dd className="font-medium">{humidity}%</dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Wind</dt>
            <dd className="font-medium">{windSpeed} m/s</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
