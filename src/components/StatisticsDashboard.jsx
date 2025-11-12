import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import { RoomsIcon, OccupancyIcon, BedIcon, BookingIcon } from './icons';
import { mockStats } from '../data/mockData';

const StatisticsDashboard = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/stats');
        console.log('Fetched stats:', response.data);
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError("Impossible de récupérer les statistiques du serveur.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getCurrentStats = () => {
    if (loading || !stats) return mockStats;

    // Debug log to see what data we're receiving
    console.log('Available buildings in stats:', Object.keys(stats.byBatiment || {}));
    console.log('Selected building:', selectedBuilding);

    // Handle case where selectedBuilding might be null or undefined
    if (!selectedBuilding || !selectedBuilding.name) {
        console.warn('No building selected');
        return mockStats;
    }

    // Use the building name as it appears in the backend response
    const buildingName = selectedBuilding.name;
    const buildingData = stats.byBatiment?.[buildingName];
    
    if (!buildingData) {
        console.warn(`No data found for building: ${buildingName}`);
        return mockStats;
    }

    // Convert floor to string to match backend keys
    const floorKey = selectedFloor.toString();
    const floorCount = buildingData.byEtage?.[floorKey] || 0;

    console.log(`Floor ${floorKey} count:`, floorCount);
    console.log('Building data:', buildingData);

    const occupancyRate = buildingData.total > 0
        ? Math.round((floorCount / buildingData.total) * 100)
        : 0;

    return {
        total: buildingData.total,
        occupancyRate,
        availableBeds: mockStats.availableBeds, 
        ongoingReservations: mockStats.ongoingReservations,
    };
};

  const currentStats = getCurrentStats();
  const floors = Array.from({ length: selectedBuilding.floors || 0 }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Floor Selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {`Statistiques : ${selectedBuilding.name} - Étage ${selectedFloor}`}
        </h2>

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

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4 font-semibold">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<RoomsIcon className="w-7 h-7" />}
          value={loading ? '...' : currentStats.total}
          label="Chambres totales"
        />
        <StatCard
          icon={<OccupancyIcon className="w-7 h-7" />}
          value={loading ? '...' : currentStats.occupancyRate}
          unit="%"
          label="Taux d'occupation"
        />
        <StatCard
          icon={<BedIcon className="w-7 h-7" />}
          value={loading ? '...' : currentStats.availableBeds}
          label="Lits vides"
        />
        <StatCard
          icon={<BookingIcon className="w-7 h-7" />}
          value={loading ? '...' : currentStats.ongoingReservations}
          label="Réservations"
        />
      </div>

      {/* Chart placeholders */}
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
