// src/components/Sidebar.jsx

import { HomeIcon, ChartIcon, LogoutIcon, BuildingIcon } from './icons';

// ✅ Icône MessageSquare pour le chatbot
const MessageSquareIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const NavItem = ({ icon: Icon, label, isActive, onClick, delay = 0 }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`
      relative flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold 
      transition-all duration-300 group overflow-hidden
      ${isActive
        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
      }
    `}
    style={{
      animationDelay: `${delay}ms`
    }}
  >
    {/* Active indicator bar */}
    {isActive && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
    )}

    {/* Hover background effect */}
    {!isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )}

    {/* Icon with animation */}
    <div className={`
      relative z-10 transition-transform duration-300 
      ${isActive ? '' : 'group-hover:scale-110 group-hover:-rotate-6'}
    `}>
      <Icon className="w-5 h-5" />
    </div>

    {/* Label */}
    <span className="relative z-10">{label}</span>

    {/* Active glow effect */}
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
    )}
  </a>
);

const Sidebar = ({ activeView, setActiveView, onLogout }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Accueil' },
    { id: 'statistics', icon: ChartIcon, label: 'Statistiques' },
    { id: 'chatbot', icon: MessageSquareIcon, label: 'Assistant IA' },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 p-6 flex-shrink-0 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800">
      <div>
        {/* Logo with animation */}
        <div className="flex items-center gap-3 mb-10">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-all duration-300 group-hover:shadow-cyan-500/40 group-hover:scale-105">
              <BuildingIcon className="w-6 h-6 text-white" />
            </div>
            {/* Animated ring on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-cyan-500/50 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">CampusView</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Gestion des logements</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
              delay={(idx + 1) * 50}
            />
          ))}
        </nav>

        {/* Stats preview card */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aperçu rapide</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">Bâtiments</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">Étages</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">9</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Logout button with animation */}
      <div>
        <button
          className="
            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold
            text-slate-500 dark:text-slate-400
            hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400
            transition-all duration-300 group
            border border-transparent hover:border-red-200 dark:hover:border-red-800/50
          "
          onClick={onLogout}
        >
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
            <LogoutIcon className="w-5 h-5" />
          </div>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;