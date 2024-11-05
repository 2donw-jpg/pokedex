 // authService.js
import { auth } from '@/services/firebaseConfig';
import { signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const anonSignIn = async () => {
  signInAnonymously(auth)
  .then(() => {
    console.log("Signed in Anon successfully");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode: ', errorCode);
    console.log('errorMessage: ', errorMessage);
  });
}

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
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
 