
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext'; 
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CampusMapView from './components/CampusMapView';
import StatisticsDashboard from './components/StatisticsDashboard';
import { mockBuildings } from './data/mockData';
function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [activeView, setActiveView] = useState('home');

  return (
    
    <ThemeProvider>
      <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-sans flex h-screen overflow-hidden antialiased">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1 flex flex-col p-8 overflow-y-auto">
          <Header 
            selectedBuilding={selectedBuilding} 
            setSelectedBuilding={setSelectedBuilding} 
            setSelectedFloor={setSelectedFloor} 
          />

          {activeView === 'home' ? (
            <CampusMapView 
              selectedBuilding={selectedBuilding} 
              selectedFloor={selectedFloor} 
              setSelectedFloor={setSelectedFloor} 
            />
          ) : (
            <StatisticsDashboard 
              selectedBuilding={selectedBuilding} 
              selectedFloor={selectedFloor} 
              setSelectedFloor={setSelectedFloor} 
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
