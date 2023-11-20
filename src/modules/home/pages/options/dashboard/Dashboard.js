import React, {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useTranslation} from 'react-i18next';
import NeedHelp from '../../../../../components/NeedHelp';
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import { getFile } from '../../../../../utils/apiservice';

const Dashboard = () => {
  const baseURL = 'https://www.vguardrishta.com/img/appImages/Profile/';

  const {t} = useTranslation();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const [userData, setUserData] = useState({
    userName: '',
    userCode: '',
    pointsBalance: '',
    redeemedPoints: '',
    userImage: '',
    userRole: ''
  });

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  useEffect(() => {
    AsyncStorage.getItem('USER').then(r => {
      const user = JSON.parse(r);
      console.log(user);
      const data = {
        userName: user.name,
        userCode: user.userCode,
        pointsBalance: user.pointsSummary.pointsBalance,
        redeemedPoints: user.pointsSummary.redeemedPoints,
        userImage: user.kycDetails.selfie,
        userRole: user.professionId      
      };
      setUserData(data);
    });
  }, []);
  
  useEffect(() => {
    console.log("<><><><><><")
    if (userData.userRole && userData.userImage) {
      
      const getImage = async () => {
        try {
          const profileImage = await getFile(userData.userImage, 'PROFILE', userData.userRole);
          setProfileImage(profileImage.url);
        } catch (error) {
          console.log('Error while fetching profile image:', error);
        }
      };
  
      getImage();
    }
  }, [userData.userRole, userData.userImage]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.profileDetails}>
        <View style={styles.ImageProfile}>
          <Image
            source={{uri: profileImage}}
            style={{width: '100%', height: '100%', borderRadius: 100}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.textDetail}>{userData.userName}</Text>
          <Text style={styles.textDetail}>{userData.userCode}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <SafeAreaView style={styles.datepicker}>
          <Text style={styles.text}>{moment(date).format('MMMM YYYY')}</Text>
          <Image
            style={[{width: '6%', height: '100%'}]}
            resizeMode="contain"
            source={require('../../../../../assets/images/unfold_arrow.png')}
          />
          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              minimumDate={new Date()}
              maximumDate={new Date(2025, 5)}
              locale="en"
            />
          )}
        </SafeAreaView>
      </TouchableOpacity>

      <View style={styles.points}>
        <View style={styles.leftPoint}>
          <Text style={styles.greyText}>{t('strings:points_balance')}</Text>

          <Text style={styles.point}>{userData.pointsBalance}</Text>
        </View>
        <View style={styles.rightPoint}>
          <Text style={styles.greyText}>{t('strings:points_redeemed')}</Text>
          <Text style={styles.point}>{userData.redeemedPoints}</Text>

        </View>
      </View>

      <View style={styles.options}>
        <CustomTouchableOption
          text="strings:product_wise_earning"
          iconSource={require('../../../../../assets/images/ic_bank_transfer.webp')}
          screenName="productWiseEarning"
        />
        <CustomTouchableOption
          text="strings:scheme_wise_earning"
          iconSource={require('../../../../../assets/images/ic_paytm_transfer.webp')}
          screenName="schemeWiseEarning"
        />
        <CustomTouchableOption
          text="strings:your_rewards"
          iconSource={require('../../../../../assets/images/ic_egift_cards.webp')}
          screenName="yourRewards"
        />
      </View>

      <NeedHelp />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 15,
  },
  datepicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: responsiveHeight(2),
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    fontSize: responsiveFontSize(1.7),
  },
  points: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 30,
  },
  leftPoint: {
    width: '50%',
    height: 100,
    backgroundColor: colors.lightYellow,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  point: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: responsiveHeight(5),
  },
});

export default Dashboard;
