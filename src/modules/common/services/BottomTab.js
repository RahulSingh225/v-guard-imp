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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Support" component={ContactPage} />
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

export default BottomTab;
