import React, { useState } from 'react';
import './App.css';
import ChooseGameMode from './components/choosegamemode';
import Game from './components/game';
import Header from './components/header';

function App() {
  const [selectedGameMode, setSelectedGameMode] = useState(null);

  const handleGameModeSelect = (gameMode) => {
    setSelectedGameMode(gameMode);
  };

  const handleBack = () => {
    setSelectedGameMode(null);
  };

  return (
    <div>
      <Header title={"Bundesliga 2022/23 Quiz"} />
      <div>
        {selectedGameMode ? (
          <Game gameMode={selectedGameMode} onBack={handleBack} />
        ) : (
          <ChooseGameMode onSelect={handleGameModeSelect} />
        )}
      </div>
    </div>
  );
}

export default App;
