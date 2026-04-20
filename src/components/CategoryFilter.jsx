import React from 'react';

const CATEGORIES = ['All', 'Health', 'Study', 'Fitness', 'Personal'];

export default function CategoryFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
            currentFilter === category
              ? 'bg-pastel-blue dark:bg-emerald-500 text-gray-900 dark:text-slate-950 border-transparent shadow-pastel-blue/30 dark:shadow-none'
              : 'bg-white/70 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
