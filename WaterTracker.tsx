import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface BottleProps {
  percentage: number;
  className?: string;
}

export function Bottle({ percentage, className }: BottleProps) {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Bottle Cap */}
      <div className="w-14 h-6 bg-zinc-200 rounded-t-lg border-2 border-zinc-300 shadow-sm z-20 relative" />
      
      {/* Bottle Neck */}
      <div className="w-12 h-8 bg-white/40 backdrop-blur-md border-x-2 border-white/60 z-10 relative" />
      
      {/* Bottle Body */}
      <div className="relative w-48 h-80 rounded-[3rem] border-4 border-white/60 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl overflow-hidden flex items-end justify-center p-2 z-0">
        
        {/* Water Level */}
        <motion.div
          className="w-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-[2.5rem] relative overflow-hidden shadow-[inset_0_4px_12px_rgba(255,255,255,0.4)]"
          initial={{ height: '100%' }}
          animate={{ height: `${clampedPercentage}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15, mass: 1 }}
        >
          {/* Water Surface Highlight */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/50 to-transparent rounded-t-full" />
          
          {/* Subtle internal reflection */}
          <div className="absolute inset-y-0 left-2 w-4 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-sm" />
        </motion.div>
        
        {/* Bottle Glass Reflection */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 w-6 h-3/4 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-md pointer-events-none" />
        
        {/* Measurement Marks */}
        <div className="absolute left-2 top-1/4 w-3 h-[2px] bg-white/50 rounded-full" />
        <div className="absolute left-2 top-2/4 w-3 h-[2px] bg-white/50 rounded-full" />
        <div className="absolute left-2 top-3/4 w-3 h-[2px] bg-white/50 rounded-full" />
      </div>
    </div>
  );
}
