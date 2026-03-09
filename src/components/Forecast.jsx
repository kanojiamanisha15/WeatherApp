import { useMemo } from 'react';
import { getWeatherIconUrl, getWeatherAlt } from '../utils/weatherIcons';

function formatDay(dt) {
  const d = new Date(dt * 1000);
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function Forecast({ forecastData, className = '' }) {
  const daily = useMemo(() => {
    if (!forecastData?.list) return [];
    const byDay = new Map();
    for (const item of forecastData.list) {
      const day = new Date(item.dt * 1000).toDateString();
      if (!byDay.has(day)) byDay.set(day, item);
    }
    return Array.from(byDay.values()).slice(0, 5);
  }, [forecastData]);

  if (!forecastData || daily.length === 0) return null;

  return (
    <section
      className={`rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 p-6 animate-slide-up ${className}`}
      aria-labelledby="forecast-heading"
    >
      <h2 id="forecast-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        5-Day Forecast
      </h2>
      <ul className="space-y-3" role="list">
        {daily.map((item) => {
          const desc = item.weather?.[0];
          const temp = Math.round(item.main?.temp ?? 0);
          return (
            <li
              key={item.dt}
              className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              role="listitem"
            >
              <span className="text-slate-700 dark:text-slate-300 font-medium min-w-[120px]">
                {formatDay(item.dt)}
              </span>
              <img
                src={getWeatherIconUrl(desc?.icon, '')}
                alt={getWeatherAlt(desc?.description)}
                className="w-10 h-10"
                width="40"
                height="40"
              />
              <span className="text-slate-900 dark:text-white font-semibold">
                {temp}°C
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm capitalize hidden sm:block max-w-[100px] truncate">
                {desc?.description ?? '—'}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
