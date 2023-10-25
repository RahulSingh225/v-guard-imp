import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Info from '../Info';
import Downloads from '../Downloads';
import ProductCatalogue from '../ProductCatalogue';
import VGuardInfo from '../VGuardInfo';

const InfoStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="infoScreen" component={Info} />         
      <Stack.Screen name="downloads" component={Downloads} />         
      <Stack.Screen name="productCatalogue" component={ProductCatalogue} />         
      <Stack.Screen name="vGuardInfo" component={VGuardInfo} />         
    </Stack.Navigator>
  );
};

export default InfoStack;
