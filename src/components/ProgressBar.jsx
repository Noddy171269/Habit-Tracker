import React, { useMemo } from 'react';

export default function ProgressBar({ habits, localToday }) {
  const { completedToday, total } = useMemo(() => {
    if (!habits || habits.length === 0) return { completedToday: 0, total: 0 };
    const completed = habits.filter(h => h.completedDates?.includes(localToday)).length;
    return { completedToday: completed, total: habits.length };
  }, [habits, localToday]);

  const percentage = total === 0 ? 0 : Math.round((completedToday / total) * 100);

  return (
    <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-slate-800 mb-8 transition-colors duration-300">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 transition-colors">Daily Progress</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-slate-100 transition-colors">
            {completedToday} <span className="text-gray-400 dark:text-slate-500 text-base font-medium">/ {total} completed</span>
          </p>
        </div>
        <div className="text-2xl font-bold text-[#84a9f8] dark:text-emerald-400 group relative transition-colors">
          {percentage}%
        </div>
      </div>
      
      <div className="w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
        <div 
          className="h-full bg-gradient-to-r from-[#ba72e6] to-[#6a95ef] dark:from-emerald-400 dark:to-teal-300 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
