import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao abrir o app, verifica se tem dados salvos no localStorage
    const recoveredUser = localStorage.getItem('cume_user');
    const token = localStorage.getItem('cume_token');

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Salva no estado e no localStorage
    setUser(userData);
    localStorage.setItem('cume_user', JSON.stringify(userData));
    localStorage.setItem('cume_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cume_user');
    localStorage.removeItem('cume_token');
  };

  // Verifica se está autenticado
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};