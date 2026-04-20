import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';

export default function HabitForm() {
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('Personal');
  const [loading, setLoading] = useState(false);
  const { addHabit } = useHabits();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!habitName.trim()) return;

    try {
      setLoading(true);
      await addHabit(habitName.trim(), category);
      setHabitName('');
      setCategory('Personal');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-slate-800 mb-8 shadow-sm dark:shadow-none transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-slate-100 transition-colors">Add New Habit</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="E.g., Read for 30 minutes..."
          className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors cursor-pointer"
        >
          <option value="Health">Health</option>
          <option value="Study">Study</option>
          <option value="Fitness">Fitness</option>
          <option value="Personal">Personal</option>
        </select>
        <button
          type="submit"
          disabled={loading || !habitName.trim()}
          className="px-6 py-2 bg-pastel-blue dark:bg-emerald-500 hover:bg-[#b0c8fb] dark:hover:bg-emerald-600 text-gray-900 dark:text-slate-950 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm dark:shadow-none"
        >
          {loading ? 'Adding...' : 'Add Habit'}
        </button>
      </form>
    </div>
  );
}
