import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CampusMapView from './components/CampusMapView';
import StatisticsDashboard from './components/StatisticsDashboard';
import Chatbot from './components/chatbot'; // ✅ Import du chatbot
import Login from './pages/login';
import Signup from './pages/sigup';
import { mockBuildings } from './data/mockData';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import { toast, Toaster } from 'sonner';

function App() {
  const [user, setUser] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [activeView, setActiveView] = useState('home');

 
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

 
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
        toast.success('Connecté avec succès !');
      } else {
        console.error("❌", res.data.message);
        toast.error('Erreur de connexion !');
      }
    } catch (err) {
      console.error(" Login failed:", err.response?.data?.message || err.message);
      toast.error('Identifiants incorrects !');
    }
  };

  
  const handleSignup = async (fullName, email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        { name: fullName, email, password },
        { withCredentials: true }
      );
  
      if (res.data.status === 200) {
        const userData = { fullName, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(" Registered:", res.data.message);
        toast.success("Inscription réussie !");
      } else {
        console.error("❌", res.data.message);
        toast.error('Erreur d\'inscription !');
      }
    } catch (err) {
      console.error(" Signup failed:", err.response?.data?.message || err.message);
      toast.error('Erreur d\'inscription !');
    }
  };

 
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Déconnecté avec succès !");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  
  const MainApp = () => (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-sans flex h-screen overflow-hidden antialiased">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        {/* Header - caché pour chatbot */}
        {activeView !== 'chatbot' && (
          <Header
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
            setSelectedFloor={setSelectedFloor}
          />
        )}

        {/* Vue Accueil */}
        {activeView === 'home' && (
          <CampusMapView
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        )}

        {/* Vue Statistiques */}
        {activeView === 'statistics' && (
          <StatisticsDashboard
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        )}

        {/* Vue Chatbot - sans padding */}
        {activeView === 'chatbot' && (
          <div className="-m-8 flex-1">
            <Chatbot />
          </div>
        )}
      </main>
    </div>
  );

  return (
    <ThemeProvider>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
        closeButton
        duration={4000}
        offset={16}
        visibleToasts={3}
      />
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