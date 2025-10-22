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
        <svg viewBox="0 0 800 500" className="w-full h-full">
          <defs>
            <radialGradient id="grad-bg">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.1)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
            </radialGradient>
           
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(203, 213, 225, 0.8)" /* Light mode grid color */ className="dark:stroke-[rgba(51,65,85,0.5)]"  strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad-bg)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {mockExampleRooms.map(room => (
            <g key={room.id} className="cursor-pointer group/room">
              <rect 
                x={room.x} y={room.y} width="60" height="60" rx="8" 
                
                className={`${roomStatusColors[room.status]} transition-all duration-200 stroke-2 stroke-slate-300 dark:stroke-slate-700 group-hover/room:stroke-cyan-400 group-hover/room:scale-110 origin-center`} 
              />
              <text 
                x={room.x + 30} y={room.y + 35} textAnchor="middle" 
                
                className="fill-slate-800 dark:fill-white font-bold text-sm pointer-events-none"
              >
                {`C.${room.id.toString().padStart(3, '0')}`}
              </text>
            </g>
          ))}
        </svg>
        
        <div className="absolute bottom-4 left-6 flex items-center gap-4 text-xs z-10">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div>Disponible</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div>Occupée</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div>Maintenance</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-600"></div>Hors service</div>
        </div>
      </div>
    </div>
  );
};

export default CampusMapView;