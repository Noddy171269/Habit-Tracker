import React, { useMemo } from 'react';

export default function WeeklyOverview({ habits }) {
  // Generate the last 7 dates
  const days = useMemo(() => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
      const label = d.toLocaleDateString(undefined, { weekday: 'short' }).charAt(0);
      result.push({ dateString: ds, label });
    }
    return result;
  }, []);

  if (!habits || habits.length === 0) return null;

  return (
    <div className="mt-8 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2 transition-colors">
        <svg className="w-5 h-5 text-pastel-purple dark:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Weekly Matrix
      </h3>

      <div className="glass p-4 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-x-auto transition-colors">
        <div className="min-w-fit">
          <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-2 mb-2 items-end">
            <div></div>
            {days.map(day => (
              <div key={day.dateString} className="text-center text-xs font-semibold text-gray-500 dark:text-slate-400 transition-colors">
                {day.label}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {habits.map(habit => (
              <div key={habit.id} className="grid grid-cols-[100px_repeat(7,1fr)] gap-2 items-center">
                <div className="text-xs font-medium text-gray-700 dark:text-slate-300 truncate pr-2 transition-colors" title={habit.name}>
                  {habit.name}
                </div>
                {days.map(day => {
                  const isCompleted = habit.completedDates?.includes(day.dateString);
                  return (
                    <div 
                      key={`${habit.id}-${day.dateString}`} 
                      className={`h-6 w-full rounded container transition-colors duration-300 ${
                        isCompleted 
                          ? 'bg-pastel-blue dark:bg-emerald-500 shadow-sm shadow-blue-200 dark:shadow-none' 
                          : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50'
                      }`}
                      title={`${habit.name} on ${day.dateString}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
