import React from 'react';
import { useTheme } from '../context/ThemeContext';

const DarkToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Basculer le thème"
      className={`bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 ${className}`}
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  );
};
export default DarkToggle;
