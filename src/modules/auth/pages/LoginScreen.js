import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { loginWithPassword } from '../AuthApiService';
import { useAuth } from '../../../components/AuthContext';
import Popup from '../../../components/Popup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const yellow = colors.yellow;
  const { t } = useTranslation();
  const placeholderColor = colors.grey;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  
const handleLogin = async () => {
  try {
    const response = await loginWithPassword(username, password);
    console.log("response=====", response)
    if (response.status === 200) {
      console.log(response.mobileNo);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      login();
    } else {
      togglePopup();
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.loginScreen}>
        <View style={styles.mainWrapper}>
          <Image
            source={require('../../../assets/images/group_907.png')}
            style={styles.imageSaathi}
          />
          <Text style={styles.mainHeader}>{t('auth:login:heading')}</Text>
          <Text style={styles.textHeader}>{t('auth:login:label')}</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('auth:login:login')}
              placeholderTextColor={placeholderColor}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder={t('auth:login:password')}
              placeholderTextColor={placeholderColor}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.updateAndForgot}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update KYC</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.forgotPassword}>{t('auth:login:forgotPassword')}</Text>
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.or}>{t('auth:login:or')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth:login:otp')}
              placeholderTextColor={placeholderColor}
              value={otp}
              onChangeText={(text) => setOtp(text)}
            /> */}
            <View style={styles.buttonContainer}>
              <Buttons
                style={styles.button}
                label={t('auth:login:loginButton')}
                variant="filled"
                onPress={handleLogin}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
              <Buttons
                style={styles.button}
                label={t('auth:login:withotp')}
                variant="filled"
                onPress={() => navigation.navigate('loginWithNumber')}
                width="100%"
              />
              <Buttons
                style={styles.button}
                label={t('auth:login:registration')}
                variant="blackButton"
                onPress={() => navigation.navigate('register')}
                width="100%"
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerTextContainer}>
            <Image
              source={require('../../../assets/images/tick_1.png')}
              style={styles.tick}
            />
            <Text style={styles.footerText}>{t('auth:login:approval')}</Text>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footergreyText}>{t('auth:login:poweredBy')}</Text>
            <Image
              source={require('../../../assets/images/group_910.png')}
              style={styles.imageVguard}
            />
          </View>
        </View>
        {isPopupVisible && (
          <Popup isVisible={isPopupVisible} onClose={togglePopup}>
            <Text style={{ fontWeight: 'bold' }}>Incorrect Username or Password</Text>
          </Popup>
        )}
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  loginScreen: {
    height: '100%',
    backgroundColor: colors.white,
    display: 'flex',
  },
  mainWrapper: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  textHeader: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: 'bold'
  },
  mainHeader: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  imageSaathi: {
    width: 100,
    height: 98,
    marginBottom: 30
  },
  imageVguard: {
    width: 100,
    height: 36,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 16,
    flex: 2,
  },
  input: {
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: colors.black,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
  },
  forgotPassword: {
    color: colors.grey,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 20
  },
  or: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20
  },
  buttonContainer: {
    gap: 20,

  },
  footer: {
  },
  footerText: {
    textAlign: 'left',
    fontSize: 10,
    color: colors.black,
  },
  footerTextContainer: {
    paddingBottom: 5,
    paddingHorizontal: 80,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tick: {
    height: 15,
    width: 15
  },
  footergreyText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.grey,
    paddingBottom: 5,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
    width: '100%',
    paddingVertical: 10
  },
  updateAndForgot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: 'bold'
  },
})

export default LoginScreen
