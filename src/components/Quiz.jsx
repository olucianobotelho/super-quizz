import React, { useState, useEffect, useRef } from 'react';
    import Question from './Question';
    import questionsData from '../data/questions.json';
    import './Quiz.css';

    function Quiz({ onQuizEnd }) {
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [streak, setStreak] = useState(0);
      const [showAnswer, setShowAnswer] = useState(false);
      const [quizCompleted, setQuizCompleted] = useState(false);
      const [availableQuestions, setAvailableQuestions] = useState([]);
      const [timeLeft, setTimeLeft] = useState(20);
      const [bonus, setBonus] = useState(0);
      const [confetti, setConfetti] = useState(false);
      const timerRef = useRef(null);

      useEffect(() => {
        const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random()).slice(0, 10);
        setAvailableQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setStreak(0);
        setShowAnswer(false);
        setQuizCompleted(false);
        setTimeLeft(20);
        setBonus(0);
      }, []);

      useEffect(() => {
        if (availableQuestions.length > 0 && currentQuestionIndex < availableQuestions.length) {
          setTimeLeft(20);
          setBonus(0);
          setConfetti(false); // Reset confetti
          timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
              if (prevTime <= 1) {
                clearInterval(timerRef.current);
                setShowAnswer(true);
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
        }

        return () => clearInterval(timerRef.current);
      }, [currentQuestionIndex, availableQuestions]);

      const handleAnswer = (selectedOption) => {
        clearInterval(timerRef.current);
        const correct = selectedOption === availableQuestions[currentQuestionIndex].resposta;
        const difficultyMultiplier =
          availableQuestions[currentQuestionIndex].dificuldade === 'facil'
            ? 1
            : availableQuestions[currentQuestionIndex].dificuldade === 'medio'
            ? 2
            : 3;

        if (correct) {
          const timeBonus = Math.max(0, timeLeft);
          setScore((prevScore) => prevScore + timeBonus * difficultyMultiplier);
          setStreak(streak + 1);
          setBonus(timeBonus * difficultyMultiplier);
          setConfetti(true); // Show confetti
        } else {
          setStreak(0);
          setBonus(0);
        }
        setShowAnswer(true);
      };

      const nextQuestion = () => {
        if (currentQuestionIndex < availableQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowAnswer(false);
          setBonus(0);
        } else {
          setQuizCompleted(true);
          onQuizEnd(score); // Pass the final score to App
        }
      };

      const currentQuestion = availableQuestions[currentQuestionIndex];

      if (availableQuestions.length === 0) {
        return (
          <div className="quiz-container">
            <h2>Quiz</h2>
            <p>Nenhuma pergunta disponível.</p>
          </div>
        );
      }

      if (quizCompleted) {
        return (
          <div className="quiz-container completed"> {/* Container completed para estilização */}
            <div className="score-streak">
              <p>Pontuação: {score}</p>
              <p>Sequência: {streak}</p>
            </div>
            <h2 className="quiz-completed-title">Quiz Concluído!</h2> {/* Título estilizado */}
            <p className="final-score-text"> {/* Texto estilizado */}
              Pontuação Final: {score} (Sequência Máxima: {streak})
            </p>
            <p className="congrats-message">Parabéns! Você completou o quiz!</p>
          </div>
        );
      }

      return (
        <div className="quiz-container">
          <div className="score-streak">
            <p>Pontuação: {score}</p>
            <p>Sequência: {streak}</p>
          </div>
          <h2 className="quiz-title">Quiz</h2> {/* Título estilizado */}
          <div className="time-left">Tempo restante: {timeLeft}</div>
          <Question
            question={currentQuestion.texto}
            options={currentQuestion.opcoes}
            onAnswer={handleAnswer}
          />

          {/* Confetti Container */}
          {confetti && (
            <div className="confetti">
              {[...Array(50)].map((_, index) => (
                <div
                  key={index}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, /* Random bright colors */
                    animationDelay: `${Math.random() * 2}s`, /* Random delay */
                  }}
                ></div>
              ))}
            </div>
          )}

          {showAnswer && (
            <div className="answer-feedback">
              {bonus > 0 && (
                <div className="bonus-animation">+{bonus} Bônus!</div>
              )}
              <p className="correct-answer-text"> {/* Texto estilizado */}
                Resposta Correta:{' '}
                <span className="correct-answer">
                  {currentQuestion.resposta}
                </span>
              </p>
              <button className="next-question-button primary-button" onClick={nextQuestion}> {/* Botão primário */}
                Próxima Pergunta
              </button>
            </div>
          )}
        </div>
      );
    }

    export default Quiz;
