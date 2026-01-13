// src/context/ThemeContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement; 

    // Supprimer toutes les classes de thème
    root.classList.remove('light', 'dark');
    
    // Ajouter la classe correspondant au thème
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }

    console.log('Classes appliquées sur <html>:', root.className);
    console.log('Thème stocké dans localStorage:', theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Changement de thème:', prevTheme, '->', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);