const ICON_BASE = 'https://openweathermap.org/img/wn';

export function getWeatherIconUrl(iconCode, size = '@2x') {
  if (!iconCode) return `${ICON_BASE}/01d${size}.png`;
  return `${ICON_BASE}/${iconCode}${size}.png`;
}

export function getWeatherAlt(description) {
  return description ? `Weather: ${description}` : 'Weather icon';
}
