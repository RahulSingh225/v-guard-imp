import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
const IndianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
];

const DistrictsData = {
  'Andhra Pradesh': ['District 1', 'District 2', 'District 3'],
  'Arunachal Pradesh': ['District A', 'District B'],
  'Assam': ['District X', 'District Y', 'District Z'],
  // Add more districts for other states
};

const CitiesData = {
  'District 1': ['City A', 'City B'],
  'District 2': ['City X', 'City Y'],
  // Add more cities for other districts
};
const NewUser = ({ navigation }) => {

  useEffect(() => {

  }, [selectedState, selectedDistrict, selectedCity])

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [gender, setgender] = useState();
  const [email, setemail] = useState();
  const [Number, setNumber] = useState();
  const [whatapp, setwhatapp] = useState()
  const [address, setaddress] = useState();
  const [street, setstreet] = useState();
  const [landmark, setlandmark] = useState();
  const [pincode, setpincode] = useState();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
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
        <Text style={{ color: 'black', marginLeft: 20, }}>Prefered Language</Text>
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>


          <Picker
            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)


            }>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
          </Picker>

        </View>
        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Gender</Text>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


          <Picker
            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) =>
              setgender(itemValue)
            }>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

        </View>

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={Number} // Set the value of the input to the 'text' state
          onChangeText={text => setNumber(Number)}
          keyboardType='number-pad'
          // Customize the border width and color for both normal and active states
          borderWidth={1}
          borderColor="black"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="black" // Border color when the input is focused (active)
        />
        <Text style={{ color: 'black', marginLeft: 20, }}>Is whatapp contact same as above</Text>
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker

            mode='dropdown'
            style={{ color: 'black' }}
            selectedValue={whatapp}
            onValueChange={(itemValue, itemIndex) =>
              setwhatapp(itemValue)}>
            <Picker.Item label="yes" value="yes" />
            <Picker.Item label="No" value="No" />
          </Picker>

        </View>
        <TextInput
          style={styles.input}
          placeholder="WhatsApp Number"
          value={Number} // Set the value of the input to the 'text' state
          onChangeText={text => setNumber(Number)}
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
          onChangeText={text => setemail(email)}
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
          value={address} // Set the value of the input to the 'text' state
          onChangeText={text => setaddress(address)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <TextInput
          style={styles.input}
          placeholder="Street Colony"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          keyboardType='default'
          value={landmark} // Set the value of the input to the 'text' state
          onChangeText={text => setlandmark(landmark)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <Text style={{ color: 'black', marginLeft: 23, }}>Pincode</Text>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          // Customize the border width and color for both normal and active states
          borderWidth={1.8}
          keyboardType='number-pad'
          value={pincode} // Set the value of the input to the 'text' state
          onChangeText={text => setpincode(pincode)}
          borderColor="gray"
          placeholderTextColor="grey"// Default border color
          activeBorderColor="blue" // Border color when the input is focused (active)
        />
        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            style={{ color: 'black' }}
            selectedValue={selectedState}
            onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}
          >
            {IndianStates.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
          <Text style={{ color: 'black' }}>Selected state: {selectedState}</Text>
        </View>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            style={{ color: 'black' }}
            selectedValue={selectedDistrict}
            onValueChange={(itemValue, itemIndex) => setSelectedDistrict(itemValue)}
          >
            {DistrictsData[selectedState] && DistrictsData[selectedState].map((district, index) => (
              <Picker.Item key={index} label={district} value={district} />
            ))}
          </Picker>
          <Text style={{ color: 'black' }}>Selected district: {selectedDistrict}</Text>
        </View>

        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
          <Picker
            style={{ color: 'black' }}
            selectedValue={selectedCity}
            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
          >
            {CitiesData[selectedDistrict] && CitiesData[selectedDistrict].map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
          <Text style={{ color: 'black' }}>Selected city: {selectedCity}</Text>
        </View>

        <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
          <Buttons
            label="Next"
            onPress={() => navigation.navigate('NewuserKyc')}
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

    </ScrollView>
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
    color: 'grey',
    borderRadius: 5// Border color when focused
  },
});

export default NewUser;
