import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, ActivityIndicator, Alert } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fetchPinCodeData, PincodedetailList, GetProfession, Citylist } from '../../../utils/apiservice';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DropDownPicker from 'react-native-dropdown-picker';
import { CurrentRenderContext } from '@react-navigation/native';




const NewUserKyc = ({ navigation, route }) => {
    const { userData } = route.params;
    // console.log('==================%%%==================', userData.selectedCity);
    // console.log('==================%%%==================', userData.selectedDistrict);
    // console.log('==================%%%==================', userData.selectedState);
    const { t } = useTranslation();
    const [currentaddres, setcurrentaddres] = useState('Select');
    const [profession, setprofession] = useState("Select");
    const [maritialStatus, setmaritialStatus] = useState('Select');
    const [loyalty, setloyalty] = useState('Select');
    const [Number, setNumber] = useState();
    const [selfieData, setSelfieData] = useState(null);
    const [idProofFrontData, setIdProofFrontData] = useState(null);
    const [idProofBackData, setIdProofBackData] = useState(null);
    const [panData, setPanData] = useState(null);
    const [pancardno, setpancardno] = useState('');
    const [aadharcardno, setaadharcardno] = useState('');
    const [annualincome, setannualincome] = useState()
    const [address, setaddress] = useState('');
    const [street, setstreet] = useState('');
    const [landmark, setlandmark] = useState('');
    const [pincode, setpincode] = useState('');
    const [currentselectedState, setCurrentselectedState] = useState('');
    const [currentselectedDistrict, setCurrentselectedDistrict] = useState('');
    const [currentselectedCity, setCurrentselectedCity] = useState('');
    const [professiondata, setprofessiondata] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [schmename, setschmename] = useState('');
    const [resonforlikingschme, setresonforlikingschme] = useState('');
    const [citylistpicker, setcitylistpicker] = useState(null);
    const [redendering, setredendering] = useState(0);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [loading, setLoading] = useState(false);

    // console.log('====================================', pincode);
    // console.log('================insde current value city function====================', currentselectedCity);
    // console.log('================insde current value district function====================', currentselectedDistrict);
    // console.log('================insde current value state  function====================', currentselectedState);



    const requestCameraPermission = async () => {


        const status = await Permissions.request(Permissions.CAMERA);
        if (status === 'granted') {
            console.log('Camera permission granted.');
        } else {
            console.log('Camera permission denied.');
        }
    };



    async function Gettingprofession(params) {

        try {
            const professionfromapi = await GetProfession();
            setprofessiondata([professionfromapi[0], professionfromapi[1], professionfromapi[2],]);
            // console.log("==%%%%===", professiondata);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        finally {
            // After the API call (whether it succeeds or fails), hide the loader
            setLoading(false);
        }

    }

    //================================GETTTING DISTRICT AND STATE NAME WITH PINCODEID ========================//

    async function fetchDataForPinCode1(pincode) {
        setLoading(true);
        try {
            const data = await fetchPinCodeData(pincode);
            console.log('Fetching data for pincode API CALL:', typeof pincode);
            const pincodeid = data[0].pinCodeId; // Declare the variable using 'const'
            console.log('Pin Code Data:', pincodeid);

            const secondData = await PincodedetailList(pincodeid);

            const cityData = await getCityDataForDistrict(secondData.distId);
            // console.log('City Data:', cityData);
            setcitylistpicker(cityData);
            setCurrentselectedState(secondData.stateName);

            setCurrentselectedDistrict(secondData.distName);

            console.log('Second API call:', secondData);


        } catch (error) {
            console.error('Error in Page 1:', error);
        } finally {
            // After the API call (whether it succeeds or fails), hide the loader
            setLoading(false);
        }
    }
    //========================eND OF FUNCTION========GETTTING DISTRICT AND STATE NAME WITH PINCODEID ========================//

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

    async function getCityDataForDistrict(districtId) {
        try {

            const cityData = await Citylist(districtId);
            // setIsLoading(false)
            return cityData;
        } catch (error) {
            console.error('Error fetching city data for district:', error);
            throw error;
        } finally {
            // setIsLoading(false);
        }
    }
    //=========== ***********************END OF THE ABOVE FUNCTION =================================//
    useEffect(() => {
        // requestCameraPermission();

        console.log("===>>ON FOIRST", currentaddres);
        const retrieveData = async () => {
            try {
                const data = await AsyncStorage.getItem('previewSummaryData');
                if (data) {
                    const retrievedData = JSON.parse(data);

                    // Set the state variables with the retrieved data
                    console.log('====================================');
                    console.log(retrievedData.fullData.NewUserKycData.currentaddres);
                    console.log('====================================');
                    if (retrievedData.fullData.NewUserKycData.currentaddres === null) {
                        setcurrentaddres('Select');
                    }

                    else if (retrievedData.fullData.NewUserKycData.currentaddres === 'no') {
                        setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres);
                        setpincode(retrievedData.fullData.NewUserKycData.pinCode)
                        setaddress(retrievedData.NewUserKycData.userData.address);
                        setstreet(retrievedData.NewUserKycData.userData.street);
                        setlandmark(retrievedData.NewUserKycData.userData.landmark);
                        setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                        setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                        setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);
                        setpincode(retrievedData.fullData.NewUserKycData.pinCode)
                    }
                    else if (retrievedData.fullData.NewUserKycData.currentaddres == 'yes') {
                        console.log("===>>ON FOIRST", currentaddres);
                        setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres)
                        setpincode(retrievedData.fullData.NewUserKycData.pincode.toString())
                        setaddress(retrievedData.fullData.userData.address);
                        setstreet(retrievedData.fullData.userData.street);
                        setlandmark(retrievedData.fullData.userData.landmark);
                        setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                        setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                        setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);
                        setpincode(retrievedData.fullData.userData.pinCode)
                        setaddress(retrievedData.fullData.NewUserKycData.address);
                        setstreet(retrievedData.fullData.NewUserKycData.street);
                        setlandmark(retrievedData.fullData.NewUserKycData.landmark);

                        setprofession(retrievedData.fullData.NewUserKycData.profession);
                        setmaritialStatus(retrievedData.fullData.NewUserKycData.maritialStatus);
                        setloyalty(retrievedData.fullData.NewUserKycData.loyalty);
                        setNumber(retrievedData.fullData.NewUserKycData.Number);
                        setSelfieData(retrievedData.fullData.NewUserKycData.selfieData);
                        setIdProofFrontData(retrievedData.fullData.NewUserKycData.idProofFrontData);
                        setIdProofBackData(retrievedData.fullData.NewUserKycData.idProofBackData);
                        setPanData(retrievedData.fullData.NewUserKycData.panData);
                        setpancardno(retrievedData.fullData.NewUserKycData.pancardno);
                        setaadharcardno(retrievedData.fullData.NewUserKycData.aadharcardno);
                        setannualincome(retrievedData.fullData.NewUserKycData.annualincome);
                        setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                        setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                        setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);


                    }
                    // if (retrievedData.fullData.NewUserKycData.currentaddres === 'no') {
                    //     setaddress(retrievedData.fullData.NewUserKycData.address);
                    //     setstreet(retrievedData.fullData.NewUserKycData.street);
                    //     setlandmark(retrievedData.fullData.NewUserKycData.landmark);
                    //     setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                    //     setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                    //     setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);
                    //     setpincode(retrievedData.fullData.NewUserKycData.pinCode.toString())


                    // }
                    else {
                        // setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres);
                        setaddress(retrievedData.fullData.NewUserKycData.address);
                        setstreet(retrievedData.fullData.NewUserKycData.street);
                        setlandmark(retrievedData.fullData.NewUserKycData.landmark);
                        setpincode(retrievedData.fullData.NewUserKycData.pincode.toString())
                        setprofession(retrievedData.fullData.NewUserKycData.profession);
                        setmaritialStatus(retrievedData.fullData.NewUserKycData.maritialStatus);
                        setloyalty(retrievedData.fullData.NewUserKycData.loyalty);
                        setNumber(retrievedData.fullData.NewUserKycData.Number);
                        setSelfieData(retrievedData.fullData.NewUserKycData.selfieData);
                        setIdProofFrontData(retrievedData.fullData.NewUserKycData.idProofFrontData);
                        setIdProofBackData(retrievedData.fullData.NewUserKycData.idProofBackData);
                        setPanData(retrievedData.fullData.NewUserKycData.panData);
                        setpancardno(retrievedData.fullData.NewUserKycData.pancardno);
                        setaadharcardno(retrievedData.fullData.NewUserKycData.aadharcardno);
                        setannualincome(retrievedData.fullData.NewUserKycData.annualincome);
                        setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                        setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                        setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);
                    }

                    console.log('================ON USE EFFECT====================');
                    console.log(pincode);
                    console.log('====================================');

                    // Set other state variables for additional fields.
                }
            } catch (error) {
                console.error('Error retrieving data: ', error);
            }
        };
        retrieveData()
        Gettingprofession();


        if (pincode != null) {
            if (pincode.length >= 2) {

                fetchPincodeSuggestions(pincode);

            }

        }








    }, [])


    let options = {
        saveToPhotoes: true,
        mediaType: 'photo',
        saveToPhotos: true,
        selectionLimit: 1,
        quality: 0.5,
        includeBase64: true,
        storageOption: {
            skipbackup: true,
            path: 'images',
        }
    };
    const openCamera = async (documentType, onCapture) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options);
            const photo = result.assets[0];
            const newPhoto = { uri: photo.uri, type: photo.type, name: photo.fileName };

            // Handle the captured data based on the document type
            switch (documentType) {
                case 'Selfie':
                    setSelfieData(newPhoto);
                    console.log(selfieData);
                    break;
                case 'IdProofFront':
                    setIdProofFrontData(newPhoto);
                    break;
                case 'IdProofBack':
                    setIdProofBackData(newPhoto);
                    break;
                case 'Pan':
                    setPanData(newPhoto);
                    break;
                default:
                    console.log('Unknown document type');
            }

            // Call the provided callback function to further process the data
            if (typeof onCapture === 'function') {
                onCapture(documentType, newPhoto);
            }
        }
    };

    const NewUserKycData = {
        currentaddres,
        profession,
        maritialStatus,
        loyalty,
        annualincome,
        aadharcardno,
        pancardno,
        selfieData,
        idProofFrontData,
        idProofBackData,
        panData,
        address,
        street,
        landmark,
        pincode,
        currentselectedState,
        currentselectedDistrict,
        currentselectedCity,
    };

    //Combine user data and form data into one object
    const fullData = {
        userData,
        NewUserKycData,
    };
    //================================VALIDATION FUNCTION AND NAVIAGTION ON NEXT PAGE ==============================================//
    const validateFields = async () => {
        if (!currentaddres || currentaddres === "Select") {
            Alert.alert('Select current address same as Permanent address or not.');
            return false;
        }
        if (!address) {
            Alert.alert('Please enter your current address.');
            return false;
        }
        if (!street) {
            Alert.alert('Please enter street colony or locality name.');
            return false;
        }
        if (!pincode && pincode != null) {
            console.log("))))))", pincode);
            Alert.alert('Please enter a pincode and select a pincode to get state and district');
            return false;
        }
        if (!profession || profession === "Select") {
            Alert.alert('Profession field is empty. Please fill it.');
            return false;
        }
        if (!maritialStatus || maritialStatus === 'Select') {
            Alert.alert('Marital Status field is empty. Please fill it.');
            return false;
        }
        if (!loyalty || loyalty === 'Select') {
            Alert.alert('Loyalty field is empty. Please fill it.');
            return false;
        }
        if (!annualincome) {
            Alert.alert('Annual Business potenial field is empty. Please fill it.');
            return false;
        }
        if (!selfieData) {
            Alert.alert('Please upload your selfie');
            return false;
        }
        if (!aadharcardno) {
            Alert.alert('Aadhar Card Number field is empty. Please fill it.');
            return false;
        }


        if (!idProofFrontData) {
            Alert.alert('Aadhar Front Image not taken.');
            return false;
        }
        if (!idProofBackData) {
            Alert.alert('Aadhar Back Image not taken.');
            return false;
        }
        // if (!panData) {
        //     Alert.alert('PAN Card Photo field is empty. Please fill it.');
        //     return false;
        // }
        // if (!pancardno) {
        //     Alert.alert('PAN Card Number field is empty. Please fill it.');
        //     return false;
        // }

        //  if (!landmark) {
        //     Alert.alert('landmark field is empty. Please fill it.');
        //     return false;
        // }

        if (!currentselectedCity) {
            console.log(")))))))))))))", currentselectedCity);
            Alert.alert(' Current City field is empty. Please fill it.');
            return false;
        }
        if (!currentselectedDistrict) {
            console.log(")))))))))))))", currentselectedDistrict);
            Alert.alert('Current District field is empty. Please fill it.');
            return false;
        }
        if (!currentselectedState) {
            console.log(")))))))))))))", currentselectedState);
            Alert.alert('Current State field is empty. Please fill it.');
            return false;
        }
        else {
            // console.log('====================================');
            // console.log(fullData);
            // console.log('====================================');
            // const fullData = JSON.stringify(fullData);
            // console.log("+++++++++++++++++++", fullData);
            // await AsyncStorage.setItem("previewSummaryData", fullData);
            // log
            navigation.navigate('NomineePage', { fullData });
        }
        // Add validation checks for other fields

        return true;
    };
    //===============================VALIDATION FUNCTION ENDS =================================================================//

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
    const openImagePicker = async (documentType, onCapture) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const options = {
                mediaType: 'photo',
                quality: 0.5,
                cameraType: 'back',
                saveToPhotos: true,
            };

            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                const photo = result.assets[0];
                const newPhoto = { uri: photo.uri, type: photo.type, name: photo.fileName };

                // Handle the captured data based on the document type
                switch (documentType) {
                    case 'Selfie':
                        setSelfieData(newPhoto);
                        break;
                    case 'IdProofFront':
                        setIdProofFrontData(newPhoto);
                        break;
                    case 'IdProofBack':
                        setIdProofBackData(newPhoto);
                        break;
                    case 'Pan':
                        setPanData(newPhoto);
                        break;
                    default:
                        console.log('Unknown document type');
                }

                // Call the provided callback function to further process the data
                if (typeof onCapture === 'function') {
                    onCapture(documentType, newPhoto);
                }
            }
        }
    };

    return (
        <SafeAreaView>
            <ScrollView >
                <View >
                    <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
                        <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
                        <View style={{ margin: 20, flexDirection: 'column' }}>
                            <Text style={{ color: 'grey' }}>New User</Text>
                            <Text style={{ color: 'grey' }}>Rishta ID</Text>
                            <Text style={{ color: 'grey' }}>Mobile No.</Text>
                        </View>

                    </View>



                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:CurrentAddresselctionHeader')}</Text>
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={currentaddres}
                            onValueChange={(itemValue, itemIndex) => {
                                setcurrentaddres(itemValue);
                                // Set text input values to null when "Yes" is selected
                                if (itemValue === 'no') {
                                    setaddress('');
                                    setstreet('');
                                    setlandmark('');
                                    setpincode('');
                                    setCurrentselectedState('');
                                    setCurrentselectedDistrict('');
                                    setCurrentselectedCity('');


                                }
                                if (itemValue === 'yes') {

                                    // Set the values for pre-filling
                                    setaddress(userData.address); // Set your pre-filled address value
                                    setstreet(userData.street); // Set your pre-filled street value
                                    setlandmark(userData.landmark);
                                    console.log('====================================');
                                    console.log(userData.pincode);
                                    console.log(pincode);
                                    // Set your pre-filled landmark value
                                    setpincode(userData.pincode);
                                    setCurrentselectedCity(userData.selectedCity);
                                    setCurrentselectedDistrict(userData.selectedDistrict);// Set your pre-filled pincode value
                                    setCurrentselectedState(userData.selectedState); // Set your pre-filled state value
                                    // Set your pre-filled district value


                                    console.log('====================####================', currentselectedCity);
                                    console.log('====================####================', currentselectedDistrict);
                                    console.log('====================####================', currentselectedState);  // Set your pre-filled city value
                                }
                            }}>
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="yes" value="yes" />
                            <Picker.Item label="no" value="no" />
                        </Picker>

                    </View>

                    {currentaddres == 'Select' ? <></> : <>
                        <TextInput
                            style={styles.input}

                            placeholder="Current House Flat/block no"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            editable={currentaddres === 'no'}
                            keyboardType='default'
                            value={address} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setaddress(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue"

                        // Border color when the input is focused (active)
                        />
                        <TextInput
                            style={styles.input}
                            editable={currentaddres == 'no'}
                            placeholder="Current Street/ Colony/Locality Name *"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='default'
                            value={street} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setstreet(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />
                        <TextInput
                            style={styles.input}
                            editable={currentaddres == 'no'}
                            placeholder="Landmark"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='default'
                            value={landmark} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setlandmark(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />
                        <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:Secondpagepincode')}</Text>
                        {currentaddres === 'yes' ? <Text style={styles.input}>{userData.pincode}</Text>


                            :

                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Pincode"
                                    placeholderTextColor={"black"}
                                    keyboardType="number-pad"
                                    value={pincode}
                                    onChangeText={(text) => [setpincode(text),
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
                                        [setpincode(text), setOpen(false)]
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
                                        setpincode(value);
                                        if (loading) {
                                            return (
                                                <View style={styles.loaderContainer}>
                                                    <ActivityIndicator size="large" color="blue" />
                                                </View>
                                            );
                                        }

                                    }}
                                    style={{ backgroundColor: 'white', elevation: 50, opacity: 0.9, borderWidth: 0, width: width / 1.1, height: height / 15, alignSelf: 'center', bottom: 10, elevation: 0 }}
                                /></>}
                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:CurrentState')}</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
                            {/* <Picker
                                style={{ color: 'black' }}
                                selectedValue={currentselectedState}
                                enabled={currentaddres === 'no'}
                                onValueChange={(itemValue, itemIndex) => setCurrentselectedState(itemValue)}
                            >
                                {IndianStates.map((state, index) => (
                                    <Picker.Item key={index} label={state} value={state} />
                                ))}


                                
                            </Picker> */}

                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedState}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedState}</Text>}

                        </View>
                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('auth:newuser:CurrentDistrict')}</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>



                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedDistrict}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedDistrict}</Text>}

                        </View>

                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:CurrentCity')}</Text>
                        {currentaddres === 'no' ? <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
                            <Picker
                                mode='model'
                                style={{ color: 'black' }}
                                selectedValue={currentselectedCity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCurrentselectedCity(itemValue)
                                }>
                                {Array.isArray(citylistpicker) && citylistpicker.length >= 0 ? (
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

                        </View> : <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>



                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedCity}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedCity}</Text>}

                        </View>}
                    </>}

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Currentprofession')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={profession}
                            onValueChange={(itemValue, itemIndex) =>
                                setprofession(itemValue)
                            }>
                            <Picker.Item label="Select" value="" />
                            {professiondata.map(item => (
                                <Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
                            ))}

                        </Picker>

                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:MartialStatus')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={maritialStatus}
                            onValueChange={(itemValue, itemIndex) =>
                                setmaritialStatus(itemValue)
                            }>
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="Married" value="Married" />
                            <Picker.Item label=" Unmarried" value="Unmarried" />


                        </Picker>

                    </View>


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Alreadyenroled')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={loyalty}
                            onValueChange={(itemValue, itemIndex) =>
                                setloyalty(itemValue)}>
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="Yes" value="Yes" />
                            <Picker.Item label=" No" value="No" />



                        </Picker>

                    </View>

                    {loyalty == 'Yes' ?
                        <TextInput
                            style={styles.input}
                            placeholder="If yes please mention Scheme and brand name "
                            value={schmename} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setschmename(text)}
                            keyboardType='default'
                            // Customize the border width and color for both normal and active states
                            borderWidth={1}
                            borderColor="black"
                            placeholderTextColor="grey"// Default border color
                        // Border color when the input is focused (active)
                        />


                        : null
                    }

                    {loyalty == 'Yes' ?
                        <TextInput
                            style={styles.input}
                            placeholder="If yes what you liked about the program *"
                            value={resonforlikingschme} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setresonforlikingschme(text)}
                            keyboardType='default'
                            // Customize the border width and color for both normal and active states
                            borderWidth={1}
                            borderColor="black"
                            placeholderTextColor="grey"// Default border color
                        // Border color when the input is focused (active)
                        />


                        : null
                    }

                    <TextInput
                        style={styles.input}
                        placeholder="Annual business potential *"
                        value={annualincome} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setannualincome(text)}
                        keyboardType='number-pad'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Selfie')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {selfieData != null ? <Text style={{ color: 'black', }}>{selfieData.name.substring(0, 30)}</Text> : null}
                            {selfieData != null ? <TouchableOpacity onPress={() => openCamera('Selfie', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })} >
                                <Image resizeMode="cover" source={{ uri: selfieData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
                            </TouchableOpacity> : <IconButton
                                icon="camera"
                                animated='true'

                                size={20}
                                onPress={() => openCamera('Selfie', (documentType, data) => {
                                    // Handle the captured data for the 'Selfie' document type here
                                })}
                            />}
                        </View>
                        <IconButton
                            icon="link"

                            size={20}
                            onPress={() => openImagePicker('Selfie', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })}
                        />

                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCardFront')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>

                            {idProofFrontData != null ? <Text style={{ color: 'black', }}>{idProofFrontData.name.substring(0, 30)}</Text> : null}
                            {idProofFrontData != null ? <TouchableOpacity onPress={() => openCamera('IdProofFront', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })} >
                                <Image resizeMode="cover" source={{ uri: idProofFrontData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
                            </TouchableOpacity> :
                                <IconButton
                                    icon="camera"
                                    animated='true'

                                    size={20}
                                    onPress={() => openCamera('IdProofFront', (documentType, data) => {
                                        // Handle the captured data for the 'Selfie' document type here
                                    })}
                                />}
                        </View>
                        <IconButton
                            icon="link"

                            size={20}
                            onPress={() => openImagePicker('IdProofFront', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })}
                        />

                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginTop: 5 }}>{t('auth:newuser:AadharCardBack')}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 10, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {idProofBackData != null ? <Text style={{ color: 'black', }}>{idProofBackData.name.substring(0, 30)}</Text> : null}
                            {idProofBackData != null ?
                                <TouchableOpacity onPress={() => openCamera('IdProofBack', (documentType, data) => {
                                    // Handle the captured data for the 'Selfie' document type here
                                })} >
                                    <Image resizeMode="cover" source={{ uri: idProofBackData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
                                </TouchableOpacity> :
                                <IconButton
                                    icon="camera"
                                    animated='true'

                                    size={20}
                                    onPress={() => openCamera('IdProofBack', (documentType, data) => {
                                        // Handle the captured data for the 'Selfie' document type here
                                    })}
                                />}
                        </View>
                        <IconButton
                            icon="link"

                            size={20}
                            onPress={() => openImagePicker('IdProofBack', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })}
                        />

                    </View>
                    <TextInput
                        style={[styles.input, { marginTop: 20 }]}
                        placeholder="Aadhar Card No*"
                        value={aadharcardno} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaadharcardno(text)}
                        keyboardType='number-pad'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color

                        maxLength={12}// Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:PanCardFront')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {panData != null ? <Text style={{ color: 'black', }}>{panData.name.substring(0, 30)}</Text> : null}
                            {panData != null ? <TouchableOpacity onPress={() => openCamera('Pan', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })} >
                                <Image resizeMode="cover" source={{ uri: panData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
                            </TouchableOpacity> : <IconButton
                                icon="camera"
                                animated='true'

                                size={20}
                                onPress={() => openCamera('Pan', (documentType, data) => {
                                    // Handle the captured data for the 'Selfie' document type here
                                })}
                            />}
                        </View>
                        <IconButton
                            icon="link"

                            size={20}
                            onPress={() => openImagePicker('Pan', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })}
                        />

                    </View>
                    <TextInput
                        style={[styles.input, { marginTop: 20 }]}
                        placeholder="Pan Card No*"
                        value={pancardno} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpancardno(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color

                        maxLength={10} // Border color when the input is focused (active)
                    />








                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Next"
                            onPress={() => validateFields()}
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
        </SafeAreaView >
    )
}

export default NewUserKyc

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
    }
})