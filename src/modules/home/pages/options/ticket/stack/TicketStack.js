import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicketHistory from '../TicketHistory';
import Ticket from '../Ticket';

const TicketStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ticketScreen" component={Ticket} />         
      <Stack.Screen name="ticketHistory" component={TicketHistory} />         
    </Stack.Navigator>
  );
};

export default TicketStack;
