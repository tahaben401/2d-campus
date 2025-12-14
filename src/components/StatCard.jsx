import React, { useState, useEffect } from 'react';

const StatCard = ({ icon, value, unit = '', label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate counter effect
  useEffect(() => {
    if (value === '...' || isNaN(value)) {
      setDisplayValue(value);
      return;
    }

    const targetValue = parseInt(value);
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white dark:bg-slate-900/50 
        rounded-2xl p-6
        border border-slate-200/50 dark:border-slate-800/50
        transition-all duration-500
        group cursor-pointer
        ${isHovered ? 'shadow-2xl shadow-cyan-500/10 scale-[1.02] -translate-y-1' : 'shadow-lg'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient on hover */}
      <div className={`
        absolute inset-0 
        bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5
        transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Shimmer effect on hover */}
      <div className={`
        absolute inset-0 
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        -translate-x-full
        ${isHovered ? 'animate-shimmer' : ''}
      `} />

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-50" />

      <div className="relative z-10 flex items-center gap-5">
        {/* Icon container with animation */}
        <div className={`
          relative
          p-4 rounded-2xl
          bg-gradient-to-br from-cyan-500 to-blue-600
          shadow-lg shadow-cyan-500/25
          transition-all duration-500
          ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
        `}>
          {/* Icon glow */}
          <div className={`
            absolute inset-0 rounded-2xl
            bg-cyan-500/50 blur-xl
            transition-opacity duration-500
            ${isHovered ? 'opacity-75' : 'opacity-0'}
          `} />

          <div className="relative z-10 text-white">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Value with counter animation */}
          <div className="flex items-baseline gap-1">
            <span className={`
              text-4xl font-bold tracking-tight
              bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300
              bg-clip-text text-transparent
              transition-all duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}>
              {displayValue}
            </span>
            {unit && (
              <span className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">
                {unit}
              </span>
            )}
          </div>

          {/* Label */}
          <span className={`
            text-sm font-medium mt-1
            transition-colors duration-300
            ${isHovered ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}
          `}>
            {label}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`
        absolute bottom-0 left-0 h-1 
        bg-gradient-to-r from-cyan-500 to-blue-600
        transition-all duration-500
        ${isHovered ? 'w-full' : 'w-0'}
      `} />
    </div>
  );
};

export default StatCard;