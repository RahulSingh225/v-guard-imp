import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useState } from 'react';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';
import BottomTabBar from '../../../components/BottomTabBar';
import HomeStack from '../../home/stack/HomeStack';
import ContactPage from '../../contact/pages/ContactPage';
import colors from '../../../../colors';
import ProfileStack from '../../profile/stack/ProfileStack';
import LogoutConfirmationPopup from '../../../components/LogoutConfirmationPopup';
import { useAuth } from '../../../components/AuthContext'
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const [isLogoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const { logout } = useAuth();

  const showLogoutPopup = () => {
    setLogoutPopupVisible(true);
  };

  const hideLogoutPopup = () => {
    setLogoutPopupVisible(false);
  };

  const confirmLogout = () => {
    logout();
    hideLogoutPopup();
  };

  const CustomTabHeader = ({ route }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <View style={{flexDirection: 'row', gap: 10}}>
      <Text style={{color: colors.black, fontSize: responsiveFontSize(2.5), fontWeight: 'bold'}}>{route.name}</Text>
      <View style = {styles.languageContainer}>
        <Text style = {{color: colors.black}}>English</Text>
        <Image style={{ width: 15, height: 15, marginLeft: 5}} source={require('../../../assets/images/down_yellow_arrow.png')} />
      </View>
      </View>
      <Image
        source={require('../../../assets/images/group_910.png')} // Replace with the path to your image
        style={{ width: 83, height: 30, marginLeft: 10 }}
      />
    </View>
  );

  return (
    <>
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
        <Tab.Screen name="Home" component={HomeStack} options={({ route }) => ({
          headerTitle: () => <CustomTabHeader route={route} />,
        })} />
        <Tab.Screen name="Notification" component={Notification} options={({ route }) => ({
    headerTitle: () => <CustomTabHeader route={route} />,
  })} />
        <Tab.Screen name="Profile" component={ProfileStack} options={({ route }) => ({
    headerTitle: () => <CustomTabHeader route={route} />,
  })} />
        <Tab.Screen name="Support" component={ContactPage} options={({ route }) => ({
    headerTitle: () => <CustomTabHeader route={route} />,
  })} />
        <Tab.Screen name="Logout" listeners={{ tabPress: showLogoutPopup }} component={({ route }) => {
          return route.state ? route.state.routes[route.state.index].route.params.getComponent() : null;
        }} />
      </Tab.Navigator>

      <LogoutConfirmationPopup
        isVisible={isLogoutPopupVisible}
        onConfirm={confirmLogout}
        onClose={hideLogoutPopup}
      />
    </>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default BottomTab;
