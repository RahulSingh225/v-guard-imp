import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import colors from '../../../../colors';
import { useTranslation } from 'react-i18next';
import AuthNavigator from '../../auth/stack/AuthNavigator';
import CustomTouchableOption from '../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import NeedHelp from '../../../components/NeedHelp';


const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const point = 100;
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState('');
  const [pointsBalance, setPointsBalance] = useState('');
  const [redeemedPoints, setRedeemedPoints] = useState('');
  const [numberOfScan, setNumberOfScan] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('name').then((name) => {
      setUserName(name);
    });
    AsyncStorage.getItem('userCode').then((code) => {
      setUserCode(code);
    });
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}></View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userName}</Text>
            <Text style={styles.textDetail}>{userCode}</Text>
            <Text style={styles.viewProfile}>View Profile</Text>
          </View>
        </View>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('dashboard:points:balance')}</Text>
            <Text style={styles.point}>{pointsBalance}</Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.greyText}>{t('dashboard:points:redeemed')}</Text>
            <Text style={styles.point}>{redeemedPoints}</Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('dashboard:points:scans')}</Text>
            <Text style={styles.point}>{numberOfScan}</Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:options:scan"
              iconSource={require('../../../assets/images/ic_scan_code.png')}
              screenName="scanscreen"
            />
            <CustomTouchableOption
              text="dashboard:options:redeem"
              iconSource={require('../../../assets/images/ic_redeem_points.webp')}
              screenName="redeemscreen"
            />
            <CustomTouchableOption
              text="dashboard:options:dashboard"
              iconSource={require('../../../assets/images/ic_dashboard.webp')}
              screenName="dashboard"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:options:updateKyc"
              iconSource={require('../../../assets/images/ic_update_kyc.webp')}
              screenName="updateKyc"
            />
            <CustomTouchableOption
              text="dashboard:options:schemes"
              iconSource={require('../../../assets/images/ic_scheme_offers.png')}
              screenName="schemes"
            />
            <CustomTouchableOption
              text="dashboard:options:info"
              iconSource={require('../../../assets/images/ic_vguard_info.webp')}
              screenName="info"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:options:welfare"
              iconSource={require('../../../assets/images/ic_welfare.webp')}
              screenName="welfare"
            />
            <CustomTouchableOption
              text="dashboard:options:new"
              iconSource={require('../../../assets/images/ic_whats_new.webp')}
              screenName="new"
            />
            <CustomTouchableOption
              text="dashboard:options:ticket"
              iconSource={require('../../../assets/images/ic_raise_ticket.webp')}
              screenName="ticket"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:options:bank"
              iconSource={require('../../../assets/images/ic_raise_ticket.webp')}
              screenName="bank"
            />
            <CustomTouchableOption
              text="dashboard:options:TDS"
              iconSource={require('../../../assets/images/tds_ic.png')}
              screenName="TDS"
            />
            <CustomTouchableOption
              text="dashboard:options:engagement"
              iconSource={require('../../../assets/images/elink.png')}
              screenName="engagement"
            />
          </View>
          <View style={styles.lastrow}>
            <TouchableOpacity
              style={[
                styles.oval,
              ]}
              onPress={() => Linking.openURL('https://www.vguardrishta.com/img/appImages/Instructionmanual.pdf')}
            >
              <View style={[
                styles.optionIcon,
              ]}>
                <Image
                  source={require('../../../assets/images/ic_instruction_manual.jpeg')}
                  style={[
                    { flex: 1, width: '100%', height: '100%' },
                  ]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[
                styles.nav,
              ]}>
                {t("dashboard:options:manual")}
              </Text>
            </TouchableOpacity>
            {/* <CustomTouchableOption
              text="dashboard:options:manual"
              iconSource={require('../../../assets/images/ic_instruction_manual.jpeg')}
              screenName="manual"
            /> */}
          </View>
        </View>
        <NeedHelp />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.white
  },
  mainWrapper: {
    padding: 15
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    fontSize: responsiveFontSize(1.7),
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7),
  },
  ImageProfile: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 100
  },
  textDetail: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7)
  },
  points: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 30
  },
  leftPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPoint: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
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
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    marginTop: 30
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around'
  },
  lastrow: {
    marginLeft: 5
  },
  oval: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(18),
    width: responsiveWidth(25),
    maxWidth: responsiveWidth(25),
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 100,
  },
  optionIcon: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    marginBottom: 20,
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default HomeScreen;
