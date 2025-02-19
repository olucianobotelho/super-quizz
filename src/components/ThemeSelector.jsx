import React from 'react';
import './ThemeSelector.css';

function ThemeSelector({ onThemeChange }) {
  return (
    <div className="theme-selector">
      <button className="theme-button" onClick={() => onThemeChange('light')}>
        Claro
      </button>
      <button className="theme-button" onClick={() => onThemeChange('dark')}>
        Escuro
      </button>
    </div>
  );
}

export default ThemeSelector;
