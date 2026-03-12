import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
  },
});
