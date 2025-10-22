// src/components/Sidebar.jsx

import { HomeIcon, ChartIcon, LogoutIcon, BuildingIcon } from './icons'; 

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    
    <aside className="w-72 bg-slate-50/70 p-6 flex-shrink-0 flex flex-col justify-between backdrop-blur-sm border-r border-slate-200 dark:bg-slate-950/70 dark:border-slate-800">
      <div>
        
        <div className="flex items-center gap-3 mb-10">
          <BuildingIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">CampusView</span>
        </div>
        
        <nav className="flex flex-col gap-3">
          
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
        </nav>
      </div>

     
      <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-lg transition-colors duration-200 w-full dark:text-slate-400 dark:hover:bg-slate-800/50">
        <LogoutIcon className="w-5 h-5" />
        <span>Déconnexion</span>
      </button>
    </aside>
  );
};

export default Sidebar;