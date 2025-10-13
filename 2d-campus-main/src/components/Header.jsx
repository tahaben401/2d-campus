// src/components/Header.jsx

import React from 'react';
import { mockBuildings } from '../data/mockData';
import { useTheme } from '../context/ThemeContext'; 

const Header = ({ selectedBuilding, setSelectedBuilding, setSelectedFloor }) => {
  
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {mockBuildings.map(building => (
          <button 
            key={building.id} 
            onClick={() => { 
              setSelectedBuilding(building); 
              setSelectedFloor(1); 
            }}
        
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              selectedBuilding.id === building.id 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' // Le style actif fonctionne bien pour les deux modes
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 dark:text-slate-300'
            }`}
          >
            {building.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        
        <button 
          onClick={toggleTheme}
          className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 text-xl"
        >
          {theme === 'light' ? '☀️' : '🌙'}
        </button>

        
        <div className="flex items-center gap-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <img 
            src="https://placehold.co/40x40/e2e8f0/475569?text=A" 
            alt="Admin avatar" 
            className="rounded-full w-10 h-10 border-2 border-slate-300 dark:border-slate-600 hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400">Bienvenue </span>
            <span className="font-semibold text-sm">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;