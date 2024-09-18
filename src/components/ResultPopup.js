import React from 'react';
import './ResultPopup.css';

const ResultPopup = ({ gameOver, isWinner, secretWord, onNewGame }) => {
  if (!gameOver) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        {isWinner ? (
          <h2>CONGRATULATIONS! You won!</h2>
        ) : (
          <h2>YOU LOST! The word was: {secretWord}</h2>
        )}
        <button onClick={onNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default ResultPopup;
