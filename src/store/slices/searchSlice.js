import { createSlice } from '@reduxjs/toolkit';

const MAX_RECENT = 5;
const getStoredRecent = () => {
  try {
    const raw = localStorage.getItem('weather-app-recent-cities');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    recentCities: getStoredRecent(),
    lastSearchedCity: null,
  },
  reducers: {
    addRecentCity: (state, action) => {
      const city = action.payload?.trim();
      if (!city) return;
      state.recentCities = [
        city,
        ...state.recentCities.filter((c) => c.toLowerCase() !== city.toLowerCase()),
      ].slice(0, MAX_RECENT);
      state.lastSearchedCity = city;
      try {
        localStorage.setItem('weather-app-recent-cities', JSON.stringify(state.recentCities));
      } catch {}
    },
    setLastSearchedCity: (state, action) => {
      state.lastSearchedCity = action.payload;
    },
    clearRecentCities: (state) => {
      state.recentCities = [];
      try {
        localStorage.removeItem('weather-app-recent-cities');
      } catch {}
    },
  },
});

export const { addRecentCity, setLastSearchedCity, clearRecentCities } = searchSlice.actions;
export default searchSlice.reducer;
