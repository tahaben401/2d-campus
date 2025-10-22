import React from 'react';
import StatCard from './StatCard';
import { RoomsIcon, OccupancyIcon, BedIcon, BookingIcon } from './icons';
import { mockStats } from '../data/mockData';


const StatisticsDashboard = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  
  
  const floors = Array.from({ length: selectedBuilding.floors }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col">
      
      {/* 3. Le titre et le sélecteur sont maintenant sur la même ligne */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {`Statistiques : ${selectedBuilding.name} - Étage ${selectedFloor}`}
        </h2>
        
        {/* 4. Le sélecteur d'étages (copié de CampusMapView) */}
        <div className="bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-1">
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
      </div>
      
      {/* Le reste du tableau de bord ne change pas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        <StatCard 
          icon={<RoomsIcon className="w-7 h-7" />} 
          value={mockStats.totalRooms} 
          label="Chambres totales" 
        />
        <StatCard 
          icon={<OccupancyIcon className="w-7 h-7" />} 
          value={mockStats.occupancyRate} 
          unit="%" 
          label="Taux d'occupation" 
        />
        
        <StatCard
        icon={<BedIcon className='w-7 h-7'/>}
        value={mockStats.availableBeds} 
        label="Lits vides"
        />
        <StatCard
        icon={<BookingIcon className='w-7 h-7'/>}
        value={mockStats.ongoingReservations}
        label="Reservation"
        />

      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Taux d'occupation par bloc</h3>
          <p className="text-slate-400 dark:text-slate-500">Espace réservé au graphique</p>
        </div>
        <div className="bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Revenus mensuels</h3>
          <p className="text-slate-400 dark:text-slate-500">Espace réservé au graphique</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;