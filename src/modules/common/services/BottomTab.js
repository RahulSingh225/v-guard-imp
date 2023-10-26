import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';
import BottomTabBar from '../../../components/BottomTabBar';
import HomeStack from '../../home/stack/HomeStack';
import ContactPage from '../../contact/pages/ContactPage';
import colors from '../../../../colors';
import ProfileStack from '../../profile/stack/ProfileStack';

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
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
      />
      <Tab.Screen
        name="Support"
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
