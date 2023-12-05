import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Buttons from '../../../../../components/Buttons';
import {useTranslation} from 'react-i18next';
import cameraIcon from '../../../../../assets/images/ic_scan_code_camera.webp';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';
import getLocation from '../../../../../utils/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  captureSale,
  getBonusPoints,
  sendCouponPin,
} from '../../../../../utils/apiservice';
import ScratchCard from '../../../../../components/ScratchCard';
import RewardBox from '../../../../../components/ScratchCard';
import PopupWithButton from '../../../../../components/PopupWithButton';
//import {scanQR} from 'react-native-simple-qr-reader';

const ScanScreen = ({navigation, route}) => {
  const type = null;
  const {t} = useTranslation();
  const [qrCode, setQrcode] = React.useState('');
  const [scratchCard, showScratchCard] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [PIN,setPIN] = React.useState(null)
  var USER = null;
  var scratchCardProps;
  var CouponResponse;
  var popupProps={}
  React.useEffect(() => {
    AsyncStorage.getItem('USER').then(r => {
      USER = JSON.parse(r);
    });
  }, []);

  async function scan() {
    // scanQR()
    //   .then(result => setQrcode(result))
    //   .catch(e => console.error(e));
  }

  async function sendBarcode(pin=null) {
    setPopupVisible(false)
    
    const position = await getLocation();
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    const userRoleId = user && user.roleId ? user.roleId.toString() : '';
    var apiResponse;
    var apiResponse;
    var CouponData = {
      userMobileNumber: '',
      couponCode: '',
      pin: '',
      smsText: '',
      from: '',
      userType: userRoleId,
      userId: 0,
      apmID: 0,
      retailerCoupon: false,
      userCode: '',
      isAirCooler: 0,
      latitude: '',
      longitude: '',
      geolocation: '',
      category: '',
    };

    console.log(position);
    CouponData.latitude = 99;
    CouponData.longitude = 99;

    CouponData.couponCode = qrCode;
    CouponData.from = 'APP';
    CouponData.userMobileNumber = user.mobileNo1;
    CouponData.geolocation = null;

    if (type == 'airCooler') {
      apiResponse = await isValidBarcode(CouponData, 1, '', 0, null);
      console.log(apiResponse.json());
    } else if (type == 'fan') {
      navigation.navigate('Product Registration');
    } else {
      apiResponse = await isValidBarcode(CouponData, 0, '', 0, null);

      console.log(apiResponse);
      const r = await apiResponse.json();
      console.log(r);
    }
    CouponResponse = apiResponse;
    if (apiResponse.errorCode == 1) {
      setQrcode('');
      var couponPoints = apiResponse.couponPoints;
      var basePoints = apiResponse.basePoints;
      basePoints ? (basePoints = `Base Points: ${basePoints}`) : null;

      scratchCardProps = {
        rewardImage: {
          width: 100,
          height: 100,
          resourceLocation: require('../../../../../assets/images/ic_rewards_gift.png'),
        },
        rewardResultText: {
          color: 'black',
          fontSize: 16,
          textContent: 'YOU WON',
          fontWeight: '700',
        },
        text1: {
          color: 'black',
          fontSize: 16,
          textContent: couponPoints,
          fontWeight: '700',
        },
        text2: {
          color: 'black',
          fontSize: 16,
          textContent: 'POINTS',
          fontWeight: '700',
        },
        text3: {
          color: '#9c9c9c',
          fontSize: 12,
          textContent: basePoints,
          fontWeight: '700',
        },
        button: {
          buttonColor: '#F0C300',
          buttonTextColor: 'black',
          buttonText: '',
          buttonAction: showScratchCard(false),
          fontWeight: '400',
        },
        textInput: false,
        scratchable:false
      };
      showScratchCard(true)
    
      }else if(apiResponse.errorCode ==2){
        popupProps.buttonText = 'SUBMIT',
        popupProps.children = (<TextInput onChangeText={(e) => setPIN(e)} value={PIN} style={{ borderBottomWidth: 2, borderBottomColor: 'black', textDecorationColor: 'black', width: '100%', height: 40 }} />)
        popupProps.onConfirm = sendBarcode(PIN)
        setPopupVisible(true);
      }else {
        popupProps.buttonText = 'OK',
        popupProps.children = (<Text>{CouponResponse.errorMsg}</Text>)
        popupProps.onConfirm = setPopupVisible(false)
    }
  

  }

  function checkBonusPoints(){
    showScratchCard(false);
    if(CouponResponse.transactId && CouponResponse.bitEligibleScratchCard){
      getBonusPoints().then(response=>response.json().then(result=>{
        var couponPoints = result.promotionPoints;
        scratchCardProps = {
          rewardImage: {
            width: 100,
            height: 100,
            resourceLocation: require('../../../../../assets/images/ic_rewards_gift.png'),
          },
          rewardResultText: {
            color: 'black',
            fontSize: 16,
            textContent: result.errorMsg,
            fontWeight: '700',
          },
          text1: {
            color: 'black',
            fontSize: 16,
            textContent: couponPoints,
            fontWeight: '700',
          },
          text2: {
            color: 'black',
            fontSize: 16,
            textContent: 'POINTS',
            fontWeight: '700',
          },
          text3: {
            color: '#9c9c9c',
            fontSize: 12,
            textContent: "",
            fontWeight: '700',
          },
          button: {
            buttonColor: '#F0C300',
            buttonTextColor: 'black',
            buttonText: '',
            buttonAction: showScratchCard(false),
            fontWeight: '400',
          },
          textInput: false,
          scratchable:true
        };

      }))
      showScratchCard(true)
    }
  
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        {scratchCard && (
          <RewardBox
            scratchCardProps={scratchCardProps}
            visible={scratchCard}
            scratchable={scratchCardProps.scratchable}
            onClose={checkBonusPoints}
          />
        )}
        {popupVisible&&
        <PopupWithButton isVisible={popupVisible} buttonText={popupProps.buttonText} children={popupProps.children} onConfirm={popupProps.onConfirm}/>}

        <Pressable onPress={() => scan()} style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/ic_scan_code_2.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </Pressable>
        <Buttons
          style={styles.button}
          label={t('strings:click_here_to_scan_a_unique_code')}
          variant="blackButton"
          onPress={() => scan()}
          width="100%"
          iconHeight={30}
          iconWidth={30}
          iconGap={30}
          icon={cameraIcon}
        />
        <Text style={styles.text}>{t('strings:or')}</Text>
        <View style={styles.enterCode}>
          <View style={styles.topContainer}>
            <Text style={styles.smallText}>{t('strings:enter_code')}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              onChangeText={e => setQrcode(e)}
              maxLength={16}
              value={qrCode}
              style={styles.input}
              placeholder={t('strings:enter_code_here')}
              placeholderTextColor={colors.grey}
              textAlign="center"
              onSubmitEditing={async () => await sendBarcode()}
            />
          </View>
        </View>
        <Buttons
          style={styles.button}
          label={t('strings:proceed')}
          variant="filled"
          onPress={async () => await sendBarcode()}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Unique Code History')}>
          <View style={styles.rightText}>
            <Text style={styles.smallText}>
              {t('strings:go_to_unique_code_history')}
            </Text>
            <View style={styles.scanImage}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../../../../assets/images/ic_circle_right_arrow_yellow.webp')}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Buttons
          style={styles.button}
          label={t('strings:upload_scan_error_')}
          variant="blackButton"
          onPress={() => navigation.navigate('Upload Scanning Error')}
          width="100%"
        />
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
    alignItems: 'center',
    backgroundColor: colors.white,
    height: '100%',
    gap: 10,
  },
  header: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    height: responsiveHeight(20),
  },
  text: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  smallText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  enterCode: {
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(10),
    display: 'flex',
    flexDirection: 'column',
  },
  topContainer: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    padding: 10,
    height: responsiveHeight(5),
    flexGrow: 1,
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
    fontWeight: 'bold',
  },
  rightText: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

async function isValidBarcode(
  CouponData,
  isAirCooler,
  pinFourDigit,
  isPinRequired,
  dealerCategory,
) {
  var result = null;
  CouponData.isAirCooler = isAirCooler;
  if (dealerCategory) {
    CouponData.dealerCategory = dealerCategory;
  }
  if (pinFourDigit == '') {
    result = await captureSale(CouponData);
    console.log(CouponData);
    return result;
  } else {
    CouponData.pin = pinFourDigit;
    result = await sendCouponPin(CouponData);
    return result;
  }
}

export default ScanScreen;
