const variants = {
  primary: 'bg-sky-500 hover:bg-sky-600 text-white',
  secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600',
};

export default function Button({
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2.5 rounded-xl font-medium focus-ring transition-colors shrink-0 ${variants[variant] || variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
