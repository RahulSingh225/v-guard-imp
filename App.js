import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/modules/auth/pages/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/modules/auth/services/AuthNavigator';
import i18n from './src/utils/i18n';

const App = () => {
  
  return (
    <NavigationContainer>
    <View style={styles.fullscreen}>
      <AuthNavigator/>
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
      flex: 1
  }
});

export default App;