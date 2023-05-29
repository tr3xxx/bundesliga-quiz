import React from 'react';
import './choosegamemode.css';

const gameModes = [
    {
      mode: 'Week',
      name: 'Guess the matchday',
      description: 'Did you know? A Bundesliga season consists of 306 matches played across 18 matchdays.',
      fact: ''
    },
    {
      mode: 'Home Team',
      name: 'Guess the home team',
      description: 'Did you know? Union Berlin is the only team in the league that has not lost any home games this season.',
    },
    {
      mode: 'Away Team',
      name: 'Guess the away team',
      description: 'Did you know? No team has lost fewer than 4 away matches this season.',
    },
    {
      mode: 'xG',
      name: 'Guess the expected goals',
      description: 'Did you know? There were 886 expected goals created this season.',
    },
    {
      mode: 'Score',
      name: 'Guess the score',
      description: 'Did you know? There were 971 goals scored this season.',
    },
    {
      mode: 'Attendance',
      name: 'Guess the attendance',
      description: 'Did you know? The average attendance per game this season was 43,013.',
    },
    {
      mode: 'Venue',
      name: 'Guess the stadium',
      description: 'Did you know? The Mercedes-Benz Arena was under construction this season due to the EM2024.',
    },
    {
      mode: 'Referee',
      name: 'Guess the referee',
      description: 'Did you know? Deniz Aytekin officiated 19 matches this season in the first division, the most among all Bundesliga referees.',
    },
  ];
  

const ChooseGameMode = ({ onSelect }) => {
    const handleCardClick = (gameMode) => {
      onSelect(gameMode);
    };
  
    return (
      <div className="game-mode-container">
        <div className="game-mode-cards">
          {gameModes.map((gameMode, index) => (
            <div
              className="game-mode-card"
              key={index}
              onClick={() => handleCardClick(gameMode)}
            >
              <h3>{gameMode.name}</h3>
              <p>{gameMode.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default ChooseGameMode;
