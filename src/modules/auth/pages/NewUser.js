import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { fetchPinCodeData, PincodedetailList, Citylist } from '../../../utils/apiservice';
import DatePicker from '../../../components/DatePicker';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import vguardristuser from '../../common/Model/Vguardristauser';


import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './NewUserKyc';

const NewUser = ({ navigation }) => {
  // console.log('====================================');
  // console.log(route.params);
  // console.log('====================================');
  // const { passedNo, jobprofession, preferedLanguage } = route.params;
  //  setSelectedLanguage(route.params.preferedLanguage);
  //  console.log("====>>>>", preferedLanguage);
  // console.log("====>>>>", jobprofession);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [citylistpicker, setcitylistpicker] = useState(null);
  const [districtid, setdistrictid] = useState('');
  const [gender, setGender] = useState('Select Gender*');
  const [email, setemail] = useState('');
  const [number, setNumber] = useState();
  const [whatapp, setwhatapp] = useState();
  const [whatappyes, setwhatappyes] = useState('Select WhatApp contact same as above ?');
  const [address, setaddress] = useState('');
  const [street, setstreet] = useState('');
  const [landmark, setlandmark] = useState('');
  const [name, setname] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pincodeid, setpincodeid] = useState('');
  const [permananetsateid, setpermananetsatedid] = useState('');
  const [permananetdistrictId, setpermananetdistrictId] = useState('');
  const [permananetcityid, setpermananetcityid] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');




  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' }
  // ]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setSelectedDate(selectedDate);
      //setShowDatePicker(false);
    }
    setShowDatePicker(false);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  //=============== FUNCTION FOR GETTING THE  DISTRIC ID STATE ID UPIN SELECTING THE ID AND DETAILED PINCODE DATA  
  async function fetchDataForPinCode1(pincode) {
    setLoading(true);
    try {
      setLoading(true);
      const data = await fetchPinCodeData(pincode);
      const pincodeid = data[0].pinCodeId;
      console.log('Pin Code Data:', pincodeid);

      const secondData = await PincodedetailList(pincodeid);
      setdistrictid(secondData.distId);
      setSelectedState(secondData.stateName);
      setSelectedDistrict(secondData.distName);
      setpermananetdistrictId(secondData.distId);
      setpermananetsatedid(secondData.stateId);
      setpermananetcityid(secondData.cityId);


      const cityData = await getCityDataForDistrict(secondData.distId);


      setcitylistpicker(cityData);


      console.log('Second API call:', secondData);
      console.log('District ID:', secondData.distId);

      setIsLoading(false);
    } catch (error) {
      console.error('Error in Page 1:', error);
    } finally {
      setLoading(false);
    }
  }
  ///============================= END OF ABOVE  FUNCTION =============================//

  //=========== FUNCTION FOR GETTING THE  CITY LIST ON USING THE DISTRICT ID =================================//


  async function getCityDataForDistrict(districtId) {
    try {
      setIsLoading(true);
      const cityData = await Citylist(districtId);
      setIsLoading(false)
      return cityData;
    } catch (error) {
      console.error('Error fetching city data for district:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  //=========== ***********************END OF THE ABOVE FUNCTION =================================//



  useEffect(() => {


    AsyncStorage.getItem("userno").then(userno => {
      if (userno) {
        // Update the state with the retrieved value
        setNumber(userno);

      }
    });

    AsyncStorage.getItem("preferedLanguage").then(language => {
      if (language == "1") {
        // Update the state with the retrieved value
        setSelectedLanguage("English");
        console.log('====================================');
        console.log(selectedLanguage);
        console.log('====================================');
      }

      // AsyncStorage.getItem('vguarduserdata').then(user => {
      //   vguardristuser = JSON.parse(user);
      //   console.log(vguardristuser);
      // });

    });
    retrieveData()
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeout);
  }, [])

  function pinocdefeting(text) {
    if (text.length >= 3) {
      fetchPincodeSuggestions(text);
      setOpen(true)
    }
    setPincode(text);
  }
  const retrieveData = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem('previewSummaryData');
      if (data) {
        const retrievedData = JSON.parse(data);

        // Set the state variables with the retrieved data
        setSelectedLanguage(retrievedData.fulldata.userData.selectedLanguage);
        setGender(retrievedData.fulldata.userData.gender);
        setemail(retrievedData.fulldata.userData.email);
        setNumber(retrievedData.fulldata.userData.number);
        setwhatapp(retrievedData.fulldata.userData.whatapp);
        setaddress(retrievedData.fulldata.userData.address);
        setstreet(retrievedData.fulldata.userDat.street);
        setlandmark(retrievedData.fulldata.userData.landmark);
        setname(retrievedData.fulldata.userData.name);
        setPincode(retrievedData.fulldata.userData.pincode.toString());
        setSelectedState(retrievedData.fulldata.userData.selectedState);
        setSelectedDistrict(retrievedData.fulldata.userData.selectedDistrict);
        setSelectedCity(retrievedData.fulldata.userData.selectedCity);
        console.log('====================================');
        console.log(retrievedData);
        console.log('====================================');

        // Set other state variables for additional fields.
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================================GETTING SUGGESTION=====/// FOR PINCODE======================//
  const fetchPincodeSuggestions = async (pincode) => {

    try {
      const suggestionData = await fetchPinCodeData(pincode);

      if (Array.isArray(suggestionData) && suggestionData.length > 0) {

        const filteredSuggestions = suggestionData.filter((item) => (
          item.pinCode !== null
        ));
        setSuggestions(filteredSuggestions);

        console.log("*********************", pincode);
        setIsLoading(true);
        fetchDataForPinCode1(pincode);



      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    finally {

      setLoading(false);
    }
  };

  // ===END OF ====================GETTING SUGGESTION=======================================/// FOR PINCODE===//

  const userData = {
    selectedLanguage,
    gender,
    selectedDate,
    email,
    number,
    whatapp,
    address,
    street,
    landmark,
    name,
    pincode,
    selectedState,
    selectedDistrict,
    selectedCity,
    permananetdistrictId,
    permananetsateid,
    permananetcityid,
  };

  async function updateUserDataInPreviewSummary(userData) {
    try {
      setIsLoading(true);
      // Retrieve the existing 'previewSummaryData' from AsyncStorage
      const previewSummaryDataString = await AsyncStorage.getItem('previewSummaryData');

      if (previewSummaryDataString) {
        // Parse the JSON string to an object
        const previewSummaryData = JSON.parse(previewSummaryDataString);

        // Ensure that the object structure is properly initialized
        if (!previewSummaryData.fullData) {
          previewSummaryData.fullData = {};
        }

        // Update the 'userData' property directly with the provided 'userData'
        previewSummaryData.fullData.userData = userData;
        // if (Object.keys(previewSummaryData.fullData.NewuserKycData).length === 0) {
        //   delete previewSummaryData.fullData.NewuserKycData;
        // }
        // Convert the updated object back to a JSON string
        const updatedPreviewSummaryDataString = JSON.stringify(previewSummaryData);

        // Save the updated 'previewSummaryData' back to AsyncStorage
        // console.log("+++++++++++++++++++++++", updatedPreviewSummaryDataString);
        await AsyncStorage.setItem('previewSummaryData', updatedPreviewSummaryDataString);

        // console.log('Updated User Data in previewSummaryData:', userData);
      } else {
        console.log('No previewSummaryData found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error updating User Data in previewSummaryData:', error);
    } finally {
      setIsLoading(true);
    }
  }
  async function validateFields() {

    if (!name) {
      setIsPopupVisible(true);
      setPopupMessage('Name field is empty. Please fill it.');
      return false;
    }

    if (!gender || gender === 'Select Gender*') {
      setIsPopupVisible(true);
      setPopupMessage('Gender field is empty. Please fill it.');
      return false;
    }
    if (!selectedDate) {
      setIsPopupVisible(true);
      setPopupMessage('Select birth date is empty. Please fill it.');
      return false;
    }

    if (!number) {
      setIsPopupVisible(true);
      setPopupMessage('Number field is empty. Please fill it.');
      return false;
    }
    if (!whatappyes || whatappyes === "Select WhatApp contact same as above ?") {
      setPopupMessage('Please specify your WhatsApp no same or not. ');
      return false;
    }
    if (!address) {
      setIsPopupVisible(true);
      setPopupMessage('Address field is empty. Please fill it.');
      return false;
    }
    if (!street) {
      setIsPopupVisible(true);
      setPopupMessage('Street field is empty. Please fill it.');
      return false;
    }

    if (!pincode) {
      setIsPopupVisible(true);
      setPopupMessage('Please enter a pincode and select a pincode to get state and district.');
      return false;
    }
    if (!selectedState) {
      setIsPopupVisible(true);
      setPopupMessage('State field is empty. Please fill it.');
      return false;
    }
    if (!selectedDistrict) {
      setIsPopupVisible(true);
      setPopupMessage('District field is empty. Please fill it.');
      return false;
    }
    if (!selectedCity) {
      setIsPopupVisible(true);
      setPopupMessage('City field is empty. Please fill it.');
      return false;
    } else {
      setIsLoading(true)
      const userDataString = JSON.stringify(userData);
      await updateUserDataInPreviewSummary(userData);


      const updatedValue = await AsyncStorage.getItem('previewSummaryData');

      console.log('Updated Value in AsyncStorage (previewSummaryData +++++++++++++++++):', updatedValue);

      //await AsyncStorage.setItem("previewSummaryData", JSON.stringify(userData));

      navigation.navigate('NewUserKyc', { userData });


      setIsLoading(false)

    }
    return true;
  }
  return (
    <ScrollView >
      <View >
        <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
          <View style={{ flex: 1 }}>

            <Loader isLoading={isLoading} />
          </View>
          {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
            <Text>{popupMessage}</Text>
            {/* // <Text>ICORRECT OTP</Text> */}
          </Popup>
          )}
          <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
          <View style={{ margin: 20, flexDirection: 'column' }}>
            <Text style={{ color: 'grey' }}>New User</Text>
            <Text style={{ color: 'grey' }}>Rishta ID</Text>
            <Text style={{ color: 'grey' }}>Mobile No.</Text>
          </View>

        </View>


        <Text style={{ color: 'black', marginLeft: 20, }}>{t('strings:lbl_preferred_language')}</Text>
        <FloatingLabelInput
          label={t('auth:newuser:Preferedlanguage')}
          staticLabel
          maxLength={30}
          editable={false}
          value={selectedLanguage}
          onChangeText={(text) => setSelectedLanguage(text)}
          keyboardType='default'
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}
        />

        <FloatingLabelInput
          label={t('strings:name')}
          value={name}


          keyboardType="default"
          onChangeText={value => setname(value)}
          staticLabel
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        />




        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_gender_mandatory')}</Text>

        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Selected Value: ", itemValue)
              setGender(itemValue)
            }}>
            <Picker.Item label={t('strings:select_gender:placeholder')} value="Select Gender*" />
            <Picker.Item label={t('strings:select_gender:male')} value="Male" />
            <Picker.Item label={t('strings:select_gender:female')} value="Female" />
            <Picker.Item label={t('strings:select_gender:other')} value="Other" />
          </Picker>

        </View>

        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_date_of_birth_mandatory')}</Text>

        <View style={{ backgroundColor: 'fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <DatePicker
            date={selectedDate}
            onDateChange={handleDateChange}
            showDatePicker={showDatePicker}
            onShowDatePicker={handleShowDatePicker}
          />

        </View>

        <FloatingLabelInput

          label={t('auth:newuser:Contact')}
          value={number}

          keyboardType='number-pad'
          editable={false}


          maxLength={10}
          staticLabel
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}

        />
        <Text style={{ color: 'black', marginLeft: 20, bottom: 5 }}>{t('strings:_is_what_s_app_contact_same_as_above')}</Text>
        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker

            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={whatappyes}
            onValueChange={(itemValue, itemIndex) => {
              setwhatappyes(itemValue)

              if (itemValue === 'yes') {

                setwhatapp(number)

              } else if (itemValue === 'No') {

                setwhatapp('');
                setwhatappyes(itemValue);

              } else if (itemValue === 'Select WhatApp contact same as above ?') {

                setwhatapp('');
                setwhatappyes(itemValue);

              }

            }}>
            <Picker.Item label={t('strings:whatsapp_yes_no:placeholder')} value="Select WhatApp contact same as above ?" />
            <Picker.Item label={t('strings:whatsapp_yes_no:yes')} value="yes" />
            <Picker.Item label={t('strings:whatsapp_yes_no:no')} value="No" />
          </Picker>

        </View>
        <FloatingLabelInput
          label={t('strings:lbl_whats_app_number')}

          maxLength={10}
          value={whatapp}
          onChangeText={(text) => {

            if (whatappyes === 'No') {

              setwhatapp(text)

            }

          }}
          keyboardType='number-pad'
          staticLabel
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}


        />
        <FloatingLabelInput

          label={t('strings:email')}


          keyboardType='email-address'
          value={email}
          onChangeText={(text) => setemail(text)}
          staticLabel
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}

        />
        <FloatingLabelInput

          label={t('strings:lbl_permanent_address_mandatory')}


          keyboardType='default'
          maxLength={128}
          value={address}
          staticLabel
          onChangeText={(text) => setaddress(text)}
          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}

        />
        <FloatingLabelInput

          label={t('strings:lbl_street_locality')}


          maxLength={128}
          keyboardType='default'
          value={street}
          onChangeText={(text) => setstreet(text)}
          containerStyles={styles.input}
          staticLabel
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}
        />
        <FloatingLabelInput

          label={t('strings:lbl_landmark')}

          staticLabel
          maxLength={60}
          keyboardType='default'
          value={landmark} // Set the value of the input to the 'text' state
          onChangeText={(text) => setlandmark(text)}

          containerStyles={styles.input}
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}
        />


        <Text style={{ color: 'black', marginLeft: 23, }}>{t('strings:lbl_pin_code_mandatory')}</Text>

        <FloatingLabelInput
          containerStyles={styles.input}
          label={t('strings:lbl_pin_code_mandatory')}
          keyboardType="number-pad"
          value={pincode}
          onChangeText={(text) => [setPincode(text),
          setOpen(true)]}
          maxLength={6}
          staticLabel
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
          }}
        />

        {/* <DropDownPicker


          label={value}
          placeholder={pincode === null ? 'Search Pincode' : `Searched Pincode:${pincode}`}
          searchablePlaceholder="Search Pincode"
          translation=
          {t('auth:newuser:Secondpagepincode')}

          // placeholder={value}
          searchTextInputProps={{
            maxLength: 6
          }}
          badgeStyle={(item, index) => ({
            padding: 5,
            backgroundColor: item.value ? 'red' : 'grey',

          })}
          badgeProps={{
            activeOpacity: 1.5
          }}

          badgeSeparatorStyle={{
            width: 30,
          }}
          badgeColors={['red']}
          badgeDotColors={['red']}
          listMode="SCROLLVIEW"
          scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
          open={open}
          items={suggestions.map((item) => ({
            label: item.pinCode,
            value: item.pinCode,
          }))}
          setOpen={setOpen}
          value={pincode.toString()}
          onChangeText={(text) => {
            [setPincode(text), setOpen(false),]
            if (loading) {
              return (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              );
            }

          }}
          dropDownContainerStyle={{

            width: width / 1.1, height: height / 8, padding: 10, left: 18, top: 50, borderWidth: 0, elevation: 0

          }}

          setValue={(value) => {
            setPincode(value);
            if (loading) {
              return (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              );
            }

          }}
          style={{ backgroundColor: 'white', elevation: 50, opacity: 0.9, borderWidth: 0, width: width / 1.1, height: height / 15, alignSelf: 'center', bottom: 10, elevation: 0 }}
        /> */}

        {/* <DropDownPicker
          open={open}
          items={suggestions.map((suggestion) => ({
            label: suggestion.pinCode, // Set the label for each suggestion
            value: suggestion.pinCode, // Set the value to the PIN code
          }))}

          label="Enter PIN code"
          defaultValue={pincode} // Set the default value
          searchable={true}
          searchablelabel="Search for PIN code"
          searchablelabelTextColor="gray"
          searchableError={() => <Text>Not Found</Text>}
          onChangeItem={(item) => {

            setPincode(item.value);
          }}
        /> */}
        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_state')}</Text>
        <FloatingLabelInput
          containerStyles={styles.input}
          label={t('strings:select_state')}
          keyboardType="default"
          value={selectedState}
          onChangeText={(text) => [setSelectedState(text),
          setOpen(true)]}

          staticLabel
          labelStyles={styles.labelStyles}
          inputStyles={{
            color: 'grey',
            paddingHorizontal: 10,
          }}
        />

        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_district')}</Text>

        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

          <Text style={{ color: 'black', margin: 15 }}>{selectedDistrict}</Text>


        </View>

        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('strings:select_city')}</Text>

        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            mode='model'
            style={{ color: 'black' }}
            selectedValue={selectedCity}
            onValueChange={(itemValue, itemIndex) => {
              const selectedItem = citylistpicker[itemIndex];
              setSelectedCity(itemValue);
              setpermananetcityid(selectedItem.id);
              console.log('====================================');
              console.log(permananetcityid);
              console.log('====================================');

            }}>
            <Picker.Item label="Select" value='' />
            {Array.isArray(citylistpicker) && citylistpicker.length > 0 ? (
              citylistpicker.map(item => (

                <Picker.Item
                  key={item.id}
                  label={item.cityName}
                  value={item.cityName}
                />
              ))
            ) : (
              <Picker.Item label="Select City" value="" />
            )}
          </Picker>

        </View>


        <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
          <Buttons
            label={t('strings:next')}
            onPress={() => {

              validateFields();
            }}
            variant="filled"
            width={350}
            icon={require('../../../assets/images/arrow.png')}
            iconWidth={50}
            iconHeight={20}
            iconGap={10}

          />
        </View>
      </View>

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {

    padding: 5,
    height: height / 15,

    margin: 20,
    marginTop: 5,
    color: 'black',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 0.8,
    bottom: -5
  },

  dropdownContainer: {
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyles: {
    backgroundColor: 'transparent',
    margin: 14,
    color: 'grey',
  },
});

export default NewUser;






