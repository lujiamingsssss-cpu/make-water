import { motion } from 'motion/react';
import { Droplet, FlaskConical } from 'lucide-react';

interface MainMenuProps {
  onSelectMode: (mode: 'water' | 'potion') => void;
}

export function MainMenu({ onSelectMode }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-3">Welcome</h1>
        <p className="text-zinc-500 text-lg">Choose your experience for today</p>
      </motion.div>

      <div className="w-full max-w-md grid gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('water')}
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group border border-transparent hover:border-blue-100"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Droplet className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-zinc-800 mb-1">AquaTrack</h2>
            <p className="text-zinc-500 text-sm">Daily hydration tracker</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('potion')}
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group border border-transparent hover:border-purple-100"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <FlaskConical className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-zinc-800 mb-1">Dark Potion</h2>
            <p className="text-zinc-500 text-sm">Brew magical dark cuisine</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
