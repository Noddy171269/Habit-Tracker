import React, { useMemo } from 'react';
import { useHabits } from '../hooks/useHabits';

export default function InsightsPanel() {
  const { habits } = useHabits();

  const insights = useMemo(() => {
    if (!habits || habits.length === 0) return null;

    let overallTotalDays = 0;
    let overallCompletedDays = 0;
    let maxStreak = 0;
    const dayCounts = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 }; // Sun-Sat

    habits.forEach(habit => {
      const completed = habit.completedDates || [];
      overallCompletedDays += completed.length;

      // Estimate total days since creation
      const createdAt = habit.createdAt?.toDate() || new Date();
      // Round to start of days
      const startOfCreated = new Date(createdAt);
      startOfCreated.setHours(0,0,0,0);
      const startOfToday = new Date();
      startOfToday.setHours(0,0,0,0);
      
      const diffTime = Math.abs(startOfToday - startOfCreated);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include today
      overallTotalDays += diffDays;

      // Calculate streak logic for max streak tracking
      let currentStreak = 0;
      let localMaxStreak = 0;
      
      // Sort completed dates to find max streak
      const sortedDates = [...completed].sort();
      for (let i = 0; i < sortedDates.length; i++) {
        const d = new Date(sortedDates[i]);
        dayCounts[d.getDay()]++;

        if (i === 0) {
          currentStreak = 1;
        } else {
          const prev = new Date(sortedDates[i-1]);
          const curr = new Date(sortedDates[i]);
          const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
          
          if (diff === 1) {
            currentStreak++;
          } else if (diff > 1) {
            currentStreak = 1;
          }
        }
        if (currentStreak > localMaxStreak) {
          localMaxStreak = currentStreak;
        }
      }
      
      if (localMaxStreak > maxStreak) {
        maxStreak = localMaxStreak;
      }
    });

    const consistency = overallTotalDays === 0 ? 0 : Math.round((overallCompletedDays / overallTotalDays) * 100);

    // Find best day
    let bestDayIndex = 0;
    let maxCompletions = -1;
    for (let i = 0; i < 7; i++) {
      if (dayCounts[i] > maxCompletions) {
        maxCompletions = dayCounts[i];
        bestDayIndex = i;
      }
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bestDay = maxCompletions > 0 ? days[bestDayIndex] : 'N/A';

    return {
      maxStreak,
      consistency,
      bestDay,
      overallCompletedDays
    };
  }, [habits]);

  if (!insights) {
    return (
      <div className="p-6 glass rounded-2xl border border-gray-200 dark:border-slate-800 text-center text-gray-500 dark:text-slate-400 transition-colors">
        <p>Add some habits and complete them to see insights!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 transition-colors duration-300">
      <div className="p-5 glass rounded-2xl border border-gray-200 dark:border-slate-800 relative overflow-hidden group bg-white/40 dark:bg-transparent transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-pink/70 dark:bg-emerald-500/10 blur-[50px] group-hover:bg-pastel-pink/90 dark:group-hover:bg-emerald-500/20 transition-colors"></div>
        <div className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1 transition-colors">Consistency Score</div>
        <div className="text-4xl font-bold flex items-baseline gap-1 relative z-10 transition-colors">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba72e6] to-[#84a9f8] dark:from-emerald-400 dark:to-teal-200">
            {insights.consistency}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 glass rounded-xl border border-gray-200 dark:border-slate-800 bg-white/40 dark:bg-transparent transition-colors">
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider transition-colors">Longest Streak</div>
          <div className="text-2xl font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2 transition-colors">
            {insights.maxStreak} <span className="text-[#ff9d76] dark:text-orange-400 text-lg">🔥</span>
          </div>
        </div>

        <div className="p-4 glass rounded-xl border border-gray-200 dark:border-slate-800 bg-white/40 dark:bg-transparent transition-colors">
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider transition-colors">Total Actions</div>
          <div className="text-2xl font-semibold text-gray-800 dark:text-slate-200 text-[#84a9f8] dark:text-emerald-400 transition-colors">
            {insights.overallCompletedDays}
          </div>
        </div>
      </div>

      <div className="p-4 glass rounded-xl border border-gray-200 dark:border-slate-800 flex items-center gap-4 bg-white/40 dark:bg-transparent transition-colors">
        <div className="w-12 h-12 rounded-lg bg-pastel-blue/20 dark:bg-slate-800 flex items-center justify-center text-xl shadow-sm border border-pastel-blue/30 dark:border-transparent transition-colors">
          📅
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-slate-400 transition-colors">Most Active Day</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-slate-200 transition-colors">{insights.bestDay}</div>
        </div>
      </div>
    </div>
  );
}
