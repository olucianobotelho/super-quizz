import React, { useState } from 'react';
import './MainMenu.css';
import ThemeSelector from './ThemeSelector';

function MainMenu({ onStart, onShowRanking }) {
  const [name, setName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('ai');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStart = () => {
    if (name.trim() !== '') {
      setErrorMessage('');
      onStart(name, selectedTheme, selectedTheme);
    } else {
      setErrorMessage('Por favor, insira seu nome.');
    }
  };

  return (
    <div className="main-menu">
      <h1 className="main-title">Quiz Game</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() !== '') {
              setErrorMessage('');
            }
          }}
          className="name-input"
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <ThemeSelector
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
      />
      <button className="start-button primary-button" onClick={handleStart}>
        Iniciar
      </button>
      <button className="ranking-button secondary-button" onClick={onShowRanking}>
        Ranking
      </button>
    </div>
  );
}

export default MainMenu;
