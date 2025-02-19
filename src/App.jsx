import React, { useState, useEffect } from 'react';
    import Quiz from './components/Quiz';
    import MainMenu from './components/MainMenu';
    import Ranking from './components/Ranking';
    import './App.css';

    function App() {
      const [theme, setTheme] = useState('dark'); // Tema padrão 'dark'
      const [gameState, setGameState] = useState('menu');
      const [playerName, setPlayerName] = useState('');
      const [finalScore, setFinalScore] = useState(0);
      const [rankingData, setRankingData] = useState([]); // Initialize rankingData as empty array

      useEffect(() => {
        loadRanking(); // Load ranking on component mount
      }, []);

      const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
      };

      const startGame = (name) => {
        setPlayerName(name);
        setGameState('quiz');
      };

      const showRanking = () => {
        loadRanking(); // Refresh ranking data before showing
        setGameState('ranking');
      };

      const endGame = (score) => {
        setFinalScore(score);
        setGameState('gameOver');
        updateRanking(playerName, score);
        loadRanking(); // Refresh ranking after updating
      };

      const restartGame = () => {
        setGameState('quiz');
      };

      const backToMenu = () => {
        setGameState('menu');
      };

      // Funções de Ranking (Simuladas com localStorage)
      const loadRanking = () => {
        const savedRanking = localStorage.getItem('ranking');
        const initialRanking = savedRanking ? JSON.parse(savedRanking) : [];
        setRankingData(initialRanking); // Update rankingData state
        return initialRanking; // Return for other uses if needed
      };

      const updateRanking = (name, score) => {
        const currentRanking = loadRanking();
        const newEntry = { name, score };
        const updatedRanking = [...currentRanking, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10); // Top 10
        localStorage.setItem('ranking', JSON.stringify(updatedRanking));
      };

      return (
        <div className={`App ${theme === 'light' ? 'light-theme' : ''}`}> {/* Aplica tema light condicionalmente */}
          <div className="app-container">
            {gameState === 'menu' && (
              <MainMenu onStart={startGame} onShowRanking={showRanking} />
            )}
            {gameState === 'quiz' && <Quiz onQuizEnd={endGame} />}
            {gameState === 'ranking' && <Ranking ranking={rankingData} onBackToMenu={backToMenu} />} {/* Pass rankingData as ranking prop */}
            {gameState === 'gameOver' && (
              <div className="game-over-screen">
                <h2>Fim de Jogo!</h2>
                <p>Pontuação: {finalScore}</p>
                <button className="restart-button" onClick={restartGame}>
                  Jogar Novamente
                </button>
                <button className="menu-button" onClick={backToMenu}>
                  Menu
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    export default App;
