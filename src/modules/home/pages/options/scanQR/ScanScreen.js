import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import Buttons from '../../../../../components/Buttons'
import { useTranslation } from 'react-i18next';
import cameraIcon from '../../../../../assets/images/ic_scan_code_camera.webp';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp'


const ScanScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../../../assets/images/ic_scan_code_2.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain" />
        </View>
        <Buttons
          style={styles.button}
          label={t('dashboard:scan:buttonText')}
          variant="blackButton"
          onPress={() => console.log('Pressed')}
          width="100%"
          iconHeight={30}
          iconWidth={30}
          iconGap={30}
          icon={cameraIcon}
        />
        <Text style={styles.text}>{t('auth:login:or')}</Text>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>
              {t('dashboard:scan:enterCode')}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('dashboard:scan:enterInput')}
              placeholderTextColor={colors.grey}
              textAlign="center"
            />
          </View>
        </View>
        <Buttons
          style={styles.button}
          label={t('dashboard:scan:proceed')}
          variant="filled"
          onPress={() => console.log('Pressed')}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
        <View style={styles.rightText}>
          <Text style={styles.smallText}>{t('dashboard:scan:uniqueHistory')}</Text>
          <TouchableOpacity style={styles.scanImage} onPress={() => navigation.navigate('uniqueCodeHistory')}>
            <Image style={{ width: 30, height: 30 }} source={require('../../../../../assets/images/ic_circle_right_arrow_yellow.webp')} />
          </TouchableOpacity>
        </View>
        <Buttons
          style={styles.button}
          label={t('dashboard:scan:scanningError')}
          variant="blackButton"
          onPress={() => navigation.navigate('uploadError')}
          width="100%"
        />
        <NeedHelp />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.white
  },
  mainWrapper: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '100%',
    gap: 10
  },
  header: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2)
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    height: responsiveHeight(20),
    width: responsiveHeight(20),
  },
  text: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold'
  },
  smallText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold'
  },
  enterCode: {
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(10),
    display: 'flex',
    flexDirection: 'column'
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: responsiveHeight(5),
    flexGrow: 1
  },
  bottomContainer: {
    flexGrow: 1,
    height: responsiveHeight(5),
  },
  input: {
    padding: 10,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: colors.black,
    fontWeight: 'bold'
  },
  rightText: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default ScanScreen