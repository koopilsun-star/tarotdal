import React, { useState } from 'react';
import Home from './pages/Home';
import Drawing from './pages/Drawing';
import Result from './pages/Result';

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0D2B' }}>
      {screen === 'home' && (
        <Home onStart={() => setScreen('drawing')} />
      )}
      {screen === 'drawing' && (
        <Drawing onCardSelected={(id) => {
          setSelectedCard(id);
          setScreen('result');
        }} />
      )}
      {screen === 'result' && (
        <Result cardId={selectedCard} onBack={() => setScreen('home')} />
      )}
    </div>
  );
}

export default App;