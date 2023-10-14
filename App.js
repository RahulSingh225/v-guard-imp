import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SplashScreen from './src/modules/auth/pages/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/modules/auth/stack/AuthNavigator';
import i18n from './src/utils/i18n';
import BottomTab from './src/modules/common/services/BottomTab';
import BottomTabLogo from './src/components/BottomTabLogo';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.fullscreen}>
        <BottomTab/>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});

export default App;