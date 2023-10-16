import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {View, Dimensions, Text, Button, Icon} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../../colors';
import {height, width} from '../../../utils/dimensions';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';
import BottomTabBar from '../../../components/BottomTabBar';
import HomeScreen from '../../home/pages/HomeScreen';
import ContactPage from '../../contact/pages/ContactPage';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.yellow,
        },
        headerTitleStyle: {
          color: colors.black,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
       
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
       
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        
      />
      <Tab.Screen
        name="Contact Us"
        component={ContactPage}
       
      />

      <Tab.Screen
        name="Logout"
        component={Profile}
       
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
