import React from 'react';
import { useHabits } from '../hooks/useHabits';

export default function HabitCard({ habit, dateString }) {
  const { toggleHabit, deleteHabit } = useHabits();

  const isCompletedToday = habit.completedDates?.includes(dateString) || false;
  
  // Calculate basic streak (we'll implement full insights later)
  const calculateStreak = () => {
    let streak = 0;
    const completed = habit.completedDates || [];
    let current = new Date();
    
    while (true) {
      const ds = current.toISOString().split('T')[0];
      if (completed.includes(ds)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        // If today is not completed, check yesterday
        if (streak === 0 && ds === dateString) {
          current.setDate(current.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className={`glass p-5 rounded-2xl border flex items-center justify-between group transition-all duration-500 shadow-sm ${
      isCompletedToday 
        ? 'opacity-40 grayscale focus-within:opacity-100 hover:opacity-100 hover:grayscale-0 border-transparent dark:border-transparent' 
        : 'border-gray-200 dark:border-slate-800 hover:border-[#b0c8fb] dark:hover:border-emerald-500/30 bg-white/50 dark:bg-transparent shadow-gray-200 dark:shadow-emerald-500/5 hover:shadow-pastel-blue/30'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleHabit(habit.id, dateString)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors animate-pop ${
            isCompletedToday 
              ? 'bg-pastel-blue dark:bg-emerald-500 border-pastel-blue dark:border-emerald-500 text-white dark:text-slate-950 shadow-sm' 
              : 'border-gray-300 dark:border-slate-500 text-transparent hover:border-pastel-blue dark:hover:border-emerald-400 bg-white dark:bg-transparent'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-medium text-gray-800 dark:text-slate-100 transition-colors duration-300 leading-none">{habit.name}</h4>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 transition-colors">
              {habit.category || 'Personal'}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1 transition-colors">
            <span className={`text-[#ff9d76] dark:text-orange-400 ${currentStreak >= 3 ? 'animate-pulse-glow' : ''}`}>🔥</span> 
            {currentStreak} day streak
          </p>
        </div>
      </div>

      <button
        onClick={() => deleteHabit(habit.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-all"
        title="Delete Habit"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
