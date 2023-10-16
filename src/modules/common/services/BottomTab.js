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

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={props => <BottomTabBar {...props} />}>
      {/* // screenOptions={{
      //   tabBarShowLabel: false,
      //   tabBarHideOnKeyboard: true,
      //   tabBarStyle: [
      //     {
      //       // #353935
      //       backgroundColor: '#ffffff',
      //       borderRadius: 0,
      //       // height:height*0.10,
      //       width: width,
      //       height: height * 0.05,
      //       alignContent: 'center',
      //       alignItems: 'center',
      //       alignSelf: 'center',

      //       position: 'relative',
      //       margin: 0,
      //     },
      //     null,
      //   ],
      //   headerShown: false,
      // }}> */}
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
        name="Support"
        component={Profile}
       
      />

      <Tab.Screen
        name="Logout"
        component={Profile}
       
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
