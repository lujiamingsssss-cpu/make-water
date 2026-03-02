import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Droplet, Plus, Info, CheckCircle2, ArrowLeft, RotateCcw, Settings2 } from 'lucide-react';
import { Bottle } from './Bottle';
import { supabase, hasSupabase } from '../lib/supabase';
import { getUserId } from '../lib/user';

interface WaterTrackerProps {
  onBack: () => void;
}

export function WaterTracker({ onBack }: WaterTrackerProps) {
  const [drank, setDrank] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempGoal, setTempGoal] = useState(2000);

  useEffect(() => {
    const savedGoal = localStorage.getItem('water_daily_goal');
    if (savedGoal) {
      setDailyGoal(parseInt(savedGoal, 10));
      setTempGoal(parseInt(savedGoal, 10));
    }
    fetchTodayLogs();
  }, []);

  const fetchTodayLogs = async () => {
    setLoading(true);
    if (hasSupabase && supabase) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('water_logs')
        .select('amount')
        .eq('user_id', getUserId())
        .gte('created_at', today.toISOString());
        
      if (!error && data) {
        const total = data.reduce((sum, log) => sum + log.amount, 0);
        setDrank(total);
      }
    } else {
      const localData = localStorage.getItem('water_logs_today');
      if (localData) {
        const { date, amount } = JSON.parse(localData);
        if (new Date(date).toDateString() === new Date().toDateString()) {
          setDrank(amount);
        } else {
          setDrank(0);
        }
      }
    }
    setLoading(false);
  };

  const addWater = async (amount: number) => {
    const newTotal = drank + amount;
    setDrank(newTotal);
    
    if (newTotal >= dailyGoal && drank < dailyGoal) {
      triggerSuccess();
    }

    if (hasSupabase && supabase) {
      await supabase.from('water_logs').insert([
        { user_id: getUserId(), amount }
      ]);
    } else {
      localStorage.setItem('water_logs_today', JSON.stringify({
        date: new Date().toISOString(),
        amount: newTotal
      }));
    }
  };

  const resetWater = async () => {
    setDrank(0);
    if (hasSupabase && supabase) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await supabase
        .from('water_logs')
        .delete()
        .eq('user_id', getUserId())
        .gte('created_at', today.toISOString());
    } else {
      localStorage.setItem('water_logs_today', JSON.stringify({
        date: new Date().toISOString(),
        amount: 0
      }));
    }
  };

  const saveGoal = () => {
    setDailyGoal(tempGoal);
    localStorage.setItem('water_daily_goal', tempGoal.toString());
    setShowSettings(false);
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#60A5FA', '#3B82F6', '#93C5FD', '#FFFFFF']
    });
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const remaining = Math.max(0, dailyGoal - drank);
  const percentage = (remaining / dailyGoal) * 100;
  const isGoalReached = drank >= dailyGoal;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Droplet className="w-12 h-12 text-blue-400 animate-bounce" />
          <p className="text-zinc-500 font-medium">Loading your hydration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans selection:bg-blue-200 relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
          <button 
            onClick={resetWater}
            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors"
            title="Reset Today's Water"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors"
            title="Settings"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="pt-24 pb-8 px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Today's Hydration</h1>
        <p className="text-zinc-500 font-medium text-lg">
          {isGoalReached ? "Daily goal reached!" : `${remaining} ml remaining`}
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 pb-24 flex flex-col items-center">
        
        {/* Bottle Display */}
        <div className="relative mb-12">
          <Bottle percentage={percentage} />
          
          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Card */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500 font-medium mb-1">Consumed</p>
            <p className="text-2xl font-bold text-blue-600">{drank} <span className="text-base font-medium text-zinc-400">ml</span></p>
          </div>
          <div className="h-10 w-[1px] bg-zinc-100" />
          <div className="text-right">
            <p className="text-sm text-zinc-500 font-medium mb-1">Daily Goal</p>
            <p className="text-2xl font-bold text-zinc-800">{dailyGoal} <span className="text-base font-medium text-zinc-400">ml</span></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={() => addWater(250)}
            className="group relative overflow-hidden bg-white hover:bg-blue-50 transition-colors rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold text-zinc-700">250 ml</span>
            <span className="text-xs text-zinc-400 font-medium">Glass</span>
          </button>

          <button
            onClick={() => addWater(500)}
            className="group relative overflow-hidden bg-white hover:bg-blue-50 transition-colors rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold text-zinc-700">500 ml</span>
            <span className="text-xs text-zinc-400 font-medium">Bottle</span>
          </button>
        </div>

        {/* Supabase Status Banner */}
        {!hasSupabase && (
          <div className="mt-12 w-full bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Local Mode Active</p>
              <p className="text-xs text-amber-600/80 mt-1">
                Supabase credentials not found in environment variables. Data is saved locally in your browser.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4">Set Daily Goal</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Target Amount (ml)</label>
                <input 
                  type="number" 
                  value={tempGoal}
                  onChange={(e) => setTempGoal(Number(e.target.value))}
                  className="w-full text-2xl font-bold bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="500"
                  max="10000"
                  step="100"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveGoal}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
