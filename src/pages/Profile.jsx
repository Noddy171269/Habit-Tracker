import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { currentUser, updateUserName, updateUserPassword } = useAuth();
  
  const [name, setName] = useState(currentUser?.displayName || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const [pwdError, setPwdError] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  async function handleNameUpdate(e) {
    e.preventDefault();
    if (!name.trim()) return setNameError('Name cannot be empty');

    try {
      setNameError('');
      setNameMessage('');
      setNameLoading(true);
      await updateUserName(name.trim());
      setNameMessage('Profile name updated successfully.');
    } catch {
      setNameError('Failed to update profile name');
    } finally {
      setNameLoading(false);
    }
  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setPwdError('Passwords do not match');
    }
    if (password.length < 6) {
      return setPwdError('Password must be at least 6 characters');
    }

    try {
      setPwdError('');
      setPwdMessage('');
      setPwdLoading(true);
      await updateUserPassword(password);
      setPwdMessage('Password updated successfully.');
      setPassword('');
      setPasswordConfirm('');
    } catch (err) {
      // Re-authentication errors bubble up here
      if (err.code === 'auth/requires-recent-login') {
        setPwdError('Please log out and log back in to update your password.');
      } else {
        setPwdError('Failed to update password. Try logging in again.');
      }
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto transition-colors duration-300">
      <header className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2 transition-colors">Your Profile</h2>
        <p className="text-gray-600 dark:text-slate-400 transition-colors">Manage your identity and security</p>
      </header>

      <div className="space-y-8">
        
        {/* Name Update Form */}
        <div className="glass p-8 rounded-2xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 shadow-sm dark:shadow-none">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-slate-100 transition-colors">Personal Info</h3>
          {nameError && <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 p-3 rounded mb-4 transition-colors">{nameError}</div>}
          {nameMessage && <div className="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400 p-3 rounded mb-4 transition-colors">{nameMessage}</div>}
          
          <form onSubmit={handleNameUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">Display Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={nameLoading}
              className="py-2 px-6 bg-pastel-blue dark:bg-emerald-500 hover:bg-[#b0c8fb] dark:hover:bg-emerald-600 text-gray-900 dark:text-slate-950 font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {nameLoading ? 'Saving...' : 'Update Name'}
            </button>
          </form>
        </div>

        {/* Password Update Form */}
        <div className="glass p-8 rounded-2xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 shadow-sm dark:shadow-none">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-slate-100 transition-colors">Security</h3>
          {pwdError && <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 p-3 rounded mb-4 transition-colors">{pwdError}</div>}
          {pwdMessage && <div className="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400 p-3 rounded mb-4 transition-colors">{pwdMessage}</div>}
          
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep same"
                className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">Confirm New Password</label>
              <input 
                type="password" 
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={pwdLoading || !password}
              className="py-2 px-6 bg-gray-800 dark:bg-slate-700 hover:bg-gray-700 dark:hover:bg-slate-600 text-white dark:text-slate-200 font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {pwdLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
