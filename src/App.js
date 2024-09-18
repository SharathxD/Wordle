import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import ResultPopup from './components/ResultPopup';
import './App.css';

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [secretWord, setSecretWord] = useState('');

  const startNewGame = () => {
    fetch('http://localhost:5000/api/new-game')
      .then((res) => res.json())
      .then((data) => {
        console.log('New game started with secret word:', data.secretWord);
        setSecretWord(data.secretWord);
        setGuesses([]);
        setCurrentGuess('');
        setGameOver(false);
        setIsWinner(false);
      })
      .catch((error) => console.error('Error starting new game:', error));
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleInput = (e) => {
    if (gameOver) return;

    if (e.key === 'Enter') {
      if (currentGuess.length === 5) {
        console.log('Submitting guess:', currentGuess);
        fetch('http://localhost:5000/api/guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess: currentGuess }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.error('Error from API:', data.error);
              alert(data.error);
              return;
            }

            console.log('Received status:', data.status);
            const updatedGuesses = [...guesses, { word: currentGuess, status: data.status }];
            setGuesses(updatedGuesses);
            setCurrentGuess('');

            if (data.status.every((s) => s === 'correct')) {
              console.log('Game won!');
              setIsWinner(true);
              setGameOver(true);
            } else if (updatedGuesses.length === 6) {
              console.log('Game over!');
              setGameOver(true);
            }
          })
          .catch((error) => console.error('Error processing guess:', error));
      } else {
        console.log('Invalid guess length:', currentGuess.length);
        alert('Your guess must be a 5-letter word.');
      }
    } else if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  };

  return (
    <div className="App" onKeyDown={handleInput} tabIndex="0">
      <h1>Wordle</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <ResultPopup
        gameOver={gameOver}
        isWinner={isWinner}
        secretWord={secretWord}
        onNewGame={startNewGame}
      />
    </div>
  );
};

export default App;
