import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactPage from '../pages/ContactPage';

const ContactStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="contact" component={ContactPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
