// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth } from '@/services/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state based on authentication status
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  return user;
};

export default useAuth;
