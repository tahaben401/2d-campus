import React from 'react';

const BedIcon = ({ className = 'w-6 h-6' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 4v16h20V4H2z" />
    <path d="M2 10h20" />
    <path d="M12 4v6" />
  </svg>
);

export default BedIcon;