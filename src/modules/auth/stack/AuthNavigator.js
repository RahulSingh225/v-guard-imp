import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import SplashScreen from '../pages/SplashScreen';
const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splash" component={SplashScreen} />

      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
