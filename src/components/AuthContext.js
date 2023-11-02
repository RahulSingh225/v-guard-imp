import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDigestPostRequest } from '../utils/apiservice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const login = async () => {
    await AsyncStorage.clear();
    setIsUserAuthenticated(true);
    await AsyncStorage.setItem('isUserAuthenticated', 'true');
  };

  const logout = async () => {
    try {
      const path = 'user/logoutUser';
      createDigestPostRequest(path, "");
      await AsyncStorage.clear();
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  // Call this function after logging out to check AsyncStorage contents
  // e.g., onPress={() => logAsyncStorageContents()}
  

  useEffect(() => {
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
