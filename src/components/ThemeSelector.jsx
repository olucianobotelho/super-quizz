import React from 'react';
import './ThemeSelector.css';

function ThemeSelector({ selectedTheme, onThemeChange }) {
  const themes = [
    { id: 'biblical', label: 'Bíblico' },
    { id: 'football', label: 'Futebol' },
    { id: 'cultura', label: 'Cultura' },
    { id: 'ia', label: 'IA' }
  ];

  return (
    <div className="theme-selector">
      <h2 className="theme-title">Escolha um Tema</h2>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-button ${selectedTheme === theme.id ? 'selected' : ''}`}
            onClick={() => onThemeChange(theme.id)}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
