import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] text-center px-4">
      <div className="glass p-12 rounded-3xl border border-gray-200 dark:border-slate-800 relative overflow-hidden max-w-2xl w-full transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-pastel-blue/40 dark:bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none transition-colors duration-300"></div>
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-emerald-400 dark:to-teal-200 transition-colors duration-300">
          Clarity for Your Habits
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-300 mb-10 max-w-lg mx-auto leading-relaxed transition-colors duration-300">
          Track daily routines, visualize your consistency, and build better habits with clean, actionable insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-pastel-blue hover:bg-[#b0c8fb] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-gray-900 dark:text-slate-950 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-pastel-blue/50 dark:shadow-none"
          >
            Start Tracking
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-3 bg-white/50 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 font-medium rounded-xl border border-gray-300 dark:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
