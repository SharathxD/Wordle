import React from 'react';
import './Grid.css';

const Grid = ({ guesses, currentGuess }) => {
  const rows = Array.from({ length: 6 }, (_, i) => {
    const guess = guesses[i] || '';  // Use the corresponding guess or an empty string if not yet guessed
    const isCurrentRow = i === guesses.length;  // Check if it's the current row
    const displayWord = isCurrentRow ? currentGuess : guess.word || '';
    const status = guess.status || [];

    return (
      <div key={i} className="row">
        {Array.from({ length: 5 }).map((_, j) => (
          <div
            key={j}
            className={`cell ${status[j] || ''}`}
          >
            {displayWord[j] || ''}
          </div>
        ))}
      </div>
    );
  });

  return (
    <div className="grid">
      {rows}
    </div>
  );
};

export default Grid;
