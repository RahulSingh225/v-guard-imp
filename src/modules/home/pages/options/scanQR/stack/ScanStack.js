import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from '../ScanScreen';
import UploadError from '../UploadError';
import UniqueCodeHistory from '../UniqueCodeHistory';
import ProductRegistration from '../ProductRegistration';
import { CustomTabHeader } from '../../../../../common/services/BottomTab';
import colors from '../../../../../../../colors';

const ScanStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow
          },
          headerShown: false
        }}>
      <Stack.Screen name="Scan QR" component={ScanScreen} 
        options={{
          headerShown: true
        }}
      />         
      <Stack.Screen name="Upload Scanning Error" component={UploadError} 
        options={{
          headerShown: true
        }}
      />         
      <Stack.Screen name="Unique Code History" component={UniqueCodeHistory} 
        options={{
          headerShown: true
        }}
      />         
      <Stack.Screen name="Product Registration" component={ProductRegistration} 
        options={{
          headerShown: true
        }}
      />         
    </Stack.Navigator>
  );
};

export default ScanStack;
