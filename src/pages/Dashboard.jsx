import React, { useState, useMemo } from 'react';
import { useHabits } from '../hooks/useHabits';
import { useAuth } from '../context/AuthContext';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';
import InsightsPanel from '../components/InsightsPanel';
import CategoryFilter from '../components/CategoryFilter';
import ProgressBar from '../components/ProgressBar';
import WeeklyOverview from '../components/WeeklyOverview';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const { habits, loading, error } = useHabits();
  const { currentUser } = useAuth();
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeSlide, setActiveSlide] = useState('habits');

  // Get current local date string (YYYY-MM-DD)
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - (offset*60*1000)).toISOString().split('T')[0];

  const filteredHabits = habits.filter(habit => {
    if (filterCategory === 'All') return true;
    return (habit.category || 'Personal') === filterCategory;
  });

  const hour = today.getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  const quotes = [
    "Consistency is what transforms average into excellence.",
    "Small habits make a big difference.",
    "Focus on the system, not just the goal.",
    "Every action is a vote for the type of person you want to become.",
    "Rome wasn't built in a day, but they were laying bricks every hour."
  ];
  const dailyQuote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto transition-colors duration-300 flex flex-col md:flex-row gap-8">
      
      <Sidebar activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

      <div className="flex-1 min-w-0">
        <header className="mb-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">{greeting}, {currentUser?.displayName || currentUser?.email?.split('@')[0]}! <span className="animate-pop inline-block">👋</span></h2>
          <p className="text-gray-600 dark:text-slate-400 font-medium italic">"{dailyQuote}"</p>
        </header>

        <div key={activeSlide} className="animate-slide-up">
        {activeSlide === 'habits' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="flex items-center justify-between mb-6 transition-colors">
               <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200">Your Habits</h3>
               <span className="text-sm font-medium text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-800 shadow-sm dark:shadow-none border border-gray-100 dark:border-transparent px-4 py-1.5 rounded-full transition-colors">
                 {today.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
               </span>
             </div>
             
             <HabitForm />
             
             {habits.length > 0 && (
               <CategoryFilter currentFilter={filterCategory} onFilterChange={setFilterCategory} />
             )}

             {error && (
               <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 transition-colors">
                 {error}
               </div>
             )}

             {loading ? (
               <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-24 bg-white/40 dark:bg-slate-800/50 rounded-2xl animate-pulse border border-gray-100 dark:border-slate-800/50 transition-colors"></div>
                 ))}
               </div>
             ) : habits.length === 0 ? (
               <div className="text-center py-12 glass rounded-2xl border border-gray-200 dark:border-slate-800 border-dashed transition-colors duration-300">
                 <div className="text-5xl mb-4">✨</div>
                 <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-2">No habits yet</h3>
                 <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                   Add your first habit above to start tracking your runs, reading, or meditation routine.
                 </p>
               </div>
             ) : filteredHabits.length === 0 ? (
                <div className="text-center py-12 glass rounded-2xl border border-gray-200 dark:border-slate-800 border-dashed transition-colors duration-300">
                 <div className="text-4xl mb-4 px-4 py-2 opacity-50">📂</div>
                 <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-2">No {filterCategory} Habits</h3>
                 <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                   No habits found under this category.
                 </p>
               </div>
             ) : (
               <div className="space-y-4">
                 {filteredHabits.map((habit, index) => (
                   <div key={habit.id} className="animate-slide-up" style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}>
                     <HabitCard 
                       habit={habit} 
                       dateString={localToday} 
                     />
                   </div>
                 ))}
               </div>
             )}
           </div>
        )}

        {activeSlide === 'progress' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-6 transition-colors">Completion Trackers</h3>
             
             {habits.length > 0 && (
               <CategoryFilter currentFilter={filterCategory} onFilterChange={setFilterCategory} />
             )}

             {habits.length === 0 ? (
               <div className="text-center py-12 glass rounded-2xl border border-gray-200 dark:border-slate-800 border-dashed transition-colors duration-300">
                 <div className="text-5xl mb-4">📈</div>
                 <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-2">No Progress Yet</h3>
                 <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                   Go to the Habits tab and add some routines to start seeing your progress metrics!
                 </p>
               </div>
             ) : (
               <>
                 <ProgressBar habits={filteredHabits} localToday={localToday} />
                 <WeeklyOverview habits={filteredHabits} />
               </>
             )}
          </div>
        )}

        {activeSlide === 'insights' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-6 flex items-center gap-2 transition-colors">
               <svg className="w-5 h-5 text-pastel-purple dark:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
               Insights Overview
             </h3>
            <InsightsPanel />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
