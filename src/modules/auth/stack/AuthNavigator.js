import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../../home/pages/HomeScreen';
import SplashScreen from '../pages/SplashScreen';
import RegisterUser from '../pages/RegisterUser';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splash" component={SplashScreen} />

      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="register" component={RegisterUser} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
