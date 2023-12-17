import React, { useEffect, useState } from 'react';
import {
 StyleSheet,
  Alert,
  PermissionsAndroid,
  View
} from 'react-native';

import AppNavigator from './src/components/AppNavigator';

async function requestAllPermissions() {
  try {
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const contactPermission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    const locationPermission =
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    const granted = await PermissionsAndroid.requestMultiple([
      cameraPermission,
      contactPermission,
      locationPermission,
    ]);

    if (
      granted[cameraPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[contactPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[locationPermission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera, contact, and location permissions granted.');
    } else {
      Alert.alert(
        'Permission denied',
        'You must grant camera, contact, and location permissions to use this feature.',
      );
    }
  } catch (error) {
    console.error('Permission request error:', error);
  }
}

import { AuthProvider } from './src/components/AuthContext';
import ActionPickerModal from './src/components/ActionPickerModal';
import { height, width } from './src/utils/dimensions';

const App = () => {
  useEffect(() => {
    requestAllPermissions();
  }, []);



  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});

export default App;
