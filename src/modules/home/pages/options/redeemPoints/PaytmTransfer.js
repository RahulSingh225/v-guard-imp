import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../../../../../colors'
import { useTranslation } from 'react-i18next';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const PaytmTransfer = () => {
  const { t } = useTranslation();
  const handleProceed = () =>{
    console.log('Pressed')
  }
  const [pointsBalance, setPointsBalance] = useState('');
  const [redeemedPoints, setRedeemedPoints] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pointsBalance').then((pointsBalance) => {
      setPointsBalance(pointsBalance);
    });
    AsyncStorage.getItem('redeemedPoints').then((redeemedPoints) => {
      setRedeemedPoints(redeemedPoints);
    });
    AsyncStorage.getItem('numberOfScan').then((numberOfScan) => {
      setNumberOfScan(numberOfScan);
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('strings:points_balance')}</Text>
            <Text style={styles.point}>{pointsBalance}</Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('strings:points_redeemed')}</Text>
            <Text style={styles.point}>{redeemedPoints}</Text>
          </View>
        </View>
        <View style={styles.rightTextView}>
          <Text style={styles.rightText}>* 1 Point = 1 INR</Text>
        </View>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>
              {t('strings:enter_paytm_mobile_no_below')}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('strings:mobile_number')}
              placeholderTextColor={colors.grey}
              textAlign="center"
            />
          </View>
        </View>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>
              {t('strings:enter_points_to_be_redeemed')}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('strings:enter_points')}
              placeholderTextColor={colors.grey}
              textAlign="center"
            />
          </View>
        </View>
        <Text style={styles.chooseWallet}>{t('strings:choose_wallet')}</Text>
        <View style={styles.wallet}>
          <Image resizeMode="contain" style={{ flex: 1, width: '100%', height: '100%' }} source={require('../../../../../assets/images/ic_paytm_logo.webp')} />
          <Image resizeMode="contain" style={{ flex: 1, width: '100%', height: '100%' }} source={require('../../../../../assets/images/tick_1.png')} />
        </View>
        <Buttons
          style={styles.button}
          label={t('strings:proceed')}
          variant="filled"
          onPress={() => handleProceed()}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white
  },
  mainWrapper: {
    padding: 15,
  },
  points: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 30
  },
  leftPoint: {
    width: '50%',
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  rightPoint: {
    width: '50%',
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyText: {
    width: '80%',
    color: colors.grey,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    marginBottom: 10
  },
  point: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  rightText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5)
  },
  rightTextView: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 5
  },
  smallText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold'
  },
  enterCode: {
    marginTop: 20,
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    display: 'flex',
    flexDirection: 'column'
  },
  chooseWallet: {
    marginTop: 20,
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  wallet: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: 50,
    flexGrow: 1
  },
  bottomContainer: {
    flexGrow: 1,
    height: 50,
  },
  input: {
    padding: 10,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: colors.black,
    fontWeight: 'bold'
  },
})

export default PaytmTransfer