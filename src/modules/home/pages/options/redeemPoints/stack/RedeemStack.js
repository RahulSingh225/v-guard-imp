import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RedeemPoints from '../RedeemPoints';
import InstantBankTransfer from '../InstantBankTransfer';
import PaytmTransfer from '../PaytmTransfer';
import RedeemProducts from '../RedeemProducts';
import ElectronicGiftVoucher from '../ElectronicGiftVoucher';
import TrackRedemption from '../TrackRedemption';
import RedemptionHistory from '../RedemptionHistory';

const RedeemStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="redeemscreen" component={RedeemPoints} />                
      <Stack.Screen name="banktransfer" component={InstantBankTransfer} />                
      <Stack.Screen name="paytmtransfer" component={PaytmTransfer} />                
      <Stack.Screen name="redeemproducts" component={RedeemProducts} />                
      <Stack.Screen name="giftvoucher" component={ElectronicGiftVoucher} />                
      <Stack.Screen name="trackredemption" component={TrackRedemption} />                
      <Stack.Screen name="redemptionhistory" component={RedemptionHistory} />                
    </Stack.Navigator>
  );
};

export default RedeemStack;
