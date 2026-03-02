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

function CauldronBubbles({ active, color }: { active: boolean, color?: string }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[100%]">
      {[...Array(15)].map((_, i) => {
        const left = 15 + Math.random() * 70;
        const top = 15 + Math.random() * 70;
        const delay = Math.random() * 2;
        const duration = 0.8 + Math.random() * 1;
        const size = 8 + Math.random() * 16;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/40 flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, backgroundColor: color || '#a855f7' }}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: [0, 1, 1.3], opacity: [0, 0.9, 0], y: [10, 0, -5] }}
            transition={{ repeat: Infinity, duration, delay, ease: "easeOut" }}
          >
            <div className="absolute top-[20%] left-[20%] w-[25%] h-[25%] bg-white/70 rounded-full blur-[0.5px]" />
          </motion.div>
        );
      })}
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

function WitchBody() {
  return (
    <motion.div 
      className="absolute bottom-[180px] flex flex-col items-center pointer-events-none z-0"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ width: '480px', height: '480px' }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
        <defs>
          <radialGradient id="hagSkin" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fde0c6" />
            <stop offset="60%" stopColor="#e3a77a" />
            <stop offset="100%" stopColor="#b86b40" />
          </radialGradient>
          <radialGradient id="hagNose" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="70%" stopColor="#e07a7a" />
            <stop offset="100%" stopColor="#993333" />
          </radialGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f4f4e8" />
            <stop offset="100%" stopColor="#d4d4c8" />
          </linearGradient>
          <radialGradient id="eyeShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8a5a44" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e3a77a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- BLACK HOOD & CLOAK --- */}
        <path d="M 100 20 C 150 -10, 250 -10, 300 20 C 360 60, 390 180, 390 400 L 10 400 C 10 180, 40 60, 100 20 Z" fill="#0a0a0a" />
        <path d="M 120 40 C 160 10, 240 10, 280 40 C 330 80, 350 180, 350 400 L 50 400 C 50 180, 70 80, 120 40 Z" fill="#141414" />

        {/* --- STRINGY WHITE HAIR --- */}
        <path d="M 120 80 C 80 150, 60 280, 70 380 C 90 380, 120 280, 140 180 Z" fill="url(#hairGrad)" />
        <path d="M 280 80 C 320 150, 340 280, 330 380 C 310 380, 280 280, 260 180 Z" fill="url(#hairGrad)" />
        <path d="M 100 150 Q 80 250 90 350" fill="none" stroke="#d4d4c8" strokeWidth="2" />
        <path d="M 300 150 Q 320 250 310 350" fill="none" stroke="#d4d4c8" strokeWidth="2" />

        {/* --- HEAD & FACE BASE --- */}
        <path d="M 130 100 C 130 60, 270 60, 270 100 C 290 160, 290 230, 250 260 C 270 310, 230 350, 200 350 C 170 350, 130 310, 150 260 C 110 230, 110 160, 130 100 Z" fill="url(#hagSkin)" />
        
        <ellipse cx="160" cy="155" rx="32" ry="30" fill="url(#eyeShadow)" />
        <ellipse cx="240" cy="155" rx="32" ry="30" fill="url(#eyeShadow)" />

        {/* --- EYES --- */}
        <ellipse cx="160" cy="155" rx="24" ry="28" fill="#ffffff" stroke="#5c3a21" strokeWidth="2" />
        <ellipse cx="240" cy="155" rx="24" ry="28" fill="#ffffff" stroke="#5c3a21" strokeWidth="2" />
        
        <motion.g animate={{ x: [0, 6, -6, 0, 4, 0], y: [0, -3, 3, 0, -4, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}>
          <circle cx="160" cy="155" r="10" fill="#84cc16" />
          <circle cx="160" cy="155" r="4" fill="#000000" />
          <circle cx="156" cy="151" r="2.5" fill="#ffffff" />
          <circle cx="240" cy="155" r="10" fill="#84cc16" />
          <circle cx="240" cy="155" r="4" fill="#000000" />
          <circle cx="236" cy="151" r="2.5" fill="#ffffff" />
        </motion.g>

        <motion.g animate={{ y: [0, 2, 0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <path d="M 132 135 Q 160 105 188 135 Q 160 145 132 135 Z" fill="url(#hagSkin)" stroke="#a36642" strokeWidth="1.5" />
          <path d="M 268 135 Q 240 105 212 135 Q 240 145 268 135 Z" fill="url(#hagSkin)" stroke="#a36642" strokeWidth="1.5" />
        </motion.g>

        <motion.g animate={{ y: [0, -5, 0, -2, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
          <path d="M 125 115 Q 160 70 195 125" fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" />
          <path d="M 275 115 Q 240 70 205 125" fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" />
        </motion.g>

        <path d="M 135 175 Q 160 195 185 170" fill="none" stroke="#a36642" strokeWidth="2" />
        <path d="M 265 175 Q 240 195 215 170" fill="none" stroke="#a36642" strokeWidth="2" />

        {/* --- NOSE --- */}
        <path d="M 190 140 C 170 200, 150 260, 195 285 C 230 260, 230 200, 210 140 Z" fill="url(#hagNose)" stroke="#b85252" strokeWidth="2" style={{ filter: 'drop-shadow(2px 6px 4px rgba(0,0,0,0.4))' }} />
        <circle cx="205" cy="240" r="8" fill="#d4d4aa" stroke="#8a8a66" strokeWidth="1.5" />
        <circle cx="203" cy="238" r="2" fill="#555" />

        {/* --- MOUTH & CHIN --- */}
        <path d="M 145 220 Q 150 280 190 290" fill="none" stroke="#a36642" strokeWidth="3" />
        <path d="M 255 220 Q 250 280 210 290" fill="none" stroke="#a36642" strokeWidth="3" />

        <motion.path 
          d="M 155 260 Q 200 275 245 260 Q 200 310 155 260 Z" 
          fill="#2a0808" stroke="#5c2b2b" strokeWidth="2"
          animate={{
            d: [
              "M 155 260 Q 200 275 245 260 Q 200 310 155 260 Z",
              "M 160 265 Q 200 270 240 265 Q 200 290 160 265 Z",
              "M 155 260 Q 200 280 245 260 Q 200 320 155 260 Z",
              "M 155 260 Q 200 275 245 260 Q 200 310 155 260 Z"
            ]
          }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        
        <motion.rect 
          x="205" y="270" width="14" height="18" fill="#e8e8d3" rx="2" stroke="#8a8a66" strokeWidth="1"
          animate={{ y: [270, 265, 275, 270] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />

        <path d="M 175 320 Q 200 340 225 320" fill="none" stroke="#a36642" strokeWidth="2.5" />
        <path d="M 185 335 Q 200 345 215 335" fill="none" stroke="#a36642" strokeWidth="2" />
        <path d="M 150 100 Q 200 115 250 100" fill="none" stroke="#a36642" strokeWidth="2" />
        <path d="M 160 85 Q 200 100 240 85" fill="none" stroke="#a36642" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}

function WitchHands() {
  return (
    <motion.div 
      className="absolute bottom-[120px] flex flex-col items-center pointer-events-none z-30"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ width: '480px', height: '480px' }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
        <defs>
          <radialGradient id="hagSkin" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fde0c6" />
            <stop offset="60%" stopColor="#e3a77a" />
            <stop offset="100%" stopColor="#b86b40" />
          </radialGradient>
        </defs>

        {/* Left Hand */}
        <motion.g animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
          <path d="M 10 220 C 0 260, 30 300, 70 280 C 90 270, 100 230, 70 210 Z" fill="url(#hagSkin)" />
          <path d="M 75 240 Q 110 260 110 310" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 65 270 Q 90 320 90 370" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 45 275 Q 60 340 60 390" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 25 270 Q 35 330 35 370" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 103 300 L 110 325 L 117 300 Z" fill="#2a0808" />
          <path d="M 83 360 L 90 385 L 97 360 Z" fill="#2a0808" />
          <path d="M 53 380 L 60 405 L 67 380 Z" fill="#2a0808" />
          <path d="M 28 360 L 35 385 L 42 360 Z" fill="#2a0808" />
          <circle cx="70" cy="300" r="30" fill="#a855f7" style={{ filter: "blur(20px)", mixBlendMode: "screen" }} />
        </motion.g>

        {/* Right Hand */}
        <motion.g animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}>
          <path d="M 390 220 C 400 260, 370 300, 330 280 C 310 270, 300 230, 330 210 Z" fill="url(#hagSkin)" />
          <path d="M 325 240 Q 290 260 290 310" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 335 270 Q 310 320 310 370" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 355 275 Q 340 340 340 390" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 375 270 Q 365 330 365 370" fill="none" stroke="url(#hagSkin)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 283 300 L 290 325 L 297 300 Z" fill="#2a0808" />
          <path d="M 303 360 L 310 385 L 317 360 Z" fill="#2a0808" />
          <path d="M 333 380 L 340 405 L 347 380 Z" fill="#2a0808" />
          <path d="M 358 360 L 365 385 L 372 360 Z" fill="#2a0808" />
          <circle cx="330" cy="300" r="30" fill="#a855f7" style={{ filter: "blur(20px)", mixBlendMode: "screen" }} />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function BrewingBackground({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.8), transparent, rgba(56, 189, 248, 0.8), transparent)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResultBackground({ result }: { result: BrewResult | null }) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 z-0 pointer-events-none bg-gradient-to-br ${result.color}`}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-full h-full bg-black/50 mix-blend-overlay"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Campfire({ active }: { active: boolean }) {
  return (
    <div className="absolute bottom-0 w-64 h-32 flex flex-col items-center justify-end z-0">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-6 w-full h-32 flex justify-center items-end"
          >
            <motion.div 
              className="absolute bottom-0 w-24 h-28 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-[100%] blur-[6px]"
              animate={{ scale: [1, 1.1, 0.9, 1.05, 1], rotate: [-2, 2, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-4 w-6 h-12 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px]"
                style={{ mixBlendMode: 'screen' }}
                animate={{
                  y: [0, -40 - Math.random() * 30],
                  scale: [1, 0],
                  x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
                  opacity: [0.8, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + Math.random() * 0.4,
                  delay: Math.random() * 0.5,
                  ease: "easeIn"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative flex justify-center items-end w-40 h-10 z-10">
        <div className="absolute w-32 h-6 bg-[#3e2723] rounded-full border-2 border-[#1f1209] rotate-[-15deg] shadow-lg" />
        <div className="absolute w-32 h-6 bg-[#4e342e] rounded-full border-2 border-[#1f1209] rotate-[15deg] shadow-lg" />
        <div className="absolute w-28 h-6 bg-[#5d4037] rounded-full border-2 border-[#1f1209] rotate-[5deg] shadow-lg" />
      </div>
    </div>
  );
}

function DarkDungeonBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0c]">
      {/* Brick/Stone texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `linear-gradient(335deg, rgba(255,255,255,0.03) 0%, transparent 10%), linear-gradient(155deg, rgba(255,255,255,0.03) 0%, transparent 10%)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] opacity-95" />

      {/* Hanging Elements (Herbs, Chains, Cobwebs) */}
      <svg viewBox="0 0 400 200" className="absolute top-0 left-0 w-full h-64 opacity-60" preserveAspectRatio="none">
        {/* Left Cobweb */}
        <path d="M 0 0 L 120 0 L 0 120 Z" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
        <path d="M 0 30 Q 40 50 90 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
        <path d="M 0 60 Q 30 60 60 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
        <path d="M 0 90 Q 20 70 30 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
        
        {/* Right Cobweb */}
        <g transform="translate(400, 0) scale(-1, 1)">
          <path d="M 0 0 L 120 0 L 0 120 Z" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
          <path d="M 0 30 Q 40 50 90 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
          <path d="M 0 60 Q 30 60 60 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
          <path d="M 0 90 Q 20 70 30 0" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Hanging Herbs/Roots */}
        <g stroke="#0a0a0a" fill="#1f2937">
          <path d="M 50 0 L 50 140 M 40 140 Q 50 170 60 140 Z" strokeWidth="3" />
          <path d="M 80 0 L 80 90 M 70 90 Q 80 120 90 90 Z" strokeWidth="2" />
          <path d="M 320 0 L 320 160 M 310 160 Q 320 190 330 160 Z" strokeWidth="4" />
          <path d="M 350 0 L 350 110 M 340 110 Q 350 140 360 110 Z" strokeWidth="2" />
        </g>
      </svg>

      {/* Ambient Dust/Embers */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500/40 rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function ResultSprites({ result }: { result: BrewResult | null }) {
  if (!result) return null;

  const renderSprite = (i: number) => {
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const xOffset = (Math.random() - 0.5) * 350;
    const yOffset = (Math.random() - 0.5) * 450;

    if (result.animation === 'sparkle') {
      // Fairy
      return (
        <motion.div key={i} className="absolute top-1/2 left-1/2 z-40"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: xOffset, y: yOffset, opacity: [0, 1, 0.8, 1, 0], scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -20, 0], x: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration }}>
            <div className="w-4 h-4 bg-blue-200 rounded-full shadow-[0_0_15px_#93c5fd]" />
            <motion.div className="absolute top-0 left-[-10px] w-4 h-6 bg-white/40 rounded-full origin-bottom-right" animate={{ rotateZ: [-20, 40, -20] }} transition={{ repeat: Infinity, duration: 0.1 }} />
            <motion.div className="absolute top-0 right-[-10px] w-4 h-6 bg-white/40 rounded-full origin-bottom-left" animate={{ rotateZ: [20, -40, 20] }} transition={{ repeat: Infinity, duration: 0.1 }} />
          </motion.div>
        </motion.div>
      );
    } else if (result.animation === 'explode') {
      // Fire Elemental
      return (
        <motion.div key={i} className="absolute top-1/2 left-1/2 z-40"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: xOffset, y: yOffset - 100, opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration }}>
            <div className="w-6 h-8 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-[100%] blur-[1px] shadow-[0_0_20px_#ea580c]" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
          </motion.div>
        </motion.div>
      );
    } else if (result.animation === 'poison') {
      // Slime Blob
      return (
        <motion.div key={i} className="absolute top-1/2 left-1/2 z-40"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: xOffset, y: yOffset, opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.8] }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -15, 0], scaleX: [1, 1.2, 1], scaleY: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration }}>
            <div className="w-8 h-6 bg-green-500/80 rounded-full shadow-[0_0_20px_#22c55e] backdrop-blur-sm border border-green-300/50" />
          </motion.div>
        </motion.div>
      );
    } else if (result.animation === 'void') {
      // Void Eye
      return (
        <motion.div key={i} className="absolute top-1/2 left-1/2 z-40"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: xOffset, y: yOffset, opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration }}>
            <div className="w-6 h-6 bg-indigo-950 rounded-full shadow-[0_0_25px_#6366f1] border border-indigo-400 flex items-center justify-center">
              <div className="w-2 h-4 bg-purple-400 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      );
    } else {
      // Weird geometry
      return (
        <motion.div key={i} className="absolute top-1/2 left-1/2 z-40"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: xOffset, y: yOffset, opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration }}>
            <div className="w-6 h-6 bg-pink-500/60 shadow-[0_0_15px_#ec4899] backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
          </motion.div>
        </motion.div>
      );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => renderSprite(i))}
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
      <DarkDungeonBackground />
      <BrewingBackground active={brewing} />
      <ResultBackground result={result} />
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

        <div className="relative w-full max-w-md h-[420px] mb-8 flex flex-col items-center justify-end">
          <AnimatePresence>
            {animatingIngredient && (
              <motion.div className="absolute top-0 z-50">
                <CrushAnimation ingredient={animatingIngredient} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Witch Body (Behind Cauldron) */}
          <AnimatePresence>
            {brewing && <WitchBody />}
          </AnimatePresence>

          {/* Campfire (Below Cauldron) */}
          <Campfire active={brewing || result !== null || selected.length > 0} />

          {/* Dynamic Lighting when brewing */}
          <AnimatePresence>
            {brewing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center"
              >
                <motion.div 
                  className="w-[600px] h-[600px] rounded-full"
                  style={{ background: `radial-gradient(circle, ${cauldronColor}88 0%, transparent 60%)`, mixBlendMode: 'screen' }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Cauldron */}
          <motion.div 
            className="relative w-[340px] h-44 flex flex-col items-center z-10 mb-12"
            animate={{ y: brewing ? [-20, -35, -20] : [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: brewing ? 2 : 4, ease: "easeInOut" }}
          >
            {/* Steam and Effects (Outside) */}
            <CauldronSteam color={cauldronColor} active={selected.length > 0 || result !== null} />
            <ResultEffects result={result} />

            {/* Cauldron Body (Glass/Crystal) */}
            <div className="absolute top-6 w-[310px] h-36 rounded-b-[4.5rem] border-4 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(255,255,255,0.1)] z-10 flex items-center justify-between px-1 backdrop-blur-md bg-zinc-900/40 overflow-hidden">
              {/* Liquid Inside the Glass */}
              <motion.div 
                className={`absolute bottom-0 left-0 w-full opacity-90 ${result ? `bg-gradient-to-b ${result.color}` : ''}`}
                style={{ height: '85%', filter: 'blur(4px)' }}
                animate={{ 
                  backgroundColor: result ? undefined : cauldronColor,
                  y: brewing ? [0, -10, 0] : 0
                }}
                transition={{ 
                  backgroundColor: { duration: 1 },
                  y: { repeat: Infinity, duration: brewing ? 1 : 3, ease: "easeInOut" }
                }}
              />
              {/* Iron Ring Handles */}
              <div className="relative w-6 h-12 rounded-full border-4 border-zinc-500 shadow-lg -ml-3 z-10" style={{ transform: 'perspective(100px) rotateY(40deg)' }} />
              <div className="relative w-6 h-12 rounded-full border-4 border-zinc-500 shadow-lg -mr-3 z-10" style={{ transform: 'perspective(100px) rotateY(-40deg)' }} />
            </div>

            {/* Cauldron Rim & Liquid Surface */}
            <div className="absolute top-0 w-full h-14 bg-black/40 backdrop-blur-md rounded-[100%] border-4 border-white/20 z-20 shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
              <motion.div 
                className={`w-[96%] h-[84%] rounded-[100%] relative overflow-hidden ${result ? `bg-gradient-to-b ${result.color}` : ''}`}
                animate={{ 
                  backgroundColor: result ? undefined : cauldronColor,
                }}
                transition={{ duration: 1 }}
                style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}
              >
                {/* Surface Bubbles */}
                <CauldronBubbles active={selected.length > 0 || result !== null} color={cauldronColor} />
              </motion.div>
            </div>

            {/* Ingredients Drop Area */}
            <AnimatePresence>
              {!brewing && !result && selected.map((ing, i) => (
                <motion.div
                  key={ing.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 15, x: (i - 1) * 40 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-0 z-30 flex flex-wrap w-12 justify-center gap-1"
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
          </motion.div>

          {/* Witch Hands (In Front of Cauldron) */}
          <AnimatePresence>
            {brewing && <WitchHands />}
          </AnimatePresence>

          <AnimatePresence>
            {brewing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
              >
                <div className="w-full h-full bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <Sparkles className="absolute top-20 text-yellow-300 w-10 h-10 animate-spin" />
                <Sparkles className="absolute top-32 left-16 text-purple-300 w-8 h-8 animate-bounce" />
                <Sparkles className="absolute top-24 right-16 text-green-300 w-6 h-6 animate-ping" />
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
                <ResultSprites result={result} />
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
                className={`relative w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
                  ${selected.length > 0 && !brewing && !animatingIngredient
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] hover:scale-[1.02]' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
                `}
              >
                {selected.length > 0 && !brewing && !animatingIngredient && (
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}
                <span className="relative z-10">{brewing ? 'Brewing...' : 'Brew Potion'}</span>
                {!brewing && <Beaker className="w-6 h-6 relative z-10" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
