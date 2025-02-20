import React, { useState } from 'react';
import './Ranking.css';

function Ranking({ ranking, onBackToMenu }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(true);

  const themes = [
    { id: 'biblical', name: 'Bíblico' },
    { id: 'football', name: 'Futebol' },
    { id: 'ai', name: 'IA' },
    { id: 'culture', name: 'Cultura' }
  ];

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    setShowThemeSelector(false);
  };

  const handleBack = () => {
    if (!showThemeSelector) {
      setShowThemeSelector(true);
      setSelectedTheme(null);
    } else {
      onBackToMenu();
    }
  };

  if (showThemeSelector) {
    return (
      <div className="ranking-container">
        <h2>Selecione o Tema do Ranking</h2>
        <div className="theme-selector">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className="theme-button"
              onClick={() => handleThemeSelect(theme.id)}
            >
              {theme.name}
            </button>
          ))}
        </div>
        <button className="menu-button secondary-button" onClick={handleBack}>
          Voltar ao Menu
        </button>
      </div>
    );
  }

  const filteredRanking = ranking.filter(item => item.theme === selectedTheme);

  return (
    <div className="ranking-container">
      <h2>Ranking dos Melhores - {themes.find(t => t.id === selectedTheme)?.name}</h2>
      <ol className="ranking-list">
        {filteredRanking.map((item, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-name">{item.name}</span>
            <span className="ranking-score">{item.score}</span>
          </li>
        ))}
      </ol>
      <button className="menu-button secondary-button" onClick={handleBack}>
        Voltar
      </button>
    </div>
  );
}

export default Ranking;
