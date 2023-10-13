import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {View, Dimensions, Text, Button, Icon} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../../colors';
import {height, width} from '../../../utils/dimensions';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            // #353935
            backgroundColor: '#ffffff',
            borderRadius: 0,
            // height:height*0.10,
            width: width,
            height: height * 0.05,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',

            position: 'relative',
            margin: 0,
          },
          null,
        ],
        headerShown: false,
      }}>
      <Tab.Screen
        name="NotificationStack"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'white',
                      alignItems: 'center',
                      height: 42,
                      width: width / 4,
                      borderRadius: 15,
                      justifyContent: 'center',
                      fontfamily: 'Poppins-Regular',
                    }
                  : {alignItems: 'center', justifyContent: 'center'}
              }>
              <Text
                style={{
                  fontSize: RFPercentage(1.6),
                  fontFamily: 'Poppins-Regular',
                  color: focused ? colors.secondaryColor : colors.primaryColor,
                }}>
                Locate Shop
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'white',
                      alignItems: 'center',
                      height: 42,
                      width: Dimensions.get('screen').width / 4,
                      borderRadius: 15,
                      justifyContent: 'center',
                    }
                  : {alignItems: 'center', justifyContent: 'center'}
              }>
              <Text
                style={{
                  fontSize: RFPercentage(1.6),
                  fontFamily: 'Poppins-Regular',
                  color: focused ? colors.secondaryColor : colors.primaryColor,
                }}>
                Kyc
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SupportStack"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'white',
                      alignItems: 'center',
                      height: 42,

                      width: Dimensions.get('screen').width / 4,
                      borderRadius: 15,
                      justifyContent: 'center',
                    }
                  : {alignItems: 'center', justifyContent: 'center'}
              }>
              <Text
                style={{
                  fontSize: RFPercentage(1.6),
                  fontFamily: 'Poppins-Regular',
                  color: focused ? colors.secondaryColor : colors.primaryColor,
                }}>
                Comments
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'white',
                      alignItems: 'center',
                      height: 42,

                      width: Dimensions.get('screen').width / 4,
                      borderRadius: 15,
                      justifyContent: 'center',
                      color: 'black',
                    }
                  : {alignItems: 'center', justifyContent: 'center'}
              }>
              <Text
                style={{
                  fontSize: RFPercentage(1.6),
                  fontFamily: 'Poppins-Regular',
                  color: focused ? colors.secondaryColor : colors.primaryColor,
                  backgroundColor: 'transparent',
                }}>
                More
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
