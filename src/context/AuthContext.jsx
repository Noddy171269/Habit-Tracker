import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  updatePassword
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
      setCurrentUser({ ...userCredential.user, displayName: name });
    }
    return userCredential;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function updateUserName(name) {
    if (!auth.currentUser) return Promise.reject(new Error("No user logged in"));
    return updateProfile(auth.currentUser, { displayName: name }).then(() => {
      setCurrentUser({ ...auth.currentUser, displayName: name });
    });
  }

  function updateUserPassword(newPassword) {
    if (!auth.currentUser) return Promise.reject(new Error("No user logged in"));
    return updatePassword(auth.currentUser, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateUserName,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
