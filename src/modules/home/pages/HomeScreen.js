import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../../../../colors';
import { useTranslation } from 'react-i18next';
import AuthNavigator from '../../auth/stack/AuthNavigator';
import CustomTouchableOption from '../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";


const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const point = 100;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}></View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>Test User</Text>
            <Text style={styles.textDetail}>XXXXX</Text>
            <Text style={styles.viewProfile}>View Profile</Text>
          </View>
        </View>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('dashboard:points:balance')}</Text>
            <Text style={styles.point}>{point}</Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.greyText}>{t('dashboard:points:redeemed')}</Text>
            <Text style={styles.point}>{point}</Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('dashboard:points:scans')}</Text>
            <Text style={styles.point}>{point}</Text>
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
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:options:manual"
              iconSource={require('../../../assets/images/ic_instruction_manual.jpeg')}
              screenName="manual"
            />
          </View>
        </View>
        <View style={styles.contact}>
          <Text style={styles.textHeader}>
            {t('dashboard:help:header')}
          </Text>
          <View style={styles.helpContainer}>
            <Image
              source={require('../../../assets/images/ic_phone_call_2.png')}
              style={styles.icon}
            />
            <Text style={styles.textHelp}>
              9717500011
            </Text>
          </View>
          <View style={styles.helpContainer}>
            <Image
              source={require('../../../assets/images/ic_email.png')}
              style={styles.icon}
            />
            <Text style={styles.textHelp}>
            info@vguardrishta.com
            </Text>
          </View>
          <View style={styles.helpContainer}>
            <Image
              source={require('../../../assets/images/ic_whatsapp.webp')}
              style={styles.icon}
            />
            <Text style={styles.textHelp}>
            9818900011
            </Text>
          </View>
        </View>
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
    fontWeight: 'bold'
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
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  middlePoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPoint: {
    width: responsiveWidth(30),
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
  textHeader: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: responsiveFontSize(2.5)
  },
  helpContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 10
  },
  icon: {
    height: 20,
    width: 20,
  },
  textHelp: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    color: colors.black
  }
})

export default HomeScreen;
