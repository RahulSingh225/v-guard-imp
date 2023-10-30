import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../../home/pages/HomeScreen';
import SplashScreen from '../pages/SplashScreen';
import RegisterUser from '../pages/RegisterUser';
import CategorySelection from '../pages/CategorySelection';
import LoginWithOtp from '../pages/LoginWithOtp';
import NewUser from '../../../modules/auth/pages/NewUser';
import NewUserKyc from '../../../modules/auth/pages/NewUserKyc';
import NomineePage from '../pages/NomineePage';
import ForgotPassword from '../pages/ForgotPassword';
import LoginWithNumber from '../pages/LoginWithNumber';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();



  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false

      }}>
      <Stack.Screen name="category" component={CategorySelection} />

      {/* <Stack.Screen name="splash" component={SplashScreen} /> */}

      <Stack.Screen name="login" component={LoginScreen} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="register" component={RegisterUser} />
      <Stack.Screen name="loginwithotp" component={LoginWithOtp} />
      {/* {/* <Stack.Screen name="newUser" component={NewUser} screenOptions={{ headerShown: true }} /> */}
      <Stack.Screen name="Kyc" component={Kyc} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="loginWithNumber" component={LoginWithNumber} />

    </Stack.Navigator>


  );


};


const Kyc = () => {
  const kycStack = createNativeStackNavigator();
  return (
    <kycStack.Navigator
      screenOptions={{
        headerShown: true,
      }}>

      <kycStack.Screen name="NewUser" component={NewUser} />
      <kycStack.Screen name="NewUserKyc" component={NewUserKyc} />
      < kycStack.Screen name='NomineePage' component={NomineePage} />

    </kycStack.Navigator>

  );

};

export default AuthNavigator;
