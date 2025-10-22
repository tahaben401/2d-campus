import React from 'react';

const BuildingIcon = ({ className = 'w-6 h-6' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 22h16" />
    <path d="M6 18v-5" />
    <path d="M18 18v-5" />
    <path d="M12 18v-5" />
    <path d="M12 13V8" />
    <path d="M6 13V8" />
    <path d="M18 13V8" />
    <path d="M4 8h16" />
    <path d="M3 22V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16" />
  </svg>
);

export default BuildingIcon;