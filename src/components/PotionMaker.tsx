import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RotateCcw, Sparkles, Beaker, Flame, Skull, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ingredient, BrewResult } from '../types';

interface PotionMakerProps {
  onBack: () => void;
}

const INGREDIENTS: Ingredient[] = [
  { id: 'carrot', name: 'Mystic Carrot', emoji: '🥕', description: 'Crunchy and orange', hexColor: '#f97316' },
  { id: 'mushroom', name: 'Dark Mushroom', emoji: '🍄', description: 'Toxic and earthy', hexColor: '#a855f7' },
  { id: 'firebean', name: 'Fire Bean', emoji: '🌶️', description: 'Spicy and explosive', hexColor: '#ef4444' },
  { id: 'voidtear', name: 'Void Tear', emoji: '🔮', description: 'Salty and cosmic', hexColor: '#6366f1' },
  { id: 'trollsnot', name: 'Troll Snot', emoji: '🦠', description: 'Sticky and gross', hexColor: '#22c55e' },
  { id: 'moondew', name: 'Moonlight Dew', emoji: '💧', description: 'Sweet and magical', hexColor: '#60a5fa' },
  { id: 'pixiedust', name: 'Pixie Dust', emoji: '✨', description: 'Sparkly and chaotic', hexColor: '#facc15' },
  { id: 'krakenink', name: 'Kraken Ink', emoji: '🦑', description: 'Bitter and dark', hexColor: '#1e293b' },
];

function CrushAnimation({ ingredient }: { ingredient: Ingredient }) {
  const [phase, setPhase] = useState<'idle' | 'crushing' | 'crushed'>('idle');

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase('crushing'), 400);
    const t2 = setTimeout(() => setPhase('crushed'), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {phase !== 'crushed' && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.5 }}
          animate={
            phase === 'idle' 
              ? { opacity: 1, y: -20, scale: 1 } 
              : { opacity: 1, y: 20, scaleX: 1.6, scaleY: 0.2 }
          }
          transition={{ duration: phase === 'idle' ? 0.4 : 0.15, type: 'spring', bounce: 0.5 }}
          className="text-6xl z-20"
          style={{ filter: 'drop-shadow(0px 15px 10px rgba(0,0,0,0.4))' }}
        >
          {ingredient.emoji}
        </motion.div>
      )}
      
      {phase === 'crushed' && (
        <>
          {[...Array(15)].map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const radius = 15 + Math.random() * 25;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 20, scale: 1 }}
                animate={{ opacity: 0, x: x * 1.5, y: 120 + y, scale: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="absolute w-3 h-3 rounded-sm z-10"
                style={{ 
                  backgroundColor: ingredient.hexColor, 
                  boxShadow: `inset -1px -1px 3px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.4)` 
                }}
              />
            );
          })}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-16 h-16 rounded-full bg-white/20 blur-md z-0"
            style={{ backgroundColor: ingredient.hexColor }}
          />
        </>
      )}
    </div>
  );
}

function CauldronBubbles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-2 h-2 rounded-full opacity-60 bg-white"
          style={{ filter: 'blur(1px)' }}
          initial={{ y: '100%', x: `${10 + Math.random() * 80}%`, scale: Math.random() * 0.5 + 0.5 }}
          animate={{ y: '-20%', scale: Math.random() * 1 + 1, opacity: [0, 0.8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 2,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
}

function CauldronSteam({ color, active }: { color: string, active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute bottom-28 w-48 h-40 pointer-events-none z-10 flex justify-center">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-16 h-16 rounded-full blur-2xl opacity-30"
          style={{ backgroundColor: color === '#18181b' ? '#a1a1aa' : color }}
          initial={{ y: 20, x: `${(Math.random() - 0.5) * 60}px`, scale: 0.5 }}
          animate={{ y: -100 - Math.random() * 60, x: `${(Math.random() - 0.5) * 100}px`, scale: 2 + Math.random(), opacity: [0, 0.5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

function ResultEffects({ result }: { result: BrewResult | null }) {
  if (!result) return null;
  
  const getIcon = () => {
    switch(result.animation) {
      case 'sparkle': return <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-md" />;
      case 'explode': return <Flame className="w-6 h-6 text-red-500 drop-shadow-md" />;
      case 'poison': return <Skull className="w-6 h-6 text-green-400 drop-shadow-md" />;
      case 'void': return <Moon className="w-6 h-6 text-indigo-300 drop-shadow-md" />;
      case 'weird': return <Beaker className="w-6 h-6 text-pink-400 drop-shadow-md" />;
      default: return null;
    }
  };

  return (
    <div className="absolute bottom-32 w-full h-40 pointer-events-none z-30 flex justify-center">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          initial={{ y: 0, x: (Math.random() - 0.5) * 80, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ 
            y: -100 - Math.random() * 50, 
            x: (Math.random() - 0.5) * 120, 
            opacity: [0, 1, 0], 
            scale: 1 + Math.random() * 0.5,
            rotate: (Math.random() - 0.5) * 180
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        >
          {getIcon()}
        </motion.div>
      ))}
    </div>
  );
}

export function PotionMaker({ onBack }: PotionMakerProps) {
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [brewing, setBrewing] = useState(false);
  const [result, setResult] = useState<BrewResult | null>(null);
  const [animatingIngredient, setAnimatingIngredient] = useState<Ingredient | null>(null);
  const [cauldronColor, setCauldronColor] = useState<string>('#18181b');

  const blendColors = (colors: string[]) => {
    if (colors.length === 0) return '#18181b';
    let r = 0, g = 0, b = 0;
    colors.forEach(c => {
      r += parseInt(c.slice(1, 3), 16);
      g += parseInt(c.slice(3, 5), 16);
      b += parseInt(c.slice(5, 7), 16);
    });
    r = Math.round(r / colors.length);
    g = Math.round(g / colors.length);
    b = Math.round(b / colors.length);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const toggleIngredient = (ing: Ingredient) => {
    if (brewing || result || animatingIngredient) return;
    
    if (selected.find(i => i.id === ing.id)) {
      const newSelected = selected.filter(i => i.id !== ing.id);
      setSelected(newSelected);
      setCauldronColor(blendColors(newSelected.map(i => i.hexColor)));
    } else {
      if (selected.length < 3) {
        setAnimatingIngredient(ing);
        setTimeout(() => {
          const newSelected = [...selected, ing];
          setSelected(newSelected);
          setCauldronColor(blendColors(newSelected.map(i => i.hexColor)));
          setAnimatingIngredient(null);
        }, 1200);
      }
    }
  };

  const determineResult = (ingredients: Ingredient[]): BrewResult => {
    const ids = ingredients.map(i => i.id).sort();
    const has = (id1: string, id2: string) => ids.includes(id1) && ids.includes(id2);

    if (has('firebean', 'krakenink')) {
      return { name: "Dragon's Breath Potion", description: "A fiery concoction that might burn your eyebrows off!", color: "from-red-500 to-orange-500", animation: 'explode' };
    }
    if (has('mushroom', 'trollsnot')) {
      return { name: "Noxious Sludge", description: "Smells terrible, tastes worse. Highly toxic.", color: "from-green-500 to-emerald-700", animation: 'poison' };
    }
    if (has('moondew', 'pixiedust')) {
      return { name: "Elixir of Flight", description: "Makes you feel light as a feather and sparkly.", color: "from-blue-300 to-purple-300", animation: 'sparkle' };
    }
    if (has('voidtear', 'krakenink')) {
      return { name: "Abyssal Void Brew", description: "Staring into it is like staring into the abyss.", color: "from-slate-900 to-indigo-950", animation: 'void' };
    }
    if (has('carrot', 'moondew')) {
      return { name: "Lunar Vision Potion", description: "See clearly in the darkest of nights.", color: "from-orange-400 to-blue-400", animation: 'sparkle' };
    }
    if (ingredients.length === 3) {
      return { name: "Questionable Stew", description: "A chaotic mix of random magical items. Drink at your own risk.", color: "from-amber-500 to-pink-500", animation: 'weird' };
    }
    
    return { name: "Weak Broth", description: "Not enough ingredients to make anything interesting.", color: "from-zinc-300 to-zinc-400", animation: 'weird' };
  };

  const brew = () => {
    if (selected.length === 0) return;
    
    setBrewing(true);
    
    setTimeout(() => {
      setBrewing(false);
      const finalResult = determineResult(selected);
      setResult(finalResult);
      
      if (finalResult.animation === 'sparkle') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#FDE047', '#93C5FD', '#D8B4FE'] });
      } else if (finalResult.animation === 'explode') {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#EF4444', '#F97316', '#1F2937'] });
      } else if (finalResult.animation === 'poison') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#22C55E', '#166534', '#000000'] });
      }
    }, 2500);
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
    setBrewing(false);
    setCauldronColor('#18181b');
    setAnimatingIngredient(null);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-zinc-800 rounded-full shadow-sm flex items-center justify-center text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={reset}
          className="w-10 h-10 bg-zinc-800 rounded-full shadow-sm flex items-center justify-center text-zinc-300 hover:bg-zinc-700 transition-colors"
          title="Reset Cauldron"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-24 pb-8 px-6 max-w-md mx-auto flex flex-col items-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-purple-300">Dark Cuisine</h1>
          <p className="text-zinc-400 text-sm">Select up to 3 ingredients to brew</p>
        </div>

        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          <AnimatePresence>
            {animatingIngredient && (
              <motion.div className="absolute top-[-60px] z-50">
                <CrushAnimation ingredient={animatingIngredient} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steam and Effects (Outside) */}
          <CauldronSteam color={cauldronColor} active={selected.length > 0 || result !== null} />
          <ResultEffects result={result} />

          <div className="absolute bottom-0 w-48 h-32 bg-zinc-800 rounded-b-[3rem] rounded-t-xl border-4 border-zinc-700 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-10 flex items-start justify-center overflow-hidden">
            <motion.div 
              className={`w-full h-full opacity-80 ${result ? `bg-gradient-to-b ${result.color}` : ''}`}
              animate={{ 
                backgroundColor: result ? undefined : cauldronColor,
                y: brewing ? [0, -10, 0] : (selected.length > 0 || result ? [0, -4, 0] : 0),
                scale: brewing ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                backgroundColor: { duration: 1 },
                y: { repeat: Infinity, duration: brewing ? 1 : 3, ease: "easeInOut" },
                scale: { repeat: brewing ? Infinity : 0, duration: 1 }
              }}
            />
            {/* Bubbles (Inside) */}
            <CauldronBubbles active={selected.length > 0 || result !== null} />
          </div>
          
          <div className="absolute bottom-28 w-52 h-8 bg-zinc-700 rounded-full border-4 border-zinc-600 z-20" />

          <AnimatePresence>
            {!brewing && !result && selected.map((ing, i) => (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 35, x: (i - 1) * 35 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute z-30 flex flex-wrap w-12 justify-center gap-1"
              >
                {[...Array(8)].map((_, j) => (
                  <div 
                    key={j} 
                    className="w-2.5 h-2.5 rounded-sm shadow-sm"
                    style={{ 
                      backgroundColor: ing.hexColor,
                      boxShadow: `inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)`,
                      transform: `translate(${Math.random() * 12 - 6}px, ${Math.random() * 8 - 4}px) rotate(${Math.random() * 90}deg)`
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {brewing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0 flex items-center justify-center"
              >
                <div className="w-full h-full bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <Sparkles className="absolute top-10 text-yellow-300 w-8 h-8 animate-spin" />
                <Sparkles className="absolute top-20 left-10 text-purple-300 w-6 h-6 animate-bounce" />
                <Sparkles className="absolute top-16 right-10 text-green-300 w-5 h-5 animate-ping" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-zinc-800/80 backdrop-blur-md rounded-3xl p-6 text-center border border-zinc-700 shadow-2xl relative overflow-hidden"
            >
              {/* Dynamic Background Effect */}
              <motion.div 
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${result.color}`}
                animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              />

              {/* Floating Potion Orb */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${result.color} blur-xl`}
                />
                <motion.div
                  animate={{ 
                    y: [0, -10, 0], 
                    rotate: result.animation === 'weird' ? [0, -15, 15, 0] : 0 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: result.animation === 'weird' ? 0.5 : 2.5, 
                    ease: "easeInOut" 
                  }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center border-2 border-white/40 shadow-inner z-10`}
                >
                  {result.animation === 'sparkle' && <Sparkles className="w-10 h-10 text-white drop-shadow-md" />}
                  {result.animation === 'explode' && <Flame className="w-10 h-10 text-white drop-shadow-md" />}
                  {result.animation === 'poison' && <Skull className="w-10 h-10 text-white drop-shadow-md" />}
                  {result.animation === 'void' && <Moon className="w-10 h-10 text-white drop-shadow-md" />}
                  {result.animation === 'weird' && <Beaker className="w-10 h-10 text-white drop-shadow-md" />}
                  
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dashed border-white/50"
                  />
                </motion.div>
              </div>

              <h2 className={`relative z-10 text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${result.color}`}>
                {result.name}
              </h2>
              <p className="relative z-10 text-zinc-300 mb-6">{result.description}</p>
              <button
                onClick={reset}
                className="relative z-10 w-full py-4 rounded-2xl font-bold text-white bg-zinc-700 hover:bg-zinc-600 transition-colors shadow-lg"
              >
                Brew Again
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="grid grid-cols-4 gap-3 mb-8">
                {INGREDIENTS.map((ing) => {
                  const isSelected = selected.find(i => i.id === ing.id);
                  const isDisabled = (!isSelected && selected.length >= 3) || animatingIngredient !== null;
                  
                  return (
                    <button
                      key={ing.id}
                      onClick={() => toggleIngredient(ing)}
                      disabled={isDisabled || brewing}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300
                        ${isSelected ? `ring-2 ring-offset-2 ring-offset-[#1C1C1E] ring-purple-500 bg-zinc-700` : 'bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800'}
                        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.5)] hover:-translate-y-1'}
                      `}
                    >
                      <span className="text-3xl" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.5))' }}>
                        {ing.emoji}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-300 leading-tight px-1 text-center">
                        {ing.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={brew}
                disabled={selected.length === 0 || brewing || animatingIngredient !== null}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
                  ${selected.length > 0 && !brewing && !animatingIngredient
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
                `}
              >
                {brewing ? 'Brewing...' : 'Brew Potion'}
                {!brewing && <Beaker className="w-5 h-5" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
