import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { WaterTracker } from './components/WaterTracker';
import { PotionMaker } from './components/PotionMaker';
import { AppMode } from './types';

export default function App() {
  const [mode, setMode] = useState<AppMode>('menu');

  const handleBack = () => {
    setMode('menu');
  };

  return (
    <>
      {mode === 'menu' && <MainMenu onSelectMode={setMode} />}
      {mode === 'water' && <WaterTracker onBack={handleBack} />}
      {mode === 'potion' && <PotionMaker onBack={handleBack} />}
    </>
  );
}
