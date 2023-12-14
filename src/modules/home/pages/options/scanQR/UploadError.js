import {
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
import { useTranslation } from 'react-i18next';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';
import ActionPickerModal from '../../../../../components/ActionPickerModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const UploadError = () => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = React.useState(false)
  const [couponImage, setCouponImage] = React.useState(null)

  function openGallery() {
    launchCamera({
      mediaType: 'photo', quality: 0.5,
      cameraType: 'back',
      saveToPhotos: true
    }).then(result => { if (result.assets.length) { setCouponImage({ uri: result.assets[0], type: result.assets[0].type, name: result.assets[0].fileName }) } });

  }

  function openCamera() {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }).then(result => { if (result.assets.length) { setCouponImage({ uri: result.assets[0], type: result.assets[0].type, name: result.assets[0].fileName }) } });


  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.mainWrapper}>
        {showModal &&
          <ActionPickerModal onCamera={openCamera()} onGallery={openGallery()} />}
        <Pressable onPress={() => setshowModal(true)}>
          <View style={styles.imageContainer}>
            {couponImage ? <Image
              source={{ uri: couponImage.uri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            /> :
              <Image
                source={require('../../../../../assets/images/camera.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            }

          </View>
        </Pressable>
        <Buttons
          style={styles.button}
          label={t('strings:click_here_to_report_error_scan')}
          variant="blackButton"
          onPress={() => console.log('Pressed')}
          width="100%"
          height="10%"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('strings:enter_code_here')}
            placeholderTextColor={colors.grey}
          />
          <View style={styles.scanImage}>
            <Image
              source={require('../../../../../assets/images/ic_scan_code_2.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </View>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('strings:description_remarks')}
          placeholderTextColor={colors.grey}
          multiline={true}
          textAlignVertical="top"
        />
        <Buttons
          style={styles.button}
          label={t('strings:submit')}
          variant="filled"
          onPress={() => console.log('Pressed')}
          width="100%"
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
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
    height: responsiveHeight(15),
    width: responsiveHeight(15),
  },
  inputContainer: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    height: responsiveHeight(5),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '90%',
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
  },
  descriptionInput: {
    width: '100%',
    height: responsiveHeight(15),
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
  },
  scanImage: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    marginRight: 5,
  },
});

export default UploadError;
