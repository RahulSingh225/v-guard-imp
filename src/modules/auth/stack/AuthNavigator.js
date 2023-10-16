import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../../home/pages/HomeScreen';
import SplashScreen from '../pages/SplashScreen';
import RegisterUser from '../pages/RegisterUser';
import CategorySelection from '../pages/CategorySelection';
import LoginWithOtp from '../pages/LoginWithOtp';
import NewUser from '../pages/NewUser';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="category" component={CategorySelection} />

      {/* <Stack.Screen name="splash" component={SplashScreen} /> */}

      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="register" component={RegisterUser} />
      <Stack.Screen name="loginwithotp" component={LoginWithOtp} />
      <Stack.Screen name="newUser" component={NewUser} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
