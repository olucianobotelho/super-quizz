import React, { useMemo } from 'react';
    import './Question.css';

    function Question({ question, options, onAnswer }) {
      const shuffledOptions = useMemo(() => {
        const newOptions = [...options];
        for (let i = newOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
        }
        return newOptions;
      }, [options]);

      return (
        <div className="question-container">
          <p className="question-text">{question}</p>
          <div className="options-container">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => onAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    export default Question;
