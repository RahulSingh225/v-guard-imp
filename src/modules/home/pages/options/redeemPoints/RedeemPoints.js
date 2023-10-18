import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../../../../../../colors';
import { useTranslation } from 'react-i18next';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";
import NeedHelp from '../../../../../components/NeedHelp';


const RedeemPoints = ({ navigation }) => {
  const { t } = useTranslation();
  const point = 100;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
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
              text="dashboard:redeem:instantTransfer"
              iconSource={require('../../../../../assets/images/ic_bank_transfer.webp')}
              screenName="banktransfer"
            />
            <CustomTouchableOption
              text="dashboard:redeem:paytmTransfer"
              iconSource={require('../../../../../assets/images/ic_paytm_transfer.webp')}
              screenName="paytmtransfer"
            />
            <CustomTouchableOption
              text="dashboard:redeem:redeemProducts"
              iconSource={require('../../../../../assets/images/ic_redeem_products.webp')}
              screenName="redeemproducts"
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="dashboard:redeem:electronicGift"
              iconSource={require('../../../../../assets/images/ic_egift_cards.webp')}
              screenName="giftvoucher"
            />
            <CustomTouchableOption
              text="dashboard:redeem:trackRedemption"
              iconSource={require('../../../../../assets/images/ic_track_your_redemption.webp')}
              screenName="trackredemption"
            />
            <CustomTouchableOption
              text="dashboard:redeem:redemptionHistory"
              iconSource={require('../../../../../assets/images/ic_redemption_history.webp')}
              screenName="redemptionhistory"
            />
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
  }
})

export default RedeemPoints;
