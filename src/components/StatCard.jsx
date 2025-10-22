import React from 'react';

const StatCard = ({ icon, value, label, unit = '' }) => (
  
  <div className="bg-white/80 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-5 backdrop-blur-sm">
    
    <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-full text-cyan-600 dark:text-cyan-400">
      {icon}
    </div>
    <div>
     
      <p className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
        <span className="text-xl font-medium text-slate-500 dark:text-slate-400">{unit}</span>
      </p>
     
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
);

export default StatCard;