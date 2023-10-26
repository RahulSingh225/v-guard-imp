import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, ActivityIndicator } from 'react-native';
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
import { fetchPinCodeData, PincodedetailList, GetProfession } from '../../../utils/apiservice';
import { useTranslation } from 'react-i18next';

import DropDownPicker from 'react-native-dropdown-picker';




const NewUserKyc = ({ navigation, route }) => {
    const { t } = useTranslation();
    const [currentaddres, setcurrentaddres] = useState();
    const [profession, setprofession] = useState();
    const [maritialStatus, setmaritialStatus] = useState();
    const [loyalty, setloyalty] = useState();
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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [loading, setLoading] = useState(false);
    const { userData } = route.params;
    //  console.log('====================================', userData);
    console.log('====================================', pincode);
    console.log('================insde current value city function====================', currentselectedCity);
    console.log('================insde current value district function====================', currentselectedDistrict);
    console.log('================insde current value state  function====================', currentselectedState);



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
            setprofessiondata([professionfromapi[0], professionfromapi[1], professionfromapi[2], professionfromapi[3]]);
            console.log("==%%%%===", professiondata);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        finally {
            // After the API call (whether it succeeds or fails), hide the loader
            setLoading(false);
        }

    }

    async function fetchDataForPinCode1(pincode) {
        setLoading(true);
        try {
            const data = await fetchPinCodeData(pincode);
            // console.log('Fetching data for pincode API CALL:', typeof pincode);
            const pincodeid = data[0].pinCodeId; // Declare the variable using 'const'
            console.log('Pin Code Data:', pincodeid);

            const secondData = await PincodedetailList(pincodeid);
            console.log('====================================');
            console.log(secondData.distName);
            console.log('====================================');
            setCurrentselectedState(secondData.stateName);
            setCurrentselectedCity(secondData.cityName);
            setCurrentselectedDistrict(secondData.distName);

            console.log('Second API call:', secondData);


        } catch (error) {
            console.error('Error in Page 1:', error);
        } finally {
            // After the API call (whether it succeeds or fails), hide the loader
            setLoading(false);
        }
    }

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
                // console.log('====================================');
                // console.log(suggestions);
                // console.log('====================================');
                // console.log('================VALUE====================');
                // console.log(pincode);
                // console.log('====================================');

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


    useEffect(() => {
        requestCameraPermission();
        Gettingprofession();


        if (pincode.length >= 2) {
            // Make the API call here
            fetchPincodeSuggestions(pincode);
        }



        const timeout = setTimeout(() => {
            setLoading(false);
        }, 5000);

        // Clear the timeout if the component unmounts before the timeout is reached
        return () => clearTimeout(timeout);

    }, [pincode, currentselectedCity, currentselectedDistrict, currentselectedState, selfieData, currentaddres, loyalty])






    // const formData = {
    //     currentaddres,
    //     profession,
    //     maritialStatus,
    //     loyalty,
    //     annualincome,
    //     aadharcardno,
    //     pancardno,
    //     selfieData,
    //     idProofFrontData,
    //     idProofBackData,
    //     panData,
    //     address,
    //     street,
    //     landmark,
    //     pincode,
    //     currentselectedState,
    //     currentselectedDistrict,
    //     currentselectedCity,
    // };







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

    // const NewUserKyc = {
    //     currentaddres,
    //     profession,
    //     maritialStatus,
    //     loyalty,
    //     annualincome,
    //     aadharcardno,
    //     pancardno,
    //     selfieData,
    //     idProofFrontData,
    //     idProofBackData,
    //     panData,
    //     address,
    //     street,
    //     landmark,
    //     pincode,
    //     currentselectedState,
    //     currentselectedDistrict,
    //     currentselectedCity,
    // };

    // Combine user data and form data into one object
    // const fullData = {
    //     userData,
    //     formData,
    // };




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
                            <Text style={{ color: 'grey' }}>564851</Text>
                            <Text style={{ color: 'grey' }}>Active</Text>
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
                                    setCurrentselectedState('');


                                }
                                else if (itemValue === 'yes') {
                                    // Set the values for pre-filling
                                    setaddress(userData.address); // Set your pre-filled address value
                                    setstreet(userData.street); // Set your pre-filled street value
                                    setlandmark(userData.landmark);
                                    console.log('====================================');
                                    console.log(userData.pincode);
                                    console.log(pincode);
                                    console.log('====================================');// Set your pre-filled landmark value
                                    setpincode(userData.pincode); // Set your pre-filled pincode value
                                    setCurrentselectedState(userData.selectedState); // Set your pre-filled state value
                                    setCurrentselectedDistrict(userData.DistrictsData); // Set your pre-filled district value
                                    setCurrentselectedState(userData.selectedCity); // Set your pre-filled city value
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

                            placeholder="Permanent House Flat/block no"
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
                            placeholder="Street/ Colony/Locality Name *"
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
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedCity}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedCity}</Text>}

                        </View></>}

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Currentprofession')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={profession}
                            onValueChange={(itemValue, itemIndex) =>
                                setprofession(itemValue)
                            }>
                            {professiondata.map(item => (
                                <Picker.Item key={item.professionId} label={item.professionName} value={item.professionId} />
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
                            activeBorderColor="black" // Border color when the input is focused (active)
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
                            activeBorderColor="black" // Border color when the input is focused (active)
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
                        activeBorderColor="black" // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Selfie')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {selfieData != null ? <Text style={{ color: 'black', }}>{selfieData.name}</Text> : null}
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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCard')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {idProofFrontData != null ? <Text style={{ color: 'black', }}>{idProofFrontData.name}</Text> : null}
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 10, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {idProofBackData != null ? <Text style={{ color: 'black', }}>{idProofBackData.name}</Text> : null}
                            {idProofBackData != null ? <TouchableOpacity onPress={() => openCamera('IdProofBack', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })} >
                                <Image resizeMode="cover" source={{ uri: idProofBackData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />
                            </TouchableOpacity> : <IconButton
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
                        activeBorderColor="black" // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:PanCardFront')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {panData != null ? <Text style={{ color: 'black', }}>{panData.name}</Text> : null}
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
                        activeBorderColor="black" // Border color when the input is focused (active)
                    />








                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Next"
                            onPress={() => navigation.navigate('NomineePage',)}
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