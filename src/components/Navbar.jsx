import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <nav className="h-[73px] sticky top-0 z-50 glass border-b border-white dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto w-full h-full px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#84a9f8] to-pastel-purple dark:from-emerald-400 dark:to-teal-500 shadow-lg shadow-pastel-blue/40 dark:shadow-emerald-500/20 group-hover:scale-105 transition-all flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-950 transition-colors duration-300"></div>
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a95ef] to-[#ba72e6] dark:from-emerald-400 dark:to-teal-300 transition-all duration-300">HabitLens</span>
        </Link>
        
        <div className="flex items-center gap-4">
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 transition-colors border border-gray-200 dark:border-slate-700 shadow-sm"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-emerald-400 transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-lg bg-pastel-blue dark:bg-emerald-500 hover:bg-[#b0c8fb] dark:hover:bg-emerald-600 text-gray-900 dark:text-slate-950 transition-colors shadow-sm dark:shadow-none">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
