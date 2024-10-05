import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Adjust this import according to your Firebase configuration file
import Spinner from './Spinner';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
      setLoading(false); // Set loading to false after user state is determined
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Spinner />; // Display the loading spinner
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children} {/* Only render children when loading is false */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
