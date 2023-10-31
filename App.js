import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/modules/auth/pages/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/modules/auth/stack/AuthNavigator';
import i18n from './src/utils/i18n';
import BottomTab from './src/modules/common/services/BottomTab';
import BottomTabLogo from './src/components/BottomTabLogo';
import AppNavigator from './src/components/AppNavigator';
import { AuthProvider } from './src/components/AuthContext';

const App = () => {
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