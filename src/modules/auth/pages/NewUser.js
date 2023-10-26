import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { fetchPinCodeData, PincodedetailList, Citylist } from '../../../utils/apiservice';
import FlashMessage from "react-native-flash-message";


import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './NewUserKyc';


const NewUser = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [citylistpicker, setcitylistpicker] = useState(null);
  const [districtid, setdistrictid] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setemail] = useState('');
  const [number, setNumber] = useState('');
  const [whatapp, setwhatapp] = useState();
  const [whatappyes, setwhatappyes] = useState('No')
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

  //=============== FUNCTION FOR GETTING THE  DISTRIC ID STATE ID UPIN SELECTING THE ID AND DETAILED PINCODE DATA  
  async function fetchDataForPinCode1(pincode) {
    setLoading(true);
    try {
      const data = await fetchPinCodeData(pincode);
      const pincodeid = data[0].pinCodeId;
      console.log('Pin Code Data:', pincodeid);

      const secondData = await PincodedetailList(pincodeid);
      setdistrictid(secondData.distId);

      // Use the getCityDataForDistrict function to fetch city data
      const cityData = await getCityDataForDistrict(secondData.distId);
      console.log('City Data:', cityData);
      setcitylistpicker(cityData);
      console.log('====================================');
      console.log(citylistpicker);
      console.log('====================================');

      console.log('Second API call:', secondData);
      console.log('District ID:', secondData.distId);
      setSelectedState(secondData.stateName);
      setSelectedDistrict(secondData.distName);
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
      return cityData;
    } catch (error) {
      console.error('Error fetching city data for district:', error);
      throw error;
    }
  }
  //=========== ***********************END OF THE ABOVE FUNCTION =================================//



  useEffect(() => {


    if (pincode.length >= 2) {

      fetchPincodeSuggestions(pincode);

    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeout);


  }, [pincode, gender, whatappyes, whatapp, citylistpicker])

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

        console.log(pincode);

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










  const userData = {
    selectedLanguage,
    gender,
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
  return (
    <ScrollView >
      <View >
        <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
          <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
          <View style={{ margin: 20, flexDirection: 'column' }}>
            <Text style={{ color: 'grey' }}>New User</Text>
            <Text style={{ color: 'grey' }}>564851</Text>
            <Text style={{ color: 'grey' }}>Active</Text>



          </View>

        </View>
        <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Preferedlanguage')}</Text>
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>


          <Picker
            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Selected Value: ", itemValue)
              setSelectedLanguage(itemValue)
              console.log("Selected Value: ", selectedLanguage)
            }}>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
          </Picker>

        </View>
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
          activeBorderColor="black" // Border color when the input is focused (active)
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
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

        </View>

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={number} // Set the value of the input to the 'text' state
          onChangeText={(text) => setNumber(text)}
          keyboardType='number-pad'
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          maxLength={10}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="black" // Border color when the input is focused (active)
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
                console.log('====================================');
                console.log(number);
                console.log(whatappyes);
                console.log('====================================');
                setwhatapp('');
                setwhatappyes(itemValue);

              }

            }}>
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
          activeBorderColor="black" // Border color when the input is focused (active)
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
          value={pincode}
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
                  value={item.id}
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
              navigation.navigate('NewUserKyc', { userData: userData })
              // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
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

function validateAndNavigate(
  gender,
  email,
  number,
  address,
  street,
  pincode,
  selectedState,
  selectedDistrict,
  selectedCity,

) {
  if (gender !== null) {
    Alert("Gender field is empty. Please fill it.");
  } else if (!email) {
    Alert("Email field is empty. Please fill it.");
  } else if (!number) {
    Alert("Number field is empty. Please fill it.");
  } else if (!address) {
    Alert("Address field is empty. Please fill it.");
  } else if (!street) {
    Alert("Street field is empty. Please fill it.");
  } else if (!pincode) {
    Alert("Pincode field is empty. Please fill it.");
  } else if (!selectedState) {
    Alert("State field is empty. Please fill it.");
  } else if (!selectedDistrict) {
    Alert("District field is empty. Please fill it.");
  } else if (!selectedCity) {
    Alert("City field is empty. Please fill it.");
  } else {
    // All fields are filled, navigate to the new page
    // Add your navigation logic here
    navigation.navigate('NewUserKyc', { userData });
    // For example, you can use React Navigation:
    // navigation.navigate('NewPage');
  }
}

// Usage example:
// validateAndNavigate(gender, email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity, navigation);

// const isDataValid = () => {
//   // Define an array of mandatory fields
//   const mandatoryFields = [gender, email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity];

//   // Check if any of the mandatory fields are empty or falsy
//   return mandatoryFields.every(field => field);
// };



