import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const login = async () => {
    setIsUserAuthenticated(true);
    // Set AsyncStorage when the user logs in
    await AsyncStorage.setItem('isUserAuthenticated', 'true');
  };

  const logout = async () => {
    setIsUserAuthenticated(false);
    // Clear AsyncStorage when the user logs out
    await AsyncStorage.removeItem('isUserAuthenticated');
  };

  // Check the authentication status when the app starts
  useEffect(() => {
    // Check AsyncStorage to determine the authentication status
    AsyncStorage.getItem('isUserAuthenticated')
      .then((value) => {
        const isAuthenticated = value === 'true';

        if (isAuthenticated) {
          login();
        } else {
          logout();
        }
      })
      .catch((error) => {
        console.error('AsyncStorage error:', error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
