import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CampusMapView from './components/CampusMapView';
import StatisticsDashboard from './components/StatisticsDashboard';
import Login from './pages/login';
import Signup from './pages/sigup'
import { mockBuildings } from './data/mockData';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [activeView, setActiveView] = useState('home');

  // ✅ Load user from localStorage (persist login)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ✅ Login handler
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
  
      if (res.data.status === 200) {
        const userData = { email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Logged in:", res.data.message);
      } else {
        console.error("❌", res.data.message);
      }
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data?.message || err.message);
    }
  };
  
  

  // ✅ Signup handler
  const handleSignup = async (fullName, email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        { name: fullName, email, password },
        { withCredentials: true } // ✅ allows cookies
      );
  
      if (res.data.status === 200) {
        const userData = { fullName, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Registered:", res.data.message);
      } else {
        console.error("❌", res.data.message);
      }
    } catch (err) {
      console.error("❌ Signup failed:", err.response?.data?.message || err.message);
    }
  };
  
  

  // ✅ Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Main app layout (shown after login)
  const MainApp = () => (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-sans flex h-screen overflow-hidden antialiased">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <Header
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          setSelectedFloor={setSelectedFloor}
        />
        <button
          onClick={handleLogout}
          className="self-end mb-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Déconnexion
        </button>

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
  );

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<MainApp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
