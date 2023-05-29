import React, { useState, useEffect } from 'react';
import gamesData from './data/games.json';
import { FaWhatsapp, FaTwitter } from 'react-icons/fa';
import './game.css';

const Game = ({ gameMode, onBack }) => {
  const [currentGameIndex, setCurrentGameIndex] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);
  const [showNextGameMessage, setShowNextGameMessage] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [games, setGames] = useState([]);
  const [lifetimeCounter, setLifetimeCounter] = useState(1);
  const [showGameMessage, setShowGameMessage] = useState(true);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  useEffect(() => {
    const unplayedGames = games.filter((game) => !game.played);
    const randomIndex = Math.floor(Math.random() * unplayedGames.length);
    setCurrentGameIndex(randomIndex);
    setCurrentGame(unplayedGames[randomIndex]);
    setGuess('');
    setRemainingAttempts(3);
    setIsGuessCorrect(false);
    setShowNextGameMessage(false);
  }, [games]);

  const handleBack = () => {
    onBack();
  };

  const handleGuessInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();

    if (gameMode.mode === 'Score') {
      const score = currentGame[gameMode.mode].replace(/\D/g, '');
      const guessScore = guess.replace(/\D/g, '');

      if (score === guessScore) {
        setGuess('');
        setIsGuessCorrect(true);
        setShowNextGameMessage(false);
        if (lifetimeCounter < 18) {
          setTimeout(() => {
            markCurrentGameAsPlayed();
          }, 3000);
        }
      }
    }

    if (currentGame && gameMode && guess.trim() === currentGame[gameMode.mode]) {
      setGuess('');
      setIsGuessCorrect(true);
      setShowNextGameMessage(false);
      if (lifetimeCounter < 18) {
        setTimeout(() => {
          markCurrentGameAsPlayed();
        }, 3000);
      }
    } else {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
      if (remainingAttempts === 1) {
        setShowCorrectAnswer(true);
        setGuess('');
        setLifetimeCounter((prevCounter) => prevCounter + 1);
        if (lifetimeCounter < 18) {
          setShowNextGameMessage(true);
          setTimeout(() => {
            markCurrentGameAsPlayed();
          }, 3000);
        }
      }
      if (remainingAttempts <= 0) {
        setLifetimeCounter((prevCounter) => prevCounter + 1);
        setGuess('');
        if (lifetimeCounter < 18) {
          setShowNextGameMessage(true);
          setTimeout(() => {
            markCurrentGameAsPlayed();
          }, 3000);
        }
      }
    }
  };

  const markCurrentGameAsPlayed = () => {
    const updatedGames = [...games];
    updatedGames[currentGameIndex].played = true;
    setGames(updatedGames);
    setCurrentGameIndex(null);
    setCurrentGame(null);
    setIsGuessCorrect(false);
    setGuess('');
    setRemainingAttempts(3);
    setShowNextGameMessage(false);
    setShowCorrectAnswer(false);
  };

  if (currentGame) {
    const gameInfo = { ...currentGame };

    if (gameMode.mode === 'xG') {
      if (gameInfo['xG Home'] !== '???' && gameInfo['xG Away'] !== '???') {
        const HomeOrAway = Math.floor(Math.random() * 2) + 1;
        if (HomeOrAway === 1 && gameInfo['xG Away'] !== '???') {
          gameInfo['xG Home'] = '???';
          gameMode.mode = 'xG Home';
        }
        if (HomeOrAway === 2 && gameInfo['xG Home'] !== '???') {
          gameInfo['xG Away'] = '???';
          gameMode.mode = 'xG Away';
        }
      }
    } else {
      gameInfo[gameMode.mode] = '???';
    }

    const guessPhrase = 'Guess the';
    const gameModeName = gameMode.name.substring(guessPhrase.length).trim();

    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: 'Game Score',
            text: `I scored ${games.filter((game) => game.played).length} in the "${guessPhrase + ' ' + gameModeName}" game! Check it out!`,
            url: 'bundesliga.tr3x.xyz',
          })
          .then(() => console.log('Shared successfully.'))
          .catch((error) => console.error('Error sharing:', error));
      } else {
        console.log('Web Share API not supported.');
      }
    };

    const text = `I scored ${games.filter((game) => game.played).length} in the "${guessPhrase + ' ' + gameModeName}" game! Check it out!`;
    const url = 'bundesliga.tr3x.xyz';

    const handleTeams = () => {
      window.alert('Frankfurt \n Bayern Munich \n Wolfsburg \n Werder Bremen \n Augsburg \n Freiburg \n Union Berlin \n Hertha BSC \n Gladbach \n Hoffenheim \n Bochum \n Mainz 05 \n Dortmund \n Leverkusen \n Stuttgart \n RB Leipzig \n Köln \n Schalke 04');
    };
    const handleStadium = () => {
      window.alert('Deutsche Bank Park \n Volkswagen Arena \n WWK Arena \n Stadion an der Alten Försterei \n Borussia-Park \n Vonovia Ruhrstadion \n Signal Iduna Park \n RheinEnergieSTADION \n Europa-Park Stadion \n PreZero Arena \n Wohninvest-Weserstadion \n BayArena \n Red Bull Arena \n Olympiastadion Berlin \n Veltins-Arena \n Mewa Arena \n Allianz Arena');
    };
    return (
      <div className="game-container">
        {showGameMessage && (
          <div className="game-card">
            <p>Welcome to {guessPhrase+" "+gameModeName}, the rules are simple:</p>
            <br />
            <p>
            You have 3 attempts per match. If you don't get the {gameModeName} right within these attempts, your table position, which starts as the leader, will lower itself. If you get relegated, you have failed!</p>
            <button className= "back" onClick={() => setShowGameMessage(false)}>Start Game</button>
            <button className="back" onClick={handleBack}>
                Go Back
            </button>
          </div>
        )}

        {!showGameMessage && !isGuessCorrect && !showNextGameMessage && !showCorrectAnswer && (
          <div className="game-card">
            <h3>
              {guessPhrase} <a className="gameModeName">{gameModeName}</a>
            </h3>

            <div className="lifetimeCounter">
            {lifetimeCounter === 1 && <p>Your table position:<br />{lifetimeCounter}. (Champions)</p>}
              {lifetimeCounter > 1 && lifetimeCounter <= 4 && <p>Your table position:<br />{lifetimeCounter}. (Champions League)</p>}
              {lifetimeCounter >= 5 && lifetimeCounter <= 6 && <p>Your table position:<br />{lifetimeCounter}. (Euro League)</p>}
              {lifetimeCounter === 7 && <p>Your table position:<br />{lifetimeCounter}. (Conference League)</p>}
              {lifetimeCounter >= 8 && lifetimeCounter <= 15 && <p>Your table position:<br />{lifetimeCounter}. (Midfield)</p>}
              {/* Add more conditions for other ranges */}
              {lifetimeCounter >= 16 && lifetimeCounter <= 16 && <p>Your table position:<br />{lifetimeCounter}. (Relegation)</p>}
              {lifetimeCounter >= 17 && lifetimeCounter <= 18 && <p>Your table position:<br />{lifetimeCounter}. (Relegated)</p>}
            </div>

            <br /><br />
            <div className="details">
              <p>Matchday {gameInfo['Week']}</p>
              <p>
                {gameInfo['Home Team']} vs {gameInfo['Away Team']}
              </p>
              <p>{gameInfo['Score']}</p>
              <p>
                {gameInfo['xG Home']} xG – {gameInfo['xG Away']} xG{' '}
              </p>
              <p>
                {gameInfo['Venue']}, {gameInfo['Attendance']}
              </p>
              <p>Referee was {gameInfo['Referee']}</p>
            </div>
            <form onSubmit={handleGuessSubmit}>
              <p>Attempts {remainingAttempts}/3</p>
              <p />
              <label htmlFor="guessInput">Enter your guess:</label>
              <input
                id="guessInput"
                type="text"
                value={guess}
                maxLength={50}
                onChange={handleGuessInputChange}
              />
              <br />
              {gameMode.mode === 'Home Team' && (
                <p className='helper' onClick={handleTeams}>Click to see all Team names!</p>
              )}
              {gameMode.mode === 'Away Team' && (
                <p className='helper' onClick={handleTeams}>Click to see all Team names!</p>
              )}
              {gameMode.mode === 'Venue' && (
                <p className='helper' onClick={handleStadium}>Click to see all Stadium names!</p>
              )}
              <button type="submit">Submit</button>
              <button onClick={handleBack}>Back</button>
            </form>
          </div>
        )}

        {isGuessCorrect && 
        <div className="game-card">
          <p>Correct! Next game will be shown.</p>
        </div>
        }
        {showNextGameMessage && (
          <div className="game-card">
            <p>
              Wrong! The correct answer is: {currentGame[gameMode.mode]}
              <br />
              Next game will be shown shortly.
            </p>
          </div>
        )}

        {lifetimeCounter === 18 && (
          <div className="game-card">
            <h3>
              Game over! <br />You have been relegated to the 2.Bundesliga!{' '}
            </h3>
            <p>Your score: {games.filter((game) => game.played).length}</p>
            <p>But don't worry, you can just start again!</p>
            <br />
            <p>Share your Score with your friends:</p>
            <div className="share-icons">
              <a className="whatsapp-icon" href={`whatsapp://send?text=${encodeURIComponent(text + ' ' + url)}`}>
                <FaWhatsapp size={24} />
              </a>

              <a
                className="twitter-icon"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
              >
                <FaTwitter size={24} />
              </a>
              <button className="shareMore" onClick={handleShare}>
                More
              </button>
            </div>
            <br />
            <button className="back" onClick={handleBack}>
              Back
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Game;
