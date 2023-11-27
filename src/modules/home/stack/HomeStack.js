import React from 'react';
import HomeScreen from '../pages/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateKYC from '../pages/options/updateKyc/UpdateKYC';
import Welfare from '../pages/options/welfare/Welfare';
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
import ProfileStack from '../../profile/stack/ProfileStack';
import colors from '../../../../colors';
import { CustomTabHeader } from '../../common/services/BottomTab';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.yellow
          },
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen}
          options={({ route }) => ({
            headerTitle: () => <CustomTabHeader route={route} />,
            headerShown: true
          })}
        />
        <Stack.Screen name="Scan QR" component={ScanStack}/>
        <Stack.Screen name="Dashboard" component={DashboardStack}/>
        <Stack.Screen name="Redeem Products" component={RedeemStack}/>
        <Stack.Screen name="Update KYC" component={UpdateKYC} 
        options={{
          headerShown: true
        }}/>
        <Stack.Screen name="schemes" component={SchemesStack}/>
        <Stack.Screen name="info" component={InfoStack}/>
        <Stack.Screen name="Welfare" component={Welfare}
          options={{
          headerShown: true
        }}
        />
        <Stack.Screen name="new" component={NewStack}/>
        <Stack.Screen name="ticket" component={TicketStack}/>
        <Stack.Screen name="Update Bank" component={Bank}
          options={{
          headerShown: true
        }}
        />
        <Stack.Screen name="TDS Certificate" component={TDS}
          options={{
          headerShown: true
        }}
        />
        <Stack.Screen name="Engagement" component={Engagement}
          options={{
          headerShown: true
        }}
        />
        <Stack.Screen name="Manual" component={Manual}
          options={{
          headerShown: true
        }}
        />
        <Stack.Screen name="Profile" component={ProfileStack} 
          options={{
          headerShown: true
        }}
        />
      </Stack.Navigator>

    </>
  );
};

export default HomeStack;
