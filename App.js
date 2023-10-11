import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/modules/auth/pages/SplashScreen';

const App = () => {
  return (
    <View style={styles.fullscreen}>
      <SplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
      flex: 1
  }
});

export default App;
