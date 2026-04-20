import React, { createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const HabitContext = createContext();

export function HabitProvider({ children }) {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const habitsRef = collection(db, 'users', currentUser.uid, 'habits');
    const q = query(habitsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHabits(data);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching habits:', err);
      setError('Failed to load habits');
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <HabitContext.Provider value={{ habits, loading, error, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
}

export { HabitContext };
