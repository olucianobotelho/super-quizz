import React from 'react';
import './DifficultySelector.css';

function DifficultySelector({ onDifficultyChange }) {
  return (
    <div className="difficulty-selector">
      <button
        className="difficulty-button"
        onClick={() => onDifficultyChange('facil')}
      >
        Fácil
      </button>
      <button
        className="difficulty-button"
        onClick={() => onDifficultyChange('medio')}
      >
        Médio
      </button>
      <button
        className="difficulty-button"
        onClick={() => onDifficultyChange('dificil')}
      >
        Difícil
      </button>
    </div>
  );
}

export default DifficultySelector;
