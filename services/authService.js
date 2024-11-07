 // authService.js
import { auth } from '@/services/firebaseConfig';
import { onAuthStateChanged,signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile  } from 'firebase/auth';
import { createTrainer } from '@/services/dbService';

export const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  console.log('User Connected: ', currentUser);
  return currentUser;
}

export const anonSignIn = async () => {
  try {
    const result = await signInAnonymously(auth);
    const user = result.user || auth.currentUser;
    if (user) {
      createTrainer(user.uid);
    } else {
      console.log("No user was found");
    }
  } catch (error) {
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
  }
};

export const signUp = async (email, password, username) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user || auth.currentUser;
    if (user) {
      updateProfile(auth.currentUser, 
        {
        displayName: username, 
      });
      createTrainer(user.uid);
    } else {
      console.log("No user was found");
    }
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
 
