import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from '../ScanScreen';
import UploadError from '../UploadError';
import UniqueCodeHistory from '../UniqueCodeHistory';
import ProductRegistration from '../ProductRegistration';

const ScanStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="scanscreen" component={ScanScreen} />         
      <Stack.Screen name="uploadError" component={UploadError} />         
      <Stack.Screen name="uniqueCodeHistory" component={UniqueCodeHistory} />         
      <Stack.Screen name="productRegistration" component={ProductRegistration} />         
    </Stack.Navigator>
  );
};

export default ScanStack;
