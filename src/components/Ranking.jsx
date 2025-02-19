import React from 'react';
import './Ranking.css';

function Ranking({ ranking, onBackToMenu }) {
  return (
    <div className="ranking-container">
      <h2>Ranking dos Melhores</h2>
      <ol className="ranking-list">
        {ranking.map((item, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-name">{item.name}</span>
            <span className="ranking-score">{item.score}</span>
          </li>
        ))}
      </ol>
      <button className="menu-button secondary-button" onClick={onBackToMenu}>Voltar ao Menu</button>
    </div>
  );
}

export default Ranking;
