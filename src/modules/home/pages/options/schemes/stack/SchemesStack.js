import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schemes from '../Schemes';
import ProductWise from '../ProductWise';
import ActiveScheme from '../ActiveScheme';
import SpecialCombo from '../SpecialCombo';
const SchemesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="schemeScreen" component={Schemes} />                                             
      <Stack.Screen name="productWiseOffers" component={ProductWise} />                                             
      <Stack.Screen name="activeScheme" component={ActiveScheme} />                                             
      <Stack.Screen name="specialCombo" component={SpecialCombo} />                                             
    </Stack.Navigator>
  );
};

export default SchemesStack;
