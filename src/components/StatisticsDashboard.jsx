import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import { RoomsIcon, OccupancyIcon, BedIcon } from './icons';

const StatisticsDashboard = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  const [stats, setStats] = useState(null);
  const [logementsData, setLogementsData] = useState(null);
  const [chambresDetails, setChambresDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TOTAL_CHAMBRES_PAR_ETAGE = 30; // Nombre fixe de chambres par étage

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats (étudiants par bâtiment/étage)
        const statsResponse = await axios.get('http://localhost:3000/api/v1/stats');
        console.log('Fetched stats:', statsResponse.data);
        setStats(statsResponse.data);

        // Fetch logements (Occupée/Disponible counts)
        const logementsResponse = await axios.get('http://localhost:3000/api/v1/logement');
        console.log('Fetched logements:', logementsResponse.data);
        setLogementsData(logementsResponse.data.data);

        // Fetch chambres details (détails complets)
        const chambresResponse = await axios.get('http://localhost:3000/api/v1/logement/detail_chambre');
        console.log('Fetched chambres details:', chambresResponse.data);
        setChambresDetails(chambresResponse.data.data);

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Impossible de récupérer les données du serveur.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const getCurrentStats = () => {
    if (loading || !stats || !logementsData || !chambresDetails) {
      return {
        total: TOTAL_CHAMBRES_PAR_ETAGE,
        occupancyRate: 0,
        availableBeds: TOTAL_CHAMBRES_PAR_ETAGE,
      };
    }

    // Handle case where selectedBuilding might be null or undefined
    if (!selectedBuilding || !selectedBuilding.name) {
      console.warn('No building selected');
      return {
        total: TOTAL_CHAMBRES_PAR_ETAGE,
        occupancyRate: 0,
        availableBeds: TOTAL_CHAMBRES_PAR_ETAGE,
      };
    }

    // Get building name and data
    const buildingName = selectedBuilding.name;
    const buildingData = stats.byBatiment?.[buildingName];
    
    // Convert floor to string to match backend keys
    const floorKey = selectedFloor.toString();
    
    // Filter chambres for current building and floor
    const chambresForFloor = chambresDetails.filter(
      chambre => chambre.batiment === buildingName && chambre.etage?.toString() === floorKey
    );

    console.log(`Chambres for ${buildingName} - Floor ${floorKey}:`, chambresForFloor);

    // Calculate statistics for this specific floor
    const occupiedChambresFloor = chambresForFloor.filter(
      chambre => chambre.etat === 'Occupée'
    ).length;

    // Les chambres disponibles = Total (30) - Occupées
    const availableChambresFloor = TOTAL_CHAMBRES_PAR_ETAGE - occupiedChambresFloor;

    // Calculate occupancy rate based on 30 chambres
    const occupancyRate = Math.round((occupiedChambresFloor / TOTAL_CHAMBRES_PAR_ETAGE) * 100);

    return {
      total: TOTAL_CHAMBRES_PAR_ETAGE,
      occupancyRate,
      availableBeds: availableChambresFloor,
    };
  };

  // Préparer les données pour le graphique "Taux d'occupation par bâtiment"
  const getOccupancyByBuildingData = () => {
    if (!stats || !chambresDetails) return [];

    return Object.keys(stats.byBatiment).map(batiment => {
      // Compter les chambres occupées pour ce bâtiment
      const chambresInBuilding = chambresDetails.filter(c => c.batiment === batiment);
      const occupiedChambres = chambresInBuilding.filter(c => c.etat === 'Occupée').length;
      
      // Si le bâtiment a 3 étages, total = 3 × 30 = 90 chambres
      const buildingFloors = stats.byBatiment[batiment]?.byEtage ? Object.keys(stats.byBatiment[batiment].byEtage).length : 3;
      const totalChambresInBuilding = buildingFloors * TOTAL_CHAMBRES_PAR_ETAGE;
      
      const occupancyRate = Math.round((occupiedChambres / totalChambresInBuilding) * 100);

      return {
        batiment,
        taux: occupancyRate,
        occupees: occupiedChambres,
        disponibles: totalChambresInBuilding - occupiedChambres,
        total: totalChambresInBuilding
      };
    });
  };

  const currentStats = getCurrentStats();
  const floors = Array.from({ length: selectedBuilding?.floors || 0 }, (_, i) => i + 1);
  const occupancyData = getOccupancyByBuildingData();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header & Floor Selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {`Statistiques : ${selectedBuilding?.name || 'N/A'} - Étage ${selectedFloor}`}
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
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-400 text-center font-semibold">
            {error}
          </p>
        </div>
      )}

      {/* Stat Cards - Seulement 3 cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
          label="Lits disponibles"
        />
      </div>

      {/* Graphique unique: Taux d'occupation par bâtiment */}
      <div className="flex-1">
        <div className="bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
            Taux d'occupation par bâtiment
          </h3>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <p className="text-slate-400 dark:text-slate-500">Chargement...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis 
                  dataKey="batiment" 
                  className="text-slate-600 dark:text-slate-400"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  className="text-slate-600 dark:text-slate-400"
                  label={{ 
                    value: 'Taux d\'occupation (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                  domain={[0, 100]}
                  style={{ fontSize: '14px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '12px'
                  }}
                  formatter={(value, name, props) => {
                    const { payload } = props;
                    if (name === 'taux') {
                      return [
                        <div key="tooltip">
                          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {value}% d'occupation
                          </div>
                          <div style={{ fontSize: '12px', opacity: 0.8 }}>
                            Occupées: {payload.occupees} / {payload.total}
                          </div>
                          <div style={{ fontSize: '12px', opacity: 0.8 }}>
                            Disponibles: {payload.disponibles}
                          </div>
                        </div>,
                        ''
                      ];
                    }
                    return [value, name];
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="square"
                />
                <Bar 
                  dataKey="taux" 
                  fill="#06b6d4" 
                  name="Taux d'occupation (%)" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={80}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;