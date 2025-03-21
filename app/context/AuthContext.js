'use client';

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookie() {
      try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated){
          setUser(data.username);
        }
         else if (!data.authenticated) {
          setUser(null);
        } 
      } else {
          console.error('Error fetching user data:', response.statusText);
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUserFromCookie();
  }, []);

  const login = (username) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };
  const isLoggedIn = useMemo(() => !!user, [user]);

  const value = {
    user,
    login,
    logout,
    loading,
    isLoggedIn
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
