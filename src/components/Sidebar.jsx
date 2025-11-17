// src/components/Sidebar.jsx

import { HomeIcon, ChartIcon, LogoutIcon, BuildingIcon } from './icons'; 

// ✅ Ajout de l'icône MessageSquare pour le chatbot
const MessageSquareIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const Sidebar = ({ activeView, setActiveView, onLogout }) => {
  return (
    <aside className="w-72 bg-slate-50/70 p-6 flex-shrink-0 flex flex-col justify-between backdrop-blur-sm border-r border-slate-200 dark:bg-slate-950/70 dark:border-slate-800">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <BuildingIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">CampusView</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {/* Accueil */}
          <a 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              setActiveView('home'); 
            }} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeView === 'home' 
                ? 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20' 
                : 'text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Accueil</span>
          </a>

          {/* Statistiques */}
          <a 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              setActiveView('statistics'); 
            }} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeView === 'statistics' 
                ? 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20' 
                : 'text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50'
            }`}
          >
            <ChartIcon className="w-5 h-5" />
            <span>Statistiques</span>
          </a>

          {/* ✅ Assistant IA (Chatbot) */}
          <a 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              setActiveView('chatbot'); 
            }} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeView === 'chatbot' 
                ? 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20' 
                : 'text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50'
            }`}
          >
            <MessageSquareIcon className="w-5 h-5" />
            <span>Assistant IA</span>
          </a>
        </nav>
      </div>

      {/* Déconnexion */}
      <button 
        className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-lg transition-colors duration-200 w-full dark:text-slate-400 dark:hover:bg-slate-800/50" 
        onClick={onLogout}
      >
        <LogoutIcon className="w-5 h-5" />
        <span>Déconnexion</span>
      </button>
    </aside>
  );
};

export default Sidebar;