import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HabitProvider } from './context/HabitContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
const Dashboard = lazy(() => import('./pages/Dashboard')); // We will build this correctly in Phase 3
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HabitProvider>
          <Router>
          <div className="min-h-screen flex flex-col relative transition-colors duration-300">
            <div className="z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 w-full relative">
                <Suspense fallback={<div className="flex h-full items-center justify-center text-gray-500 dark:text-slate-400 animate-pulse text-sm font-medium">Loading Dashboard...</div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
      </HabitProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;