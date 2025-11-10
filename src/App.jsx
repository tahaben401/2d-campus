// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CampusMapView from './components/CampusMapView';
import StatisticsDashboard from './components/StatisticsDashboard';
import Login from './pages/login';
import Signup from './pages/sigup'; 
import { mockBuildings } from './data/mockData';

function App() {
  const [user, setUser] = useState(null); 
  const [authPage, setAuthPage] = useState('login');
  // app state
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [activeView, setActiveView] = useState('home');

  
  const handleLogin = (email, password) => {
    // ici tu feras appel à ton API / vérif. Pour le demo on simule (ba taha)
    console.log('login', email, password);
    setUser({ email }); // marque connecté
  };

  const handleSignup = (fullName, email, password) => {
    console.log('signup', fullName, email);
    setUser({ fullName, email });
  };

  // Toujours rendre ThemeProvider en haut pour que useTheme() fonctionne
  return (
    <ThemeProvider>
      {!user ? (
        authPage === 'login' ? (
          <Login onLogin={handleLogin} onNavigate={(p) => setAuthPage(p)} />
        ) : (
          <Signup onSignup={handleSignup} onNavigate={(p) => setAuthPage(p)} />
        )
      ) : (
        /* Si authentifié : afficher l'app normale */
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
      )}
    </ThemeProvider>
  );
}

export default App;