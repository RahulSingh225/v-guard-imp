import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDigestPostRequest} from '../utils/apiservice';
import VguardRishtaUserService from '../modules/common/services/VguardRishtaUserService';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const login = async User => {
   await AsyncStorage.setItem("USER",JSON.stringify(User))
    setIsUserAuthenticated(true);
  };

  const logout = async () => {
    try {
      const path = 'user/logoutUser';
      createDigestPostRequest(path, '');
      await AsyncStorage.removeItem("USER")
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  // Call this function after logging out to check AsyncStorage contents
  // e.g., onPress={() => logAsyncStorageContents()}

  useEffect(() => {
    AsyncStorage.getItem('USER')
      .then(value => {
        

        if (value) {
          login(JSON.parse(value));
        } else {
          logout();
        }
      })
      .catch(error => {
        console.error('AsyncStorage error:', error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{isUserAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
