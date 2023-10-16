import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Dimensions, Text, Button, } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../../../colors';
import { height, width } from '../../../utils/dimensions';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';
import BottomTabBar from '../../../components/BottomTabBar';
import HomePage from '../../home/pages/HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from '../../home/stack/HomeStack';
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
        component={HomeStack}

      />
      <Tab.Screen
        name="Notification"
        component={Notification}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="bell" size={size} color={colors.yellow} />
      //   ),
      // }}

      />

      {/* <Tab.Screen
        name="Home"
        component={HomePage}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="home" size={size} color={color} />
      //   ),
      // }}

      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="user" size={size} color={color} />
      //   ),
      // }}

      />
      <Tab.Screen
        name="Support"
        component={ContactPage}

      />

      <Tab.Screen
        name="Logout"
        component={Profile}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="sign-out" size={size} color={color} />
      //   ),
      // }}

      />
    </Tab.Navigator>
  );
};
export default BottomTab;
