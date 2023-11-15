import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Notification from '../../notifications/pages/Notification';
import Profile from '../../profile/pages/Profile';
import BottomTabBar from '../../../components/BottomTabBar';
import HomeStack from '../../home/stack/HomeStack';
import ContactPage from '../../contact/pages/ContactPage';
import colors from '../../../../colors';
import ProfileStack from '../../profile/stack/ProfileStack';
import LogoutConfirmationPopup from '../../../components/LogoutConfirmationPopup';
import { useAuth } from '../../../components/AuthContext'
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '../../../components/LanguagePicker';

const BottomTab = () => {
  const { t, i18n } = useTranslation();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleLanguageButtonPress = () => {
    setShowLanguagePicker(true);
  };

  const handleCloseLanguagePicker = () => {
    setShowLanguagePicker(false);
  };

  useEffect(() => {
    // Re-render the component when the language changes
    console.log('Language changed:', i18n.language);
  }, [i18n.language]);
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
      <TouchableOpacity style = {styles.languageContainer} onPress={handleLanguageButtonPress}>
        <Text style = {{color: colors.black}}>{t('strings:language')}</Text>
        <Image style={{ width: 15, height: 15, marginLeft: 5}} source={require('../../../assets/images/down_yellow_arrow.png')} />
      </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/images/group_910.png')}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLanguagePicker}
        onRequestClose={handleCloseLanguagePicker}
        style={styles.modal}
      >
        <View style={styles.languagePickerContainer}>
          <LanguagePicker />
          <TouchableOpacity onPress={handleCloseLanguagePicker}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  },
  languagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  closeText: {
    marginTop: 20,
    color: colors.black,
  },
})

export default BottomTab;
