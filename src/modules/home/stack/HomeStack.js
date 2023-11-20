import React from 'react';
import HomePage from '../pages/HomePage';
import HomeScreen from '../pages/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateKYC from '../pages/options/updateKyc/UpdateKYC';
import Welfare from '../pages/options/welfare/Welfare';
import New from '../pages/options/new/New';
import Bank from '../../home/pages/options/bank/Bank';
import TDS from '../pages/options/TDS/TDS';
import Engagement from '../pages/options/engagement/Engagement';
import Manual from '../pages/options/manual/Manual';
import ScanStack from '../pages/options/scanQR/stack/ScanStack';
import RedeemStack from '../pages/options/redeemPoints/stack/RedeemStack';
import DashboardStack from '../pages/options/dashboard/stack/DashboardStack';
import TicketStack from '../pages/options/ticket/stack/TicketStack';
import SchemesStack from '../pages/options/schemes/stack/SchemesStack';
import InfoStack from '../pages/options/info/stack/InfoStack';
import NewStack from '../pages/options/new/stack/NewStack';
import ProductWiseOfferTable from '../pages/options/schemes/ProductWiseOfferTable';
import EditProfile from '../../profile/pages/EditProfile';
import ProfileStack from '../../profile/stack/ProfileStack';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="scanscreen" component={ScanStack} />      
      <Stack.Screen name="dashboard" component={DashboardStack} />      
      <Stack.Screen name="redeemscreen" component={RedeemStack} />      
      <Stack.Screen name="updateKyc" component={UpdateKYC} />      
      <Stack.Screen name="schemes" component={SchemesStack} />      
      <Stack.Screen name="info" component={InfoStack} />      
      <Stack.Screen name="welfare" component={Welfare} />      
      <Stack.Screen name="new" component={NewStack} />      
      <Stack.Screen name="ticket" component={TicketStack} />      
      <Stack.Screen name="bank" component={Bank} />      
      <Stack.Screen name="TDS" component={TDS} />      
      <Stack.Screen name="engagement" component={Engagement} />      
      <Stack.Screen name="manual" component={Manual} />      
      <Stack.Screen name="ProductWiseOfferTable" component={ProductWiseOfferTable} />  
      <Stack.Screen name="profile" component={ProfileStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
