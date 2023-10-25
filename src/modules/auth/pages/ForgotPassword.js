import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Popup from '../../../components/Popup';

const ForgotPassword = ({ navigation }) => {
  const { t } = useTranslation();
  const placeholderColor = colors.grey;
  const [number, setNumber] = useState('');

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const handleSubmit = () => {
    const message = 'Password has been sent through SMS to the mobile number ' + number;
    setPopupContent(message);
    setPopupVisible(true);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.forgotPasswordScreen}>
        <View style={styles.mainWrapper}>
          <Image
            source={require('../../../assets/images/group_907.png')}
            style={styles.imageSaathi}
          />
          <Text style={styles.mainHeader}>{t('auth:forgot:heading')}</Text>
          <Text style={styles.textHeader}>{t('auth:forgot:subHeading')}</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('auth:forgot:input')}
              placeholderTextColor={placeholderColor}
              value={number}
              onChangeText={(text) => setNumber(text)}
            />
            <View style={styles.buttonContainer}>
              <Buttons
                label={t('auth:forgot:submit')}
                variant="filled"
                onPress={handleSubmit}
                width="100%"
                iconHeight={10}
                iconWidth={30}
                iconGap={30}
                icon={arrowIcon}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <Text style={styles.footergreyText}>{t('auth:login:poweredBy')}</Text>
            <Image
              source={require('../../../assets/images/group_910.png')}
              style={styles.imageVguard}
            />
          </View>
        </View>
      </View>
      {isPopupVisible && (
      <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}>
        {popupContent}
      </Popup>
    )}
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  forgotPasswordScreen: {
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
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
    marginTop: responsiveHeight(2)
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
  buttonContainer: {
    marginTop: responsiveHeight(10)
  }
})

export default ForgotPassword
