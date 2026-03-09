import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    weather: weatherReducer,
  },
});
