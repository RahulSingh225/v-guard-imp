import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler, PermissionsAndroid, } from 'react-native';
import SplashScreen from './src/modules/auth/pages/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/modules/auth/stack/AuthNavigator';
import i18n from './src/utils/i18n';
import BottomTab from './src/modules/common/services/BottomTab';
import BottomTabLogo from './src/components/BottomTabLogo';
import AppNavigator from './src/components/AppNavigator';
import { DataProvider } from "../v-guard-imp/src/utils/appcontext";


async function requestCameraAndStoragePermissions() {
  try {
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;


    const granted = await PermissionsAndroid.requestMultiple([
      cameraPermission,

    ]);

    if (
      granted[cameraPermission] === PermissionsAndroid.RESULTS.GRANTED
      // &&
      // granted[storagePermission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera and storage permissions granted.');
      // You can now use the camera and access storage.
    } else {
      Alert.alert('Permission denied', 'You must grant camera and storage permissions to use this feature.');
    }
  } catch (error) {
    console.error('Permission request error:', error);
  }
}
import { AuthProvider } from './src/components/AuthContext';

const App = () => {

  useEffect(() => {
    requestCameraAndStoragePermissions();



  }, [])

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
    // <NavigationContainer>
    //   <View style={styles.fullscreen}>
    //     <BottomTab/>
    //   </View>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});

export default App;