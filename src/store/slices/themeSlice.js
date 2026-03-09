import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('weather-app-theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('weather-app-theme', state.mode);
        document.documentElement.classList.toggle('dark', state.mode === 'dark');
      }
    },
    setTheme: (state, action) => {
      const mode = action.payload === 'dark' ? 'dark' : 'light';
      state.mode = mode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('weather-app-theme', mode);
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
