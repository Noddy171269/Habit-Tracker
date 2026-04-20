import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/dashboard');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error("Google Auth Error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign in cancelled: You closed the window.');
      } else {
        setError(`Google Auth Error: ${err.message}`);
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
      <div className="w-full max-w-md p-8 rounded-2xl glass shadow-xl shadow-pastel-blue/20 dark:shadow-emerald-500/5 border border-white dark:border-slate-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-slate-100 transition-colors">Sign Up</h2>
        {error && <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 p-3 rounded mb-4 text-center transition-colors">{error}</div>}
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 px-4 mb-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 font-medium rounded-lg transition-colors border border-gray-300 dark:border-slate-700 flex items-center justify-center gap-2 shadow-sm" 
          type="button"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            <path fill="none" d="M1 1h22v22H1z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-4">
          <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
          <span className="absolute px-3 bg-white/50 dark:bg-slate-900 text-gray-500 dark:text-slate-400 text-sm">or</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors" htmlFor="name">Display Name (Optional)</label>
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should we call you?"
              className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors" htmlFor="password-confirm">Password Confirmation</label>
            <input 
              id="password-confirm"
              type="password" 
              required 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue dark:focus:ring-emerald-500 text-gray-900 dark:text-slate-100 transition-colors"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full py-2 px-4 bg-pastel-blue dark:bg-emerald-500 hover:bg-[#b0c8fb] dark:hover:bg-emerald-600 text-gray-900 dark:text-slate-950 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-sm dark:shadow-none" 
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 dark:text-slate-400 text-sm transition-colors">
          Already have an account? <Link to="/login" className="text-[#84a9f8] dark:text-emerald-400 hover:text-[#6a95ef] dark:hover:text-emerald-300 font-medium hover:underline transition-colors">Log In</Link>
        </div>
      </div>
    </div>
  );
}
