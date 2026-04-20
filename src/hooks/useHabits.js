import { useContext } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { HabitContext } from '../context/HabitContext';

export function useHabits() {
  const context = useContext(HabitContext);
  const { currentUser } = useAuth();

  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }

  const { habits, loading, error } = context;

  const addHabit = async (name, category = 'Personal') => {
    if (!currentUser) return;
    try {
      const habitsRef = collection(db, 'users', currentUser.uid, 'habits');
      await addDoc(habitsRef, {
        name,
        category,
        createdAt: serverTimestamp(),
        completedDates: []
      });
    } catch (err) {
      console.error('Error adding habit:', err);
      throw err;
    }
  };

  const deleteHabit = async (habitId) => {
    if (!currentUser) return;
    try {
      const docRef = doc(db, 'users', currentUser.uid, 'habits', habitId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting habit:', err);
      throw err;
    }
  };

  const toggleHabit = async (habitId, dateString) => {
    if (!currentUser) return;
    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;

      const completedDates = habit.completedDates || [];
      const isCompleted = completedDates.includes(dateString);
      
      const newCompletedDates = isCompleted 
        ? completedDates.filter(d => d !== dateString)
        : [...completedDates, dateString];

      const docRef = doc(db, 'users', currentUser.uid, 'habits', habitId);
      await updateDoc(docRef, {
        completedDates: newCompletedDates
      });
    } catch (err) {
      console.error('Error toggling habit:', err);
      throw err;
    }
  };

  return {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabit
  };
}
