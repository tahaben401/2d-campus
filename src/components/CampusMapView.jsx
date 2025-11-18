// CampusMapView.jsx
import React, { useState, useMemo,useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room/Room';
import { roomStatusColors } from '../constants/roomStatus'; // optional, keep if you use statuses

const CampusMapView = ({ selectedBuilding, selectedFloor, setSelectedFloor }) => {
  const [zoom, setZoom] = useState(1);
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
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
      try {
        const response = await axios.get('http://localhost:3000/api/v1/logement/detail_chambre');
        console.log('Fetched data:', response.data);
        setData(response.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        
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

  // Create a single array of room "definitions" so numbering is simple and deterministic.
  // Each object describes x,y,width,height and optionally special height overrides.
  // Order matters: rooms will be numbered in the order below.
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

  // base number for the selected floor (floor 1 => 100)
  const baseRoomNumber = selectedFloor * 100;

  // Map roomDefs to include roomNumber (1-based index inside the floor)
  // We use the def index (starting at 0) and add 1 so numbers start at base+1.
  const numberedRooms = roomDefs.map((def, idx) => ({
    ...def,
    roomNumber: baseRoomNumber + (idx + 1),
  }));

  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative overflow-hidden group">
      {/* Zoom controls */}
      <div className="absolute bottom-6 left-6 z-10 bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 flex flex-col gap-1">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200"
          title="Zoom In"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200"
          title="Zoom Out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 text-xs font-semibold"
          title="Reset Zoom"
        >
          1×
        </button>
      </div>

      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

      <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden">
        {/* Header */}
        <div className="absolute top-4 left-6 z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedBuilding.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">Étage {selectedFloor}</p>
        </div>

        {/* Floor Selector */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md p-3 rounded-xl border border-slate-300 dark:border-slate-700 flex flex-col items-center gap-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Étages</span>
          <div className="flex flex-col items-center gap-2">
            {floorsDesc.map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                aria-label={`Aller à l'étage ${floor}`}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                  selectedFloor === floor
                    ? 'bg-cyan-500 text-white'
                    : 'bg-transparent text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-700/60'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Campus Map */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            className="max-h-full"
            style={{ transform: `scale(${zoom})` }}
          >
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3498db" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect x="50" y="40" width="90%" height="90%" fill="none" stroke="gray" strokeWidth="5" />

            {/* Campus structural lines (kept as in your file) */}
            <g transform="translate(280, 60)" strokeWidth="3" stroke="gray" fill="none">
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
      {selectedRoom && (
  <div
    className="
      fixed z-50
      bg-white shadow-xl
      p-4 rounded-2xl
      w-64
      animate-fadeIn
    "
    style={{
      left: popupPos.x + 12,
      top: popupPos.y + 12
    }}
  >
    <h3 className="font-bold text-xl mb-2 text-gray-800">
      Chambre {selectedRoom.numero_chambre}
    </h3>

    <div className="space-y-1 text-sm text-gray-700">
      <p><span className="font-semibold">État :</span> {selectedRoom.etat}</p>
      <p><span className="font-semibold">Type : </span> {selectedRoom.type_chambre}</p>
      <p><span className="font-semibold">Bâtiment :</span> {selectedRoom.batiment}</p>
      <p><span className="font-semibold">etudiant :</span> {selectedRoom.etudiant_nom}</p>
    </div>

    <button
      onClick={() => setSelectedRoom(null)}
      className="
        mt-4 w-full
        px-3 py-2 rounded-xl
        text-white bg-red-500 
        hover:bg-red-600 transition
      "
    >
      Fermer
    </button>
  </div>
)}


    </div>
  );
};

export default CampusMapView;
