// src/components/Header.jsx

import React, { useState } from 'react';
import { mockBuildings } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const Header = ({ selectedBuilding, setSelectedBuilding, setSelectedFloor }) => {
  const { theme, toggleTheme } = useTheme();
  const [isHoveredTheme, setIsHoveredTheme] = useState(false);

  const handleToggleTheme = () => {
    console.log('Bouton cliqué, thème actuel:', theme);
    toggleTheme();
    console.log('toggleTheme appelé');
  };

  return (
    <header className="flex justify-between items-center mb-6">
      {/* Building Selector - Enhanced Design */}
      <div className="flex items-center gap-4">
        {mockBuildings.map((building, idx) => (
          <button
            key={building.id}
            onClick={() => {
              setSelectedBuilding(building);
              setSelectedFloor(1);
            }}
            className={`
              relative min-w-[70px] px-8 py-4 rounded-2xl text-base font-bold 
              transition-all duration-300 overflow-hidden group
              ${selectedBuilding.id === building.id
                ? 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 hover:scale-105 border-2 border-slate-200 dark:border-slate-600 hover:border-cyan-300 dark:hover:border-cyan-600 shadow-md hover:shadow-lg'
              }
            `}
            style={{
              animationDelay: `${idx * 100}ms`
            }}
          >
            {/* Shimmer effect on active */}
            {selectedBuilding.id === building.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}

            {/* Glow effect on hover for inactive */}
            {selectedBuilding.id !== building.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 rounded-2xl" />
            )}

            {/* Building name with icon */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {selectedBuilding.id === building.id && (
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-sm" />
              )}
              <span className="tracking-wide">{building.name}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle with premium design */}
        <button
          onClick={handleToggleTheme}
          onMouseEnter={() => setIsHoveredTheme(true)}
          onMouseLeave={() => setIsHoveredTheme(false)}
          className={`
            relative w-14 h-14 rounded-2xl
            flex items-center justify-center
            transition-all duration-500 overflow-hidden
            ${theme === 'light'
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25'
              : 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-purple-500/25'
            }
            hover:scale-110 hover:rotate-12
          `}
        >
          {/* Animated background */}
          <div className={`
            absolute inset-0 transition-opacity duration-500
            ${theme === 'light'
              ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
              : 'bg-gradient-to-br from-purple-500 to-indigo-700'
            }
            ${isHoveredTheme ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* Sun/Moon icon */}
          <div className="relative z-10 text-white text-2xl transition-transform duration-500">
            {theme === 'light' ? (
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* Sparkle effects */}
          {isHoveredTheme && (
            <>
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '200ms' }} />
            </>
          )}
        </button>

        {/* User Profile with enhanced design */}
        <div className="
          flex items-center gap-4 
          glass-light dark:glass-dark
          px-5 py-3 rounded-2xl
          hover:shadow-xl transition-all duration-300
          group cursor-pointer
          hover:scale-[1.02]
        ">
          {/* Avatar with status ring */}
          <div className="relative">
            <img
              src="https://placehold.co/48x48/06b6d4/ffffff?text=A"
              alt="Admin avatar"
              className="
                rounded-xl w-12 h-12 
                border-2 border-cyan-500/30 
                group-hover:border-cyan-500 
                transition-all duration-300
                group-hover:scale-105
                shadow-lg
              "
            />
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900">
              <div className="absolute inset-0.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bienvenue</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Admin</span>
          </div>

          {/* Dropdown arrow */}
          <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;