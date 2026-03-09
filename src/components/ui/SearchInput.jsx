import { FiSearch } from 'react-icons/fi';

export default function SearchInput({
  id,
  value,
  onChange,
  placeholder = 'Search...',
  ariaDescribedBy,
  className = '',
  leadingIcon = true,
  ...rest
}) {
  return (
    <div className="relative flex-1">
      {leadingIcon && (
        <span
          className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        >
          {typeof leadingIcon === 'boolean' ? <FiSearch className="w-5 h-5" /> : leadingIcon}
        </span>
      )}
      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        className={`w-full ${leadingIcon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus-ring transition-colors ${className}`}
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}
