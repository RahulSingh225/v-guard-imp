import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../../../../../colors';
import {useTranslation} from 'react-i18next';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NeedHelp from '../../../../../components/NeedHelp';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const RedeemPoints = ({navigation}) => {
  const {t} = useTranslation();
  const [pointsBalance, setPointsBalance] = useState('');
  const [redeemedPoints, setRedeemedPoints] = useState('');
  const [numberOfScan, setNumberOfScan] = useState('');
  const [pointData, setPointData] = useState({
    pointsBalance: '',
    redeemedPoints: '',
    numberOfScan: '',
  });
  useEffect(() => {
    AsyncStorage.getItem('USER').then(r => {
      const user = JSON.parse(r);
      const data = {
        pointsBalance: user.pointsSummary.pointsBalance,
        redeemedPoints: user.pointsSummary.redeemedPoints,
        numberOfScan: user.pointsSummary.numberOfScan,
      };
      setPointData(data);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.points}>
          <View style={styles.leftPoint}>
            <Text style={styles.greyText}>{t('strings:points_balance')}</Text>

            <Text style={styles.point}>{pointData.pointsBalance}</Text>
          </View>
          <View style={styles.middlePoint}>
            <Text style={styles.greyText}>{t('strings:points_redeemed')}</Text>
            <Text style={styles.point}>
              {pointData.redeemedPoints ? pointData.redeemedPoints : 0}
            </Text>
          </View>
          <View style={styles.rightPoint}>
            <Text style={styles.greyText}>{t('strings:number_of_scans')}</Text>
            <Text style={styles.point}>{pointData.numberOfScan}</Text>

          </View>
        </View>
        <View style={styles.dashboard}>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:bank_transfer"
              iconSource={require('../../../../../assets/images/ic_bank_transfer.webp')}
              screenName="banktransfer"
            />
            <CustomTouchableOption
              text="strings:paytm_transfer"
              iconSource={require('../../../../../assets/images/ic_paytm_transfer.webp')}
              screenName="paytmtransfer"
            />
            <CustomTouchableOption
              text="strings:redeem_products"
              iconSource={require('../../../../../assets/images/ic_redeem_products.webp')}
              screenName="redeemproducts"
              disabled={true}
            />
          </View>
          <View style={styles.row}>
            <CustomTouchableOption
              text="strings:e_gift_cards"
              iconSource={require('../../../../../assets/images/ic_egift_cards.webp')}
              screenName="giftvoucher"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:track_your_redemption"
              iconSource={require('../../../../../assets/images/ic_track_your_redemption.webp')}
              screenName="trackredemption"
              disabled={true}
            />
            <CustomTouchableOption
              text="strings:redemption_history"
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
    backgroundColor: colors.white,
  },
  mainWrapper: {
    padding: 15,
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
    borderRadius: 100,
  },
  textDetail: {
    color: colors.black,
    fontWeight: 'bold',
  },
  points: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 30,
  },
  leftPoint: {
    width: responsiveWidth(30),
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
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
    marginTop: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
  },
});

export default RedeemPoints;
