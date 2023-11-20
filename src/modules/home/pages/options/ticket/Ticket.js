import { View, Text, StyleSheet, TouchableHighlight, Modal, Image, Button, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from '../../../../../../colors';
import NeedHelp from '../../../../../components/NeedHelp';
import Buttons from '../../../../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { createTicket, fetchTicketOptions } from '../../HomeApiService';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { sendFile } from '../../../../../utils/apiservice';
import Snackbar from 'react-native-snackbar';



const Ticket = ({ navigation }) => {

  const baseURL = 'https://www.vguardrishta.com/img/appImages/Profile/';

  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userCode, setUserCode] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userImage, setUserImage] = useState('');
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [entityUid, setEntityUid] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");


  const handleImagePickerPress = () => {
    setShowImagePickerModal(true);
  };


  const handleCameraUpload = () => {
    console.log("happening")
    setShowImagePickerModal(false);
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        console.log("working ");
        console.log("response========", response)
        if (response.didCancel) {
          console.log('Camera was canceled');
        } else if (response.error) {
          console.error('Camera error: ', response.error);
        } else {
          const fileData = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          setSelectedImage(response.assets[0].uri);
          setSelectedImageName(response.assets[0].fileName);
          triggerApiWithImage(fileData);
        }
      }
    );
  };

  const handleGalleryUpload = () => {
    setShowImagePickerModal(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Image picker was canceled');
        } else if (response.error) {
          console.error('Image picker error: ', response.error);
        } else {
          const fileData = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          setSelectedImage(response.assets[0].uri);
          setSelectedImageName(response.assets[0].fileName);
          triggerApiWithImage(fileData);
        }
      }
    );
  };

  const triggerApiWithImage = async (fileData) => {
    const formData = new FormData();
    formData.append('USER_ROLE', userRole);
    formData.append('image_related', 'TICKET');
    formData.append('file', fileData);

    try {
      const response = await sendFile(formData);
      setEntityUid(response.data.entityUid);
    } catch (error) {
      console.error('API Error:', error);
    }
  };


  useEffect(() => {
    AsyncStorage.getItem('name').then((name) => {
      setUserName(name);
    });
    AsyncStorage.getItem('username').then((username) => {
      setUserId(username);
    });
    AsyncStorage.getItem('userCode').then((code) => {
      setUserCode(code);
    });
    AsyncStorage.getItem('userRole').then((userRole) => {
      setUserRole(userRole);
    });
    AsyncStorage.getItem('userImage').then((userimage) => {
      setUserImage(userimage);
    });
    fetchTicketOptions()
      .then(response => response.json())
      .then(data => {
        setOptions(data);
        setIsOptionsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
        setIsOptionsLoading(false);
      });
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const openTnC = () => {
    Linking.openURL("https://vguardrishta.com/tnc_retailer.html");
  };
  openFaqS = () => {
    Linking.openURL("https://vguardrishta.com/frequently-questions-retailer.html");
  }
  const handleSubmission = async () => {
    const postData = {
      userId: userId,
      issueTypeId: selectedOption,
      imagePath: entityUid,
      description: descriptionInput,
    };

    createTicket(postData)
      .then(response => {
        console.log(postData, "---------------postdata")
        if (response.status === 200) {
          setSelectedOption('');
          setSelectedImage(null);
          setSelectedImageName('');
          setEntityUid('');
          setDescriptionInput('');
          showSnackbar('Ticket Created Successfully');

          const responses = response.json()
          return responses;
        } else {
          throw new Error('Failed to create ticket');
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  const showSnackbar = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  console.log(baseURL+userImage)
  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>

        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}>
          <Image source={{ uri: baseURL + userImage }} style={{ width: '100%', height: '100%', borderRadius: 100 }} resizeMode='contain' />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userName}</Text>
            <Text style={styles.textDetail}>{userCode}</Text>
          </View>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('ticketHistory')}
        >
          <Text style={styles.buttonText}>{t('strings:ticket_history')}</Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.blackText}>{t('strings:issue_type')}</Text>
      {isOptionsLoading ? (
        <Text style={styles.blackText}>Loading options...</Text>
      ) : options.length === 0 ? (
        <Text style={styles.blackText}>No options available.</Text>
      ) : (
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}
            style={styles.picker}
            label={t('strings:select_ticket_type')}
          >
            {options.map(option => (
              <Picker.Item key={option.issueTypeId} label={option.name} value={option.issueTypeId} />
            ))}
          </Picker>
        </View>
      )}
      <TouchableOpacity onPress={handleImagePickerPress} style={styles.inputContainer}>
        {selectedImage ? (
          <TextInput
            style={styles.input}
            placeholder={selectedImageName}
            placeholderTextColor={colors.grey}
            editable={false}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={t('strings:upload_picture_optional')}
            placeholderTextColor={colors.grey}
            editable={false}
          />
        )}
        <View style={styles.inputImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          ) : (
            <Image source={require('../../../../../assets/images/photo_camera.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          )}
        </View>
      </TouchableOpacity>

      {/* Modal for selecting camera or gallery */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showImagePickerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Launch Camera" onPress={handleCameraUpload} />
            <Button title="Choose from Gallery" onPress={handleGalleryUpload} />
          </View>
        </View>
      </Modal>

      <Text style={styles.blackText}>{t('strings:description')}</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder={t('strings:provide_description_in_the_box')}
        placeholderTextColor={colors.grey}
        multiline={true}
        textAlignVertical="top"
        value={descriptionInput}
        onChangeText={(text) => setDescriptionInput(text)}
      />

      <Buttons
        label={t('strings:submit')}
        variant="filled"
        onPress={handleSubmission}
        width="100%"
      />
      <View style={styles.hyperlinks}>
        <TouchableOpacity onPress={openTnC}>
          <Text style={styles.linkText}>{t('strings:terms_and_conditions')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openFaqS}>
          <Text style={styles.linkText}>{t('strings:frequently_asked_quetions_faq')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer} >
        <NeedHelp />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginBottom: 40
  },
  picker: {
    color: colors.black,
    // backgroundColor: colors.grey,
    height: responsiveHeight(5),
    width: '100%',
    fontSize: responsiveFontSize(1.5)
  },
  mainWrapper: {
    padding: 15,
    flexGrow: 1,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 100
  },
  textDetail: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7)
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5)
  },
  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 5
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
    marginTop: responsiveHeight(1)
  },
  input: {
    width: '90%',
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold'
  },
  descriptionInput: {
    width: '100%',
    height: responsiveHeight(20),
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5
  },
  blackText: {
    color: colors.black,
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
  },
  hyperlinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(1)
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: responsiveFontSize(1.5)
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
})

export default Ticket