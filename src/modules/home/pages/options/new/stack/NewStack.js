import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import New from '../New';
import DailyWinner from '../DailyWinner';

const NewStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="whatsnew" component={New} />                               
      <Stack.Screen name="daily_winner" component={DailyWinner} />                               
    </Stack.Navigator>
  );
};

export default NewStack;
