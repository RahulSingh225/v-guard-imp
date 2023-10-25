import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Dashboard';
import ProductWiseEarning from '../ProductWiseEarning';
import SchemeWiseEarning from '../SchemeWiseEarning';
import YourRewards from '../YourRewards';

const DashboardStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="dashboardScreen" component={Dashboard} />                
      <Stack.Screen name="productWiseEarning" component={ProductWiseEarning} />                               
      <Stack.Screen name="schemeWiseEarning" component={SchemeWiseEarning} />                               
      <Stack.Screen name="yourRewards" component={YourRewards} />                               
    </Stack.Navigator>
  );
};

export default DashboardStack;
