import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '../modules/common/services/BottomTab';
import AuthNavigator from '../modules/auth/stack/AuthNavigator';
import { AuthProvider, useAuth } from './AuthContext';
import OpenPopupOnOpeningApp from './OpenPopupOnOpeningApp'; // Import the OpenPopupOnOpeningApp component

const AppNavigator = () => {
  const { isUserAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isUserAuthenticated ? (
        <>
          <BottomTab />
          <OpenPopupOnOpeningApp />
        </>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
