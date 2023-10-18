import { View, Text } from 'react-native';
import React from 'react';
import HomePage from '../pages/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="home" component={HomePage} />

    </Stack.Navigator>
  );
};

export default HomeStack;
