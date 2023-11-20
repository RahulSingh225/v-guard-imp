import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, ActivityIndicator, Alert } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, Button, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fetchPinCodeData, PincodedetailList, GetProfession, Citylist, Getsubprofession } from '../../../utils/apiservice';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { CurrentRenderContext } from '@react-navigation/native';
import Popup from '../../../components/Popup';
import Loader from '../../../components/Loader';
const NewUserKyc = ({ navigation, route }) => {
    const { userData } = route.params;
    // console.log('==================%%%==================', userData.selectedCity);
    // console.log('==================%%%==================', userData.selectedDistrict);
    // console.log('==================%%%==================', userData.selectedState);
    const { t } = useTranslation();
    const [currentaddres, setcurrentaddres] = useState('Select');
    const [profession, setprofession] = useState("Select");
    const [subprofession, setsubprofession] = useState("Select");
    const [maritialStatus, setmaritialStatus] = useState('Select');
    const [maritialstatusId, setmaritialstatusId] = useState('');
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
    const [currentcityid, securrenttcityid] = useState('');
    const [currentdistrictId, setcurrentdistrictId] = useState('');
    const [currentstateid, setcurrentstateid] = useState('');
    const [currentselectedState, setCurrentselectedState] = useState('');
    const [currentselectedDistrict, setCurrentselectedDistrict] = useState('');
    const [currentselectedCity, setCurrentselectedCity] = useState('');
    const [professiondata, setprofessiondata] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [citylistpicker, setcitylistpicker] = useState(null);
    const [redendering, setredendering] = useState(0);
    const [subprofessiondata, setsubprofessiondata] = useState([]);
    const [isAadharValid, setIsAadharValid] = useState(true);
    const [isPanValid, setIsPanValid] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTextFields, setShowTextFields] = useState(false);
    const [schmename, setschmename] = useState('');
    const [resonforlikingschme, setresonforlikingschme] = useState('');
    const [otherschemebrand2, setotherschemebrand2] = useState();
    const [whatyouliked2, setwhatyouliked2] = useState();
    const [otherschemebrand3, setotherschemebrand3] = useState();
    const [whatyouliked3, setwhatyouliked3] = useState();
    const [otherschemebrand4, setotherschemebrand4] = useState();
    const [whatyouliked4, setwhatyouliked4] = useState();
    const [otherschemebrand5, setotherschemebrand5] = useState();
    const [whatyouliked5, setwhatyouliked5] = useState();
    const [schemes, setSchemes] = useState([{ schmename: '', resonforlikingschme: '' }]);
    const [addttextfield, setaddttextfield] = useState(false);
    const isInitialMount = useRef(true);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [loading, setLoading] = useState(false);

    // const getsubprofession = async () => {
    //     try {

    //         const subprofession = await Getsubprofession();
    //         console.log('====================================');
    //         console.log(subprofession);
    //         console.log('====================================');
    //         setsubprofessiondata([subprofession[0], subprofession[1]]);

    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }

    // }

    const validateAadhar = (aadhar) => {
        // Use a regular expression to check if the Aadhar card number is valid.
        const aadharPattern = /^\d{12}$/;
        return aadharPattern.test(aadhar);
    };

    const handleAadharBlur = () => {
        const isValid = validateAadhar(aadharcardno);
        setIsAadharValid(isValid);
    };

    const validatePan = (pan) => {
        // Use a regular expression to check if the PAN card number is valid.
        const panPattern = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
        return panPattern.test(pan);
    };

    const handlePanBlur = () => {
        const upperCasePan = pancardno.toUpperCase(); // Convert to uppercase
        const isValid = validatePan(upperCasePan);
        setIsPanValid(isValid);
        setpancardno(upperCasePan); // Update the state with uppercase value
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
            console.log("<><><><><>IF NO HAPPENING THIS ", secondData.distId);
            securrenttcityid(secondData.cityId);
            setcurrentdistrictId(secondData.distId);
            setcurrentstateid(secondData.stateId);


            const cityData = await getCityDataForDistrict(secondData.distId);
            // console.log('City Data:', cityData);
            setcitylistpicker(cityData);
            setCurrentselectedState(secondData.stateName);


            setCurrentselectedDistrict(secondData.distName);
            setcurrentdistrictId(secondData.distId);
            console.log('================INSDE FETCH PINCODE FUNCTION ====================');
            console.log(currentdistrictId);
            console.log(currentstateid);
            console.log(currentcityid);
            console.log('====================================');
        } catch (error) {
            console.error('Error in Page 1:', error);
        } finally {
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

    //===================START OF RETRIVING DATA FROM ASYNC STORAGE=======================================//
    const retrieveData = async () => {
        try {
            setIsLoading(true);
            const data = await AsyncStorage.getItem('previewSummaryData');
            if (data) {
                const retrievedData = JSON.parse(data);

                // Set the state variables with the retrieved data
                console.log('=============CCAME FROM THE PREVIOUS ONCE RUN=======================');
                console.log(retrievedData.fullData.NewUserKycData.currentaddres);
                console.log('====================================');
                if (retrievedData.fullData.NewUserKycData.currentaddres === null) {
                    setcurrentaddres('Select');
                }
                else if (retrievedData.fullData.NewUserKycData.currentaddres === "no") {
                    setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres);
                    setpincode(retrievedData.fullData.NewUserKycData.pinCode)
                    setaddress(retrievedData.fullData.NewUserKycData.address);
                    setstreet(retrievedData.fullData.NewUserKycData.street);
                    setlandmark(retrievedData.fullData.NewUserKycData.landmark);
                    setpincode(retrievedData.fullData.NewUserKycData.pinCode)
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
                    securrenttcityid(retrievedData.fullData.NewUserKycData.currentcityid);
                    setcurrentdistrictId(retrievedData.fullData.NewUserKycData.districtId);
                    setcurrentstateid(retrievedData.fullData.NewUserKycData.currentstateid);
                    // setcitylistpicker(retrievedData.fullData.NewUserKycData.currentselectedCity);

                }
                if (retrievedData.fullData.NewUserKycData.currentaddres === 'yes') {
                    console.log("===>>ON FOIRST", currentaddres);
                    setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres)
                    setpincode(retrievedData.fullData.userData.pincode.toString())
                    setaddress(retrievedData.fullData.userData.address);
                    setstreet(retrievedData.fullData.userData.street);
                    setlandmark(retrievedData.fullData.userData.landmark);
                    setCurrentselectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                    setCurrentselectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                    setCurrentselectedState(retrievedData.fullData.NewUserKycData.currentselectedState);
                    // setpincode(retrievedData.fullData.userData.pinCode)
                    // setaddress(retrievedData.fullData.NewUserKycData.address);
                    // setstreet(retrievedData.fullData.NewUserKycData.street);
                    // setlandmark(retrievedData.fullData.NewUserKycData.landmark);

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

                    securrenttcityid(retrievedData.fullData.userData.permananetcityid);
                    setcurrentdistrictId(retrievedData.fullData.userData.permananetdistrictId);
                    setcurrentstateid(retrievedData.fullData.userData.permananetsateid);


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
                    setcurrentaddres(retrievedData.fullData.NewUserKycData.currentaddres);
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
                console.log("<><><><><><><><><><><><>", retrievedData.fullData.NewUserKycData.currentselectedCity);
                console.log("<><><><><><><><><><><><>", retrievedData.fullData.NewUserKycData.pincode);

            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    function pincodefunction(text) {


        if (currentaddres === 'no' && text.length >= 2) {

            fetchPincodeSuggestions(text);
            setOpen(true);
        }
        setpincode(text)

    }
    //===================END OF RETRIVING DATA FROM ASYNC STORAGE=======================================//
    useEffect(() => {
        retrieveData();
        Gettingprofession();
        // getsubprofession();
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
        subprofession,
        maritialStatus,
        maritialstatusId,
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
        currentcityid,
        currentdistrictId,
        currentstateid,
    };

    async function updateNewUserKycDataInPreviewSummary(NewUserKycData) {
        try {
            // setIsLoading(true);
            // Retrieve the existing 'previewSummaryData' from AsyncStorage
            const previewSummaryDataString = await AsyncStorage.getItem('previewSummaryData');

            if (previewSummaryDataString) {
                // Parse the JSON string to an object
                const previewSummaryData = JSON.parse(previewSummaryDataString);

                // Ensure that the object structure is properly initialized
                if (!previewSummaryData.fullData) {
                    previewSummaryData.fullData = {};
                }

                // Ensure that the object structure for 'NewUserKycData' is properly initialized
                if (!previewSummaryData.fullData.NewUserKycData) {
                    previewSummaryData.fullData.NewUserKycData = {};
                }

                // Update the 'NewUserKycData' property directly with the provided 'newUserData'
                previewSummaryData.fullData.NewUserKycData = NewUserKycData;

                // Convert the updated object back to a JSON string
                const updatedPreviewSummaryDataString = JSON.stringify(previewSummaryData);

                // Save the updated 'previewSummaryData' back to AsyncStorage
                await AsyncStorage.setItem('previewSummaryData', updatedPreviewSummaryDataString);

                console.log('Updated NewUserKycData in previewSummaryData:', NewUserKycData);
            } else {
                console.log('No previewSummaryData found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error updating NewUserKycData in previewSummaryData:', error);
        } finally {
            // setIsLoading(false);
        }
    }


    //Combine user data and form data into one object
    const fullData = {
        userData,
        NewUserKycData,
    };
    //================================VALIDATION FUNCTION AND NAVIAGTION ON NEXT PAGE ==============================================//
    const validateFields = async () => {
        if (!currentaddres || currentaddres === "Select") {
            setIsPopupVisible(true);
            setPopupMessage('Select current address same as Permanent address or not.');
            return false;
        }
        if (!address) {
            setIsPopupVisible(true);
            setPopupMessage('Please enter your current address.');
            return false;
        }
        if (!street) {
            setIsPopupVisible(true);
            setPopupMessage('Please enter street colony or locality name.');
            return false;
        }
        if (!pincode && pincode != null) {
            console.log("))))))", pincode);
            setIsPopupVisible(true);
            setPopupMessage('Please enter a pincode and select a pincode to get state and district');
            return false;
        }
        if (!profession || profession === "Select") {
            setIsPopupVisible(true);
            setPopupMessage('Profession field is empty. Please fill it.');
            return false;
        }
        if (!maritialStatus || maritialStatus === '') {
            setIsPopupVisible(true);
            setPopupMessage('Marital Status field is empty. Please fill it.');
            return false;
        }
        if (!loyalty || loyalty === 'Select') {
            setIsPopupVisible(true);
            setPopupMessage('Loyalty field is empty. Please fill it.');
            return false;
        }
        if (!annualincome) {
            setIsPopupVisible(true);
            setPopupMessage('Annual Business potenial field is empty. Please fill it.');
            return false;
        }
        if (!selfieData) {
            setIsPopupVisible(true);
            setPopupMessage('Please upload your selfie');
            return false;
        }
        if (!aadharcardno) {
            setIsPopupVisible(true);
            setPopupMessage('Aadhar Card Number field is empty. Please fill it.');
            return false;
        }


        if (!idProofFrontData) {
            setIsPopupVisible(true);
            setPopupMessage('Aadhar Front Image not taken.');
            return false;
        }
        if (!idProofBackData) {
            setIsPopupVisible(true);
            setPopupMessage('Aadhar Back Image not taken.');
            return false;
        }
        // if (!panData) {
        //     setPopupMessage('PAN Card Photo field is empty. Please fill it.');
        //     return false;
        // }
        if (pancardno) {
            if (pancardno.length < 10) {
                setIsPopupVisible(true);
                setPopupMessage('Please enter a valid PAN Card Number.');
                return false;
            }

            if (!validatePan(pancardno)) {
                setIsPopupVisible(true);
                setPopupMessage('Please enter a valid PAN Card Number.');
                return false;
            }
        }

        //  if (!landmark) {
        //     setPopupMessage('landmark field is empty. Please fill it.');
        //     return false;
        // }

        if (!currentselectedCity) {
            console.log(")))))))))))))", currentselectedCity);
            setIsPopupVisible(true);
            setPopupMessage(' Current City field is empty. Please fill it.');
            return false;
        }
        if (!currentselectedDistrict) {
            console.log(")))))))))))))", currentselectedDistrict);
            setIsPopupVisible(true);
            setPopupMessage('Current District field is empty. Please fill it.');
            return false;
        }
        if (!currentselectedState) {
            console.log(")))))))))))))", currentselectedState);
            setIsPopupVisible(true);
            setPopupMessage('Current State field is empty. Please fill it.');
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
            updateNewUserKycDataInPreviewSummary(NewUserKycData);
            const updatedValue = await AsyncStorage.getItem('previewSummaryData');
            console.log('Updated Value in AsyncStorage (previewSummaryData +++++NEWUSERkYC++++++++++++):', updatedValue);
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
    const handleButtonPress = () => {
        setaddttextfield(true);
    };


    const handleInputChange = (index, fieldName, value) => {
        const updatedSchemes = [...schemes];
        updatedSchemes[index][fieldName] = value;
        setSchemes(updatedSchemes);
    };

    const handleIconButtonPress = () => {
        // Add a new set of text inputs
        if (schemes.length < 5) {
            setSchemes([...schemes, { schmename: '', resonforlikingschme: '' }]);
        }
    };





    return (
        <SafeAreaView>
            <ScrollView >
                <View >
                    <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
                        <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
                        <View style={{ margin: 20, flexDirection: 'column', padding: 10, height: height / 10, Left: 10, }}>
                            <Text style={{ color: 'grey' }}>New User</Text>
                            <Text style={{ color: 'grey' }}>Rishta ID</Text>
                            <Text style={{ color: 'grey' }}>Mobile No.</Text>
                        </View>

                    </View>
                    {isLoading == true ? <View style={{ flex: 1 }}>

                        <Loader isLoading={isLoading} />
                    </View> : null}
                    {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                        <Text>{popupMessage}</Text>
                        {/* // <Text>ICORRECT OTP</Text> */}
                    </Popup>
                    )}
                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('strings:is_current_address_different')}</Text>
                    <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={currentaddres}
                            onValueChange={(itemValue, itemIndex) => {
                                setcurrentaddres(itemValue);
                                // Set text input values to null when "Yes" is selected
                                if (itemValue == 'no') {
                                    setaddress('');
                                    setstreet('');
                                    setlandmark('');
                                    setpincode('');
                                    setCurrentselectedState('');
                                    setCurrentselectedDistrict('');
                                    setCurrentselectedCity('');
                                    setcurrentstateid('');
                                    setcurrentdistrictId('');
                                    securrenttcityid('');
                                    //setcitylistpicker('');


                                }
                                if (itemValue == 'yes') {


                                    setaddress(userData.address);
                                    setstreet(userData.street);
                                    setlandmark(userData.landmark);
                                    setpincode(userData.pincode);
                                    setCurrentselectedCity(userData.selectedCity);
                                    setCurrentselectedDistrict(userData.selectedDistrict);
                                    setCurrentselectedState(userData.selectedState);
                                    setcurrentstateid(userData.permananetsateid);
                                    setcurrentdistrictId(userData.permananetdistrictId);
                                    securrenttcityid(userData.permananetcityid);
                                    console.log('====================================');
                                    console.log(userData.pincode);
                                    console.log(pincode);





                                    // console.log('====================####================', currentselectedCity);
                                    //  console.log('====================####================', currentselectedDistrict);
                                    //  console.log('====================####================', currentselectedState);
                                }
                            }}>
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="yes" value="yes" />
                            <Picker.Item label="no" value="no" />
                        </Picker>

                    </View>

                    {currentaddres == 'Select' ? <></> : <>
                        <FloatingLabelInput


                            label="Current House Flat/block no"


                            editable={currentaddres === 'no'}
                            keyboardType='default'
                            value={address}
                            onChangeText={(text) => setaddress(text)}
                            containerStyles={styles.input}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10
                            }}



                        />
                        <FloatingLabelInput

                            editable={currentaddres == 'no'}
                            label="Current Street/ Colony/Locality Name *"


                            keyboardType='default'
                            value={street}
                            onChangeText={(text) => setstreet(text)}
                            containerStyles={styles.input}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10
                            }}
                        />
                        <FloatingLabelInput

                            editable={currentaddres == 'no'}
                            label="Landmark"


                            keyboardType='default'
                            value={landmark}
                            onChangeText={(text) => setlandmark(text)}
                            containerStyles={styles.input}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10
                            }}
                        />
                        <Text style={{ color: 'black', marginLeft: 23, }}>{t('strings:lbl_pin_code_mandatory')}</Text>
                        {currentaddres === 'yes' ? <Text style={styles.input}>{userData.pincode}</Text>


                            :

                            <>

                                <DropDownPicker
                                    mode="BADGE"
                                    showBadgeDot={true}
                                    searchable={true}
                                    loading={isLoading}
                                    label={value}
                                    placeholder={pincode === null ? 'Search Pincode' : `Searched Pincode: ${pincode}`}
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
                                    value={pincode}
                                    onChangeItem={(item) => {

                                        setpincode(item.value);
                                    }}
                                    onChangeSearchText={(text) => pincodefunction(text)}
                                    dropDownContainerStyle={{
                                        width: width / 1.1,
                                        height: height / 5,
                                        padding: 10,
                                        left: 20,
                                        top: 60,
                                        borderWidth: 0.5,
                                        borderTopWidth: 0,
                                        justifyContent: 'center',
                                        elevation: 0,
                                        backgroundColor: "#D3D3D3"
                                    }}
                                    style={{
                                        backgroundColor: 'white',
                                        elevation: 50,
                                        opacity: 0.9,
                                        borderWidth: 0.6,
                                        margin: 20,
                                        width: width / 1.1,
                                        height: height / 15,
                                        alignSelf: 'center',
                                        bottom: 10,
                                        elevation: 0,
                                        margintop: 50,
                                    }}
                                />



                            </>}

                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_state')}</Text>
                        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
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
                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('strings:select_district')}</Text>
                        <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>



                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedDistrict}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedDistrict}</Text>}

                        </View>

                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('strings:select_city')}</Text>
                        {currentaddres === 'no' || currentselectedCity === null ? <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
                            <Picker
                                mode='model'
                                style={{ color: 'black' }}
                                selectedValue={currentselectedCity}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedItem = citylistpicker[itemIndex];
                                    setCurrentselectedCity(itemValue);
                                    securrenttcityid(selectedItem.id);
                                }}>
                                <Picker.Item label="Select" value='' />
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

                        </View> : <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>



                            {currentaddres === 'yes' ? <Text style={{ color: 'black', margin: 15 }}>{userData.selectedCity}</Text> :
                                <Text style={{ color: 'black', margin: 15 }}>{currentselectedCity}</Text>}

                        </View>}
                    </>}

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_profession')}</Text>

                    <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
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


                    {/* <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={subprofession}
                            onValueChange={(itemValue, itemIndex) =>
                                setsubprofession(itemValue)
                            }>
                            <Picker.Item label="Select" value="" />
                            {subprofessiondata.map(item => (
                                <Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
                            ))}

                        </Picker>

                    </View> */}
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_marital_status')}</Text>

                    <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={maritialStatus}
                            onValueChange={(itemValue, itemIndex) => {
                                // setmaritialstatusId(itemValue) 
                                setmaritialStatus(itemValue);

                            }
                            }>
                            <Picker.Item label="Select" value="0" />
                            <Picker.Item label="Married" value="Married" />
                            <Picker.Item label=" Unmarried" value="Unmarried" />


                        </Picker>

                    </View>


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:already_enrolled_into_loyalty_scheme')}</Text>

                    <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


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
                        <FloatingLabelInput

                            label="If yes please mention Scheme and brand name "
                            value={schmename}
                            onChangeText={(text) => setschmename(text)}
                            keyboardType='default'

                            containerStyles={styles.input}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10
                            }}


                        />


                        : null
                    }

                    {loyalty == 'Yes' ?
                        <FloatingLabelInput

                            label="If yes what you liked about the program *"
                            value={resonforlikingschme}
                            onChangeText={(text) => setresonforlikingschme(text)}
                            keyboardType='default'
                            containerStyles={styles.input}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10
                            }}


                        />


                        : null
                    }



                    {/* <View>
                        {loyalty == 'Yes' && schemes.map((scheme, index) => (
                            <View key={index} style={styles.schemeContainer}>
                                <FloatingLabelInput
                                    label="If yes please mention Scheme and brand name"
                                    value={scheme.schmename}
                                    onChangeText={(text) => handleInputChange(index, 'schmename', text)}
                                    keyboardType='default'
                                    containerStyles={styles.input}
                                    staticLabel
                                    labelStyles={styles.labelStyles}
                                    inputStyles={{
                                        color: 'black',
                                        paddingHorizontal: 10
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <FloatingLabelInput
                                        label="If yes what you liked about the program *"
                                        value={scheme.resonforlikingschme}
                                        onChangeText={(text) => handleInputChange(index, 'resonforlikingschme', text)}
                                        keyboardType='default'
                                        containerStyles={styles.input}
                                        staticLabel
                                        labelStyles={styles.labelStyles}
                                        inputStyles={{
                                            color: 'black',
                                            paddingHorizontal: 10
                                        }}
                                    />
                                    <IconButton
                                        icon="camera"
                                        size={20}
                                        onPress={handleIconButtonPress}
                                    />
                                </View>
                            </View>
                        ))}
                    </View> */}



                    <FloatingLabelInput

                        label={t('strings:annual_business_potential')}
                        value={annualincome}
                        onChangeText={(text) => setannualincome(text)}
                        keyboardType='number-pad'
                        containerStyles={styles.input}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_update_your_selfie')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginBottom: 5, }}>

                        <View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25, borderColor: 'grey', borderWidth: 0.8 }}>
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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:update_aadhar_voter_id_dl_front')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginBottom: 5, }}>

                        <View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25, borderColor: 'grey', borderWidth: 0.8 }}>

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

                    <Text style={{ color: 'black', marginLeft: 24, marginTop: 5 }}>{t('strings:update_aadhar_voter_id_dl_back')}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 10, marginBottom: 5, }}>

                        <View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25, borderColor: 'grey', borderWidth: 0.8 }}>
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
                    <View>

                        <FloatingLabelInput

                            label={t('strings:update_aadhar_voter_id_dl_manually')}
                            value={aadharcardno}
                            onChangeText={(text) => setaadharcardno(text)}
                            keyboardType='number-pad'

                            containerStyles={[styles.input]}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: isAadharValid ? 'black' : 'red',
                                paddingHorizontal: 10,
                            }}
                            onBlur={handleAadharBlur}

                            maxLength={12}
                        />
                        {!isAadharValid && (
                            <Text style={{ color: 'red', left: 20, }}>Please enter a valid Aadhar card number.</Text>
                        )}
                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 12 }}>{t('strings:update_pan_card_front')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, }}>

                        <View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25, bottom: 10, borderColor: 'grey', borderWidth: 0.8 }}>
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
                    <View>
                        <FloatingLabelInput

                            label={t('strings:update_pan_number_manually')}
                            value={pancardno}
                            onChangeText={(text) => setpancardno(text)}
                            keyboardType='default'

                            containerStyles={[styles.input,]}
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: isPanValid ? 'black' : 'red',
                                paddingHorizontal: 10,
                            }}

                            onBlur={handlePanBlur}
                            maxLength={10}
                        />
                        {!isPanValid && (
                            <Text style={{ color: 'red', left: 20, }}>Please enter a valid PAN card number.</Text>
                        )}
                    </View>
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
    schemeContainer: {
        marginVertical: 10,
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
        marginVertical: 10,
        bottom: -5
    },
    labelStyles: {
        backgroundColor: 'transparent',
        margin: 14,
    },
})