import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast } from '../../services/api';

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (city, { rejectWithValue }) => {
    try {
      const { data } = await getCurrentWeather(city);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err?.message || 'Failed to load weather');
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const { data } = await getForecast(lat, lon);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err?.message || 'Failed to load forecast');
    }
  }
);

const initialState = {
  currentWeather: null,
  forecast: null,
  currentCity: null,
  currentWeatherStatus: 'idle',
  currentWeatherError: null,
  forecastStatus: 'idle',
  forecastError: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.currentCity = null;
      state.currentWeatherStatus = 'idle';
      state.currentWeatherError = null;
      state.forecastStatus = 'idle';
      state.forecastError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Current weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.currentWeatherStatus = 'loading';
        state.currentWeatherError = null;
        state.currentWeather = null;
        state.forecast = null;
        state.forecastStatus = 'idle';
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.currentWeatherStatus = 'succeeded';
        state.currentWeather = action.payload;
        state.currentCity = action.payload?.name;
        state.currentWeatherError = null;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.currentWeatherStatus = 'failed';
        state.currentWeatherError = action.payload;
      })
      // Forecast
      .addCase(fetchForecast.pending, (state) => {
        state.forecastStatus = 'loading';
        state.forecastError = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecastStatus = 'succeeded';
        state.forecast = action.payload;
        state.forecastError = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.forecastStatus = 'failed';
        state.forecastError = action.payload;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
