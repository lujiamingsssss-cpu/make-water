import { motion } from 'motion/react';
import { Droplet, FlaskConical } from 'lucide-react';

interface MainMenuProps {
  onSelectMode: (mode: 'water' | 'potion') => void;
}

function ColorfulFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-60"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.6), transparent 40%), radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.6), transparent 40%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.6), transparent 40%), radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.6), transparent 40%)',
          filter: 'blur(60px)'
        }}
      />
    </div>
  );
}

export function MainMenu({ onSelectMode }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <ColorfulFlow />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-3">Welcome</h1>
        <p className="text-zinc-500 text-lg">Choose your experience for today</p>
      </motion.div>

      <div className="w-full max-w-md grid gap-6 relative z-10">
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
