import React, { useState } from 'react';
    import './MainMenu.css';

    function MainMenu({ onStart, onShowRanking }) {
      const [name, setName] = useState('');

      const handleStart = () => {
        if (name.trim() !== '') {
          onStart(name);
        } else {
          alert('Por favor, insira seu nome.');
        }
      };

      return (
        <div className="main-menu">
          <h1 className="main-title">Quiz Game</h1> {/* Título com classe para estilizar */}
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
          <button className="start-button primary-button" onClick={handleStart}> {/* Botão primário */}
            Iniciar
          </button>
          <button className="ranking-button secondary-button" onClick={onShowRanking}> {/* Botão secundário */}
            Ranking
          </button>
        </div>
      );
    }

    export default MainMenu;
