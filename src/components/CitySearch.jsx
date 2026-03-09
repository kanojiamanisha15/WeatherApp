import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecentCity } from '../store/slices/searchSlice';
import SearchInput from './ui/SearchInput';
import Button from './ui/Button';

export default function CitySearch({ recentCities = [], onSearch, placeholder = 'Search city...', compact = false }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const city = value.trim();
      if (!city) return;
      dispatch(addRecentCity(city));
      if (onSearch) onSearch(city);
      else navigate(`/city/${encodeURIComponent(city)}`);
      setValue('');
    },
    [value, dispatch, navigate, onSearch]
  );

  const handleRecentClick = (city) => {
    dispatch(addRecentCity(city));
    navigate(`/city/${encodeURIComponent(city)}`);
    setValue('');
  };

  return (
    <div className="w-full animate-fade-in">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <SearchInput
          id="city-search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          ariaDescribedBy={recentCities.length ? 'recent-cities' : undefined}
        />  
        <Button type="submit" aria-label="Search weather">
          Search
        </Button>
      </form>
      {!compact && recentCities.length > 0 && (
        <div id="recent-cities" className="mt-2 flex flex-wrap gap-2" role="list" aria-label="Recent cities">
          {recentCities.map((city) => (
            <Button
              key={city}
              type="button"
              variant="secondary"
              className="px-3 py-1.5 text-sm rounded-lg"
              onClick={() => handleRecentClick(city)}
              role="listitem"
            >
              {city}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
