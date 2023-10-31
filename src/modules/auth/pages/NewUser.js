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



import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './NewUserKyc';
import Loader from '../../../components/Loader';


const NewUser = ({ navigation, }) => {

  // console.log('====================================');
  // console.log(route.params);
  // console.log('====================================');
  // const { passedNo, jobprofession } = route.params;
  // console.log("====>>>>", passedNo);
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
  const [whatappyes, setwhatappyes] = useState('Select WhatApp contact same as above ?')
  const [address, setaddress] = useState('');
  const [street, setstreet] = useState('');
  const [landmark, setlandmark] = useState('');
  const [name, setname] = useState('')
  const [pincode, setPincode] = useState('');
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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


      const cityData = await getCityDataForDistrict(secondData.distId);

      setcitylistpicker(cityData);


      console.log('Second API call:', secondData);
      console.log('District ID:', secondData.distId);
      setSelectedState(secondData.stateName);
      setSelectedDistrict(secondData.distName);
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
      if (language) {
        // Update the state with the retrieved value
        setSelectedLanguage(language);
        console.log('====================================');
        console.log(selectedLanguage);
        console.log('====================================');
      }
    });
    const retrieveData = async () => {
      try {
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
      }
    };

    retrieveData()


    if (pincode.length >= 2) {

      fetchPincodeSuggestions(pincode);

    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeout);


  }, [pincode, address, street, landmark])

  // ===============================================GETTING SUGGESTION=====/// FOR PINCODE======================//
  const fetchPincodeSuggestions = async (pincode) => {
    setLoading(true);
    try {
      const suggestionData = await fetchPinCodeData(pincode);

      if (Array.isArray(suggestionData) && suggestionData.length > 0) {
        // Filter out suggestions with null values
        const filteredSuggestions = suggestionData.filter((item) => (
          item.pinCode !== null
        ));
        setSuggestions(filteredSuggestions);

        console.log("*********************", pincode);

        fetchDataForPinCode1(pincode);



      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    finally {
      // After the API call (whether it succeeds or fails), hide the loader
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
  };

  async function updateUserDataInPreviewSummary(userData) {
    try {
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
        console.log("+++++++++++++++++++++++", updatedPreviewSummaryDataString);
        await AsyncStorage.setItem('previewSummaryData', updatedPreviewSummaryDataString);

        console.log('Updated User Data in previewSummaryData:', userData);
      } else {
        console.log('No previewSummaryData found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error updating User Data in previewSummaryData:', error);
    }
  }










  async function validateFields() {

    // if (!name) {
    //   Alert.alert('Name field is empty. Please fill it.');
    //   return false;
    // }

    // if (!gender || gender === 'Select Gender*') {
    //   Alert.alert('Gender field is empty. Please fill it.');
    //   return false;
    // }
    // if (!selectedDate) {
    //   Alert.alert('Select birth date is empty. Please fill it.');
    //   return false;
    // }

    // if (!number) {
    //   Alert.alert('Number field is empty. Please fill it.');
    //   return false;
    // }
    // if (!whatappyes || whatappyes === "Select WhatApp contact same as above ?") {
    //   Alert.alert('Please specify your WhatsApp no same or not. ');
    //   return false;
    // }
    // if (!address) {
    //   Alert.alert('Address field is empty. Please fill it.');
    //   return false;
    // }
    // if (!street) {
    //   Alert.alert('Street field is empty. Please fill it.');
    //   return false;
    // }

    // if (!pincode) {
    //   Alert.alert('Please enter a pincode and select a pincode to get state and district.');
    //   return false;
    // }
    // if (!selectedState) {
    //   Alert.alert('State field is empty. Please fill it.');
    //   return false;
    // }
    // if (!selectedDistrict) {
    //   Alert.alert('District field is empty. Please fill it.');
    //   return false;
    // }
    // if (!selectedCity) {
    //   Alert.alert('City field is empty. Please fill it.');
    //   return false;
    // } else {
    setIsLoading(false)
    const userDataString = JSON.stringify(userData);
    await updateUserDataInPreviewSummary(userData);

    // await AsyncStorage.setItem("userdata", userData);
    // await AsyncStorage.setItem('previewSummaryData', userDataString);
    // console.log('==============new use page data ======================');
    // console.log('prviewSummaryData');
    const updatedValue = await AsyncStorage.getItem('previewSummaryData');
    console.log('Updated Value in AsyncStorage (previewSummaryData +++++++++++++++++):', updatedValue);


    navigation.navigate('NewUserKyc', { userData });


    setIsLoading(false)

    //}
    return true;
  }
  return (
    <ScrollView >
      <View >
        <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
          <View style={{ flex: 1 }}>

            <Loader isLoading={isLoading} />
          </View>
          <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
          <View style={{ margin: 20, flexDirection: 'column' }}>
            <Text style={{ color: 'grey' }}>New User</Text>
            <Text style={{ color: 'grey' }}>Rishta ID</Text>
            <Text style={{ color: 'grey' }}>Mobile No.</Text>



          </View>

        </View>
        <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Preferedlanguage')}</Text>
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Selected Language"
          placeholder="Selected Language"
          maxLength={30}
          editable={false}
          value={selectedLanguage} // Set the value of the input to the 'text' state
          onChangeText={(text) => setSelectedLanguage(text)}
          keyboardType='default'
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
        // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Name"
          placeholder="Name"
          maxLength={30}
          value={name} // Set the value of the input to the 'text' state
          onChangeText={(text) => setname(text)}
          keyboardType='default'
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
        // Border color when the input is focused (active)
        />


        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Gender')}</Text>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


          <Picker
            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Selected Value: ", itemValue)
              setGender(itemValue)
            }}>
            <Picker.Item label="Select Gender*" value="Select Gender*" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

        </View>

        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Date')}</Text>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


          <DatePicker
            date={selectedDate}
            onDateChange={handleDateChange}
            showDatePicker={showDatePicker}
            onShowDatePicker={handleShowDatePicker}
          />

        </View>

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={number} // Set the value of the input to the 'text' state
          // onChangeText={(text) => setNumber(text)}
          keyboardType='number-pad'
          editable={false}
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          maxLength={10}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
        // Border color when the input is focused (active)
        />
        <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Whatappconatctsame')}</Text>
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
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
            <Picker.Item label="Select WhatApp contact same as above ?" value="Select WhatApp contact same as above ?" />
            <Picker.Item label="yes" value="yes" />
            <Picker.Item label="No" value="No" />
          </Picker>

        </View>
        <TextInput
          style={styles.input}
          placeholder="WhatsApp Number"
          maxLength={10}
          value={whatapp} // Set the value of the input to the 'text' state
          onChangeText={(text) => {

            if (whatappyes === 'No') {

              setwhatapp(text)

            }

          }}
          keyboardType='number-pad'
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
        // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          keyboardType='email-address'
          value={email} // Set the value of the input to the 'text' state
          onChangeText={(text) => setemail(text)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          placeholder="Permanent House Flat/block no"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          keyboardType='default'
          maxLength={128}
          value={address} // Set the value of the input to the 'text' state
          onChangeText={(text) => setaddress(text)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          placeholder="Street/ Colony/Locality Name *"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          maxLength={128}
          keyboardType='default'
          value={street} // Set the value of the input to the 'text' state
          onChangeText={(text) => setstreet(text)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          maxLength={60}
          keyboardType='default'
          value={landmark} // Set the value of the input to the 'text' state
          onChangeText={(text) => setlandmark(text)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />


        <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:pincode')}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Pincode"
          placeholderTextColor={"black"}
          keyboardType="number-pad"
          value={pincode}
          onChangeText={(text) => [setPincode(text),
          setOpen(true)]}
          maxLength={6}
        />

        <DropDownPicker
          mode="BADGE"
          showBadgeDot={true}

          placeholder="Pincode List"
          badgeStyle={(item, index) => ({
            padding: 5,
            backgroundColor: item.value ? 'red' : 'grey',
          })}
          badgeSeparatorStyle={{
            width: 30,
          }}
          badgeColors={["red",]}
          badgeDotColors={["red", "blue", "orange"]}
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
            [setPincode(text), setOpen(false)]
            if (loading) {
              return (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              );
            }
            // Call your filtering function with the user's input
            //fetchPincodeSuggestions(text);
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
        />
        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:State')}</Text>
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

          <Text style={{ color: 'black', margin: 15 }}>{selectedState}</Text>
        </View>

        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:District')}</Text>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

          <Text style={{ color: 'black', margin: 15 }}>{selectedDistrict}</Text>


        </View>

        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('auth:newuser:City')}</Text>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            mode='model'
            style={{ color: 'black' }}
            selectedValue={selectedCity}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCity(itemValue)
            }>
            {Array.isArray(citylistpicker) && citylistpicker.length > 0 ? (
              citylistpicker.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.cityName}
                  value={item.cityName}
                />
              ))
            ) : (
              <Picker.Item label="Loading..." value="" />
            )}
          </Picker>

        </View>


        <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
          <Buttons
            label="Next"
            onPress={() => {
              // Check if the data is valid before navigating
              //  navigation.navigate('NewUserKyc', { userData: userData })
              // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
              //validateAndNavigate()
              validateFields();
            }}
            variant="filled" // or any other variant you want to use
            width={350} // specify the width
            icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
            iconWidth={50} // specify the icon width
            iconHeight={20} // specify the icon height
            iconGap={10}
          // specify the gap between the label and the icon
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
    borderWidth: 1,
    padding: 10,
    borderColor: 'black', // Default border color
    activeBorderColor: 'blue',
    margin: 20,
    marginTop: 0,
    color: 'black',
    borderRadius: 5// Border color when focused
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
});

export default NewUser;


// Usage example:
// validateAndNavigate(gender, email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity, navigation);

// const isDataValid = () => {
//   // Define an array of mandatory fields
//   const mandatoryFields = [gender, email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity];

//   // Check if any of the mandatory fields are empty or falsy
//   return mandatoryFields.every(field => field);
// };



