import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';

const LoginScreen = ({ navigation }) => {

  const placeholderColor = colors.grey;

  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  return (
    <View style={styles.loginScreen}>
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
        <Text style={styles.forgotPassword}>{t('auth:login:forgotPassword')}</Text>
        <Text style={styles.or}>{t('auth:login:or')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('auth:login:otp')}
          placeholderTextColor={placeholderColor}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Buttons
            style={styles.button}
            label="Log In"
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
            label="New User Registration"
            variant="blackButton"
            onPress={handleLogin}
            width="100%"
          />
        </View>
        <View style={styles.footer}>
          
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  loginScreen: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.white
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
    height: 96,
    marginBottom: 30
  },
  formContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderWidth: 1,
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
    marginTop: 30
  }
})

export default LoginScreen