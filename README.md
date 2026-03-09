# Weather App

A simple frontend application that displays current weather and 5-day forecast using the [OpenWeatherMap API](https://openweathermap.org/api). Built with React, Tailwind CSS, React Router, React Query, Redux, and Axios.

## Features

- **City search** – Search for any city and view its weather
- **Current weather** – Temperature, description, humidity, wind, and weather icon
- **5-day forecast** – Daily forecast with temperature and conditions
- **Light / dark mode** – Theme toggle with preference persisted in `localStorage`
- **Recent cities** – Quick access to recently searched cities (stored in `localStorage`)
- **Responsive UI** – Layout adapts to mobile and desktop
- **Accessibility** – Semantic HTML, ARIA labels, keyboard navigation, focus styles

## Tech Stack

- **React** (Vite) – UI and components
- **Tailwind CSS (v3)** – Styling and responsive design
- **React Router DOM** – Navigation and city-based routes
- **React Query (TanStack Query)** – Server state and API caching
- **Redux (Redux Toolkit)** – Global state (theme, recent cities)
- **Axios** – HTTP client for OpenWeatherMap API

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

1. **Clone and install**

   ```bash
   cd WeatherApp
   npm install
   ```

2. **Configure API key**

   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) and create an API key.
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and set your key:
     ```
     VITE_OPENWEATHER_API_KEY=your_actual_api_key
     ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| `npm run dev` | Start development server   |
| `npm run build` | Production build          |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint                |

## Project Structure

```
src/
├── components/       # Reusable UI components
    └── ui/
      ├── Button.jsx
      └── SearchInput.jsx
│   ├── CitySearch.jsx
│   ├── CurrentWeather.jsx
│   ├── Forecast.jsx
│   └── Layout.jsx
├── store/           # Redux store and slices
│   ├── index.js
│   └── slices/
│       ├── themeSlice.js
│       └── searchSlice.js
├── services/        # API and React Query
│   ├── api.js
│   └── weatherQueries.js
├── utils/
│   └── weatherIcons.js
├── views/           # Page-level components
│   ├── HomePage.jsx
│   └── CityWeatherPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## API Usage

- **Current weather:** `GET /weather?q={city}&appid={key}&units=metric`
- **5-day forecast:** `GET /forecast?lat={lat}&lon={lon}&appid={key}&units=metric`  
  Coordinates are taken from the current weather response.

Without a valid `VITE_OPENWEATHER_API_KEY`, the app shows a message asking you to set the key in `.env`.

## License

MIT
