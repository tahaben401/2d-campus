import React from 'react';
import { mockExampleRooms } from '../data/mockData';

import { roomStatusColors } from '../constants/roomStatus';

const CampusMapView = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  const floors = Array.from({ length: selectedBuilding.floors }, (_, i) => i + 1);

  return (
    
    <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative overflow-hidden group">
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
      
      
      <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden">
        
        <div className="absolute top-4 left-6 z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedBuilding.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">Étage {selectedFloor}</p>
        </div>
        
        
        <div className="absolute top-4 right-6 z-10 bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 pl-2">Étages</span>
          {floors.map(floor => (
            <button 
              key={floor} 
              onClick={() => setSelectedFloor(floor)} 
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                selectedFloor === floor 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white'
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* monsieur taha ici c'est l'exemple de svg hta tbedel hadchi b dakchi  dialk  */}
        <div class="container">
        <div class="svg-container">
            <svg width="100%" height="700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3498db" stroke-width="0.5" opacity="0.3"/>
                    </pattern>
                </defs>
                
                
                <rect width="97%" height="100%" fill="url(#grid)"/>
                <rect
                    x="60"
                    y="40"
                    width="90%"
                    height="90%"
                    fill="none"
                    stroke="gray"
                    stroke-width="5"
                />
              </svg>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default CampusMapView;