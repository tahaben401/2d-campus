// CampusMapView.jsx
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room/Room';
import RoomDetailPopup from '../components/RoomDetailPopup';
import { roomStatusColors } from '../constants/roomStatus';

const CampusMapView = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  const [zoom, setZoom] = useState(1);
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const apiRoomByNumber = useMemo(() => {
    const map = {};
    data.forEach(r => {
      if (r.batiment === selectedBuilding.name) {
        map[Number(r.numero_chambre)] = r;
      }
    });
    return map;
  }, [data, selectedBuilding.name]);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/logement/detail_chambre');
        console.log('Fetched data:', response.data);
        setData(response.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // floors list (1..N)
  const floors = useMemo(
    () => Array.from({ length: selectedBuilding.floors }, (_, i) => i + 1),
    [selectedBuilding.floors]
  );
  const floorsDesc = [...floors].sort((a, b) => b - a);

  // Room definitions
  const roomDefs = [
    // Left part rooms (9 rooms)
    ...[227, 267, 307, 347, 387, 427, 467, 507, 547].map((y, i) => ({
      id: `left-${i}`,
      x: 298,
      y,
      width: 72,
      height: i === 8 ? 65 : 40,
      group: 'left',
    })),

    // Down part rooms (4 rooms)
    ...[405, 445, 485, 525].map((x, i) => ({
      id: `down-${i}`,
      x,
      y: 544,
      width: 40,
      height: 68,
      group: 'down',
    })),

    // Top right part rooms (10 rooms)
    ...[66, 104, 142, 180, 218, 256, 294, 332, 372, 410].map((y, i) => ({
      id: `top-right-${i}`,
      x: 398,
      y,
      width: 78,
      height: i === 9 ? 48 : 38,
      group: 'top-right',
    })),

    // Down right rooms (4 rooms)
    ...[538, 578, 618, 658].map((x, i) => ({
      id: `down-right-${i}`,
      x,
      y: 440,
      width: i === 3 ? 50 : 40,
      height: 78,
      group: 'down-right',
    })),

    // Top curved rooms (2)
    ...[70, 111].map((y, i) => ({
      id: `top-curved-${i}`,
      x: 290,
      y,
      width: 79,
      height: 42,
      group: 'top-curved',
    })),

    // Down curved rooms (2)
    ...[625, 665].map((x, i) => ({
      id: `down-curved-${i}`,
      x,
      y: 544,
      width: 40,
      height: 78,
      group: 'down-curved',
    })),
  ];

  // base number for the selected floor
  const baseRoomNumber = selectedFloor * 100;

  // Map roomDefs to include roomNumber
  const numberedRooms = roomDefs.map((def, idx) => ({
    ...def,
    roomNumber: baseRoomNumber + (idx + 1),
  }));

  // Legend items
  const legendItems = [
    { status: 'Disponible', color: roomStatusColors['Disponible'], label: 'Disponible' },
    { status: 'Occupée', color: roomStatusColors['Occupée'], label: 'Occupée' },
    { status: 'En maintenance', color: roomStatusColors['En maintenance'], label: 'Maintenance' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative overflow-hidden group">

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Zoom controls with improved design */}
      <div className="absolute bottom-6 left-6 z-10 bg-white dark:bg-slate-800 p-2 rounded-2xl flex flex-col gap-2 border border-slate-200 dark:border-slate-700 shadow-lg">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          className="p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="Zoom In"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          className="p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="Zoom Out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <div className="h-px bg-slate-300 dark:bg-slate-700 mx-2" />
        <button
          onClick={() => setZoom(1)}
          className="p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-sm font-bold"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Légende</p>
        <div className="flex flex-col gap-2">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group/legend cursor-pointer">
              <div
                className="w-4 h-4 rounded-md shadow-md transition-all duration-300 group-hover/legend:scale-125"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium group-hover/legend:text-slate-900 dark:group-hover/legend:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

      <div className="relative w-full h-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-800/50">

        {/* Header */}
        <div className="absolute top-4 left-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedBuilding.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Étage {selectedFloor}
              </p>
            </div>
          </div>
        </div>

        {/* Floor Selector - Enhanced */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-700 shadow-lg">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Étages</span>
          <div className="flex flex-col items-center gap-2">
            {floorsDesc.map((floor, idx) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                aria-label={`Aller à l'étage ${floor}`}
                className={`w-14 h-14 flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${selectedFloor === floor
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-110'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'
                  }`}
                style={{
                  animationDelay: `${idx * 50}ms`
                }}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 z-20 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Chargement...</p>
            </div>
          </div>
        )}

        {/* SVG Campus Map */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            className="max-h-full transition-transform duration-500 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3498db" strokeWidth="0.3" opacity="0.2" />
              </pattern>
              {/* Gradient for walls */}
              <linearGradient id="wall-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect x="50" y="40" width="90%" height="90%" fill="none" stroke="#64748b" strokeWidth="5" rx="4" />

            {/* Campus structural lines */}
            <g transform="translate(280, 60)" strokeWidth="3" stroke="#475569" fill="none">
              <line x1="197.04" y1="6.5625" x2="197.04" y2="378.562" />
              <line x1="196.54" y1="378.062" x2="428.54" y2="378.062" />
              <line x1="429.04" y1="378.562" x2="429.04" y2="458.562" />
              <line x1="17.0402" y1="119.542" x2="17.0402" y2="552.583" />
              <line x1="16.5402" y1="552.062" x2="320.54" y2="552.062" />
              <line x1="320.04" y1="552.562" x2="320.04" y2="482.562" />
              <line x1="320.54" y1="483.062" x2="91.5402" y2="483.062" />
              <line x1="91.0402" y1="482.562" x2="91.0402" y2="6.5625" />
              <line x1="16.5402" y1="119.062" x2="91.5402" y2="119.062" />
              <line x1="320.54" y1="482.062" x2="428.54" y2="482.062" />
              <line x1="116.54" y1="6.0625" x2="196.54" y2="6.0625" />
              <line x1="117.04" y1="6.5625" x2="117.04" y2="397.562" />
              <line x1="116.54" y1="397.062" x2="196.54" y2="397.062" />
              <line x1="197.04" y1="378.562" x2="197.04" y2="397.562" />
              <line x1="428.54" y1="459.062" x2="257.54" y2="459.062" />
              <line x1="257.04" y1="458.562" x2="257.04" y2="430.562" />
              <line x1="257.54" y1="431.062" x2="196.54" y2="431.062" />
              <line x1="196.04" y1="430.562" x2="196.04" y2="397.562" />
              <line x1="16.5402" y1="165.062" x2="91.5402" y2="165.062" />
              <line x1="238.54" y1="430.567" x2="238.54" y2="378.558" />

              {/* Curved sections */}
              <path d="M91.4601 7.55649C57.2641 -2.19607 39.0322 -1.34184 7.53726 7.0625" />
              <path d="M8.04021 6.5625C-2.49781 43.1147 -1.51704 62.6897 8.04021 96.5625" />
              <path d="M7.54021 96.0625C23.5402 110.562 54.5394 99.7347 91.5402 96.0625" />
              <path d="M344.033 482.476C332.78 533.657 323.885 565.072 359.033 567.476" />
              <path d="M374.278 571.137C420.349 574.846 434.72 566.217 439.278 531.137" />
              <path d="M429.023 482.434C435.175 494.506 436.489 501.023 437.023 512.434" />
              <line x1="387.04" y1="482.568" x2="386.029" y2="572.562" />
            </g>

            {/* Render rooms */}
            {numberedRooms.map(room => (
              <Room
                key={room.id}
                roomNumber={room.roomNumber}
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                apiRoom={apiRoomByNumber[room.roomNumber]}
                onClick={(e) => {
                  setSelectedRoom(apiRoomByNumber[room.roomNumber]);
                  setPopupPos({ x: e.clientX, y: e.clientY });
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Room Detail Popup */}
      {selectedRoom && (
        <RoomDetailPopup
          room={selectedRoom}
          position={popupPos}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
};

export default CampusMapView;
