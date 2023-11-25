import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../../../../colors'
import { height, width } from '../../../utils/dimensions'
import { Avatar, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IconButton, } from 'react-native-paper';


import DatePicker from '../../../components/DatePicker';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageWithModal from '../../../components/ImageWithModal';
import { fetchPinCodeData, PincodedetailList, GetProfession, Citylist, Getsubprofession, getUserProfile, sendFile, getFile, UpdateUserProfile } from '../../../utils/apiservice';
// import Popup from '../../../components/Popup';
// import Loader from '../../../components/Loader';



const EditProfile = () => {


    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const [gender, setGender] = useState("");
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDate1, setSelectedDate1] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const [SelfieData, setSelfieData] = useState(null);
    const [selfieuuidnew, setselfieuuidnew] = useState(null);
    const [Idcardfront, setIdcardfront] = useState(null);
    const [Idcardback, setIdcardback] = useState(null);
    const [pancarddata, setpancarddata] = useState(null);

    const [selfieemodal, setselfieemodal] = useState(false);
    const [professiondata, setprofessiondata] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [citylistpicker, setcitylistpicker] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [select, setselect] = useState();
    const [data, setData] = useState();
    const [userName, setUserName] = useState('');
    const [userCode, setUserCode] = useState('');
    const [userImage, setUserImage] = useState('');
    const [loyalty, setloyalty] = useState('Select');
    const [form1, setform1] = useState({
        "preferedLanguage": "",
        "name": "",
        "dateofbirth": "",
        "number": "",
        "WhatappNo": "",
        "email": "",
        "parmanentaddress": "",
        "permanantStreet": "",
        "permanantlandmark": "",
        "permanantcity": "",
        "permanentdistrict": "",
        "permanentstate": "",
        "permanentpincode": "",
        "permananetcityid": "",
        "permanantdistrictId": "",
        "permanantstateId": "",
        "pincode": "",
        "gender": "",
    })



    const [form2, setform2] = useState({

        "currentaddressselections": "",
        "curremtaddress": "",
        "curretnstreet": "",
        "currentlandmark": "",
        "currentpincode": "",
        "currentCity": "",
        "currentdistrict": "",
        "currentstate": "",
        "currentcityid": "",
        "currentdistrictId": "",
        "cuurentstateid": "",
        "profession": "",
        "martialStatus": "",
        "alreadyenrolled": "",
        "annualbusiness": "",
        "IdProoftype": "",
        "idproofnumber": "",
        "pancard": "",
        "userprofession": "",

    })

    const [nominee, setnominee] = useState({
        "nomineename": "",
        "nomineemail": "",
        "nomineenumber": "",
        "nomineedateofbirth": "",
        "nomineeaddress": "",
        "nomineerealtionship": "",
    })
    const handleFieldChange = (fieldName, value) => {
        setform1((prevForm1) => ({
            ...prevForm1,
            [fieldName]: value,
        }));
    };

    const handlefiledChangeform2 = (fieldName, value) => {
        setform2((prevFrom2) => ({
            ...prevFrom2,
            [fieldName]: value,
        }));
    }

    const handlefiledchnage3 = (fieldName, value) => {
        setnominee((prevform3) => ({
            ...prevform3,
            [fieldName]: value,

        }));
    }
    const [schemes, setSchemes] = useState([{ schmename: '', resonforlikingschme: '' }]);
    const [schemeData, setSchemeData] = useState({
        1: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
        2: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
        3: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
        4: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
        5: { otherSchemeBrand: '', abtOtherSchemeLiked: '' },
    });

    const handleInputChangeschemes = (schemeNumber, field, value) => {
        setSchemeData((prevData) => ({
            ...prevData,
            [schemeNumber]: {
                ...prevData[schemeNumber],
                [field]: value,
            },

        }));
        console.log('Updated schemeData:', schemeData);
    };

    const handleIconButtonPress = () => {
        // Add a new set of text inputs
        if (schemes.length < 5) {
            setSchemes([...schemes, { schmename: '', resonforlikingschme: '' }]);
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
            // setLoading(false);
        }

    }

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            // setSelectedDate(selectedDate);
            // handleFieldChange("dateofbirth", selectedDate)}
            handleFieldChange("dateofbirth", selectedDate);

            setShowDatePicker(false);
        }
        setShowDatePicker(false);
    };
    const handleDateChange2 = (event, selectedDate1) => {
        if (event.type === 'set') {
            //  setSelectedDate(selectedDate);
            // handleFieldChange("dateofbirth", selectedDate)}
            handlefiledchnage3("nomineedateofbirth", selectedDate1);

            //setShowDatePicker(false);
        }
        setShowDatePicker1(false);
    };

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
    };
    const handleShowDatePicker1 = () => {
        setShowDatePicker1(true);
    };
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
                    setSelfieData(newPhoto.uri);
                    // console.log(SelfieData);
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

    const openImagePicker = async (documentType, onCapture) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
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
                        setSelfieData(newPhoto.uri);
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

    async function fetchDataForPinCode1(pincode) {
        setIsLoading(true);
        try {
            const data = await fetchPinCodeData(pincode);
            console.log('Fetching data for pincode API CALL:', typeof pincode);
            const pincodeid = data[0].pinCodeId; // Declare the variable using 'const'
            console.log('Pin Code Data:', pincodeid);

            const secondData = await PincodedetailList(pincodeid);
            console.log("<><><><><>IF NO HAPPENING THIS ", secondData.distId);
            securrenttcityid(secondData.cityId);
            // setcurrentdistrictId(secondData.distId);
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
            setIsLoading(false);
        }
    }
    //========================eND OF FUNCTION========GETTTING DISTRICT AND STATE NAME WITH PINCODEID ========================//

    // ===============================================GETTING SUGGESTION=====/// FOR PINCODE======================//
    const fetchPincodeSuggestions = async (pincode) => {
        setIsLoading(true);
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

            setIsLoading(false);
        }
    };

    function pincodefunction(text) {


        if (text.length >= 2) {

            fetchPincodeSuggestions(text);
            setOpen(true);
        }
        handlefiledChangeform2("currentaddresspincode", text)

    }
    useEffect(() => {

        //  Gettingprofession();
        AsyncStorage.getItem('userImage').then((userimage) => {
            setUserImage(userimage);
        });
        AsyncStorage.getItem('name').then((name) => {
            setUserName(name);
        });
        AsyncStorage.getItem('userCode').then((code) => {
            setUserCode(code);
        });
        getUserProfile()
            .then(response => response.json())
            .then(responseData => {
                console.log("<><><Inise the edit profile", responseData);
                setData(responseData);
                setUserName(responseData.name);
                setUserCode(responseData.userCode);
                setGender(responseData.gender);
                console.log("##############", gender);

                const parseDate = (dateString) => {
                    const months = {
                        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
                    };

                    const [day, month, year] = dateString.split(' ');
                    return new Date(year, months[month], day);
                };
                const nomineeDate = parseDate(responseData.bankDetail.nomineeDob)
                const dobDate = parseDate(responseData.dob);
                setSelectedDate(dobDate);
                if (responseData.bankDetail.nomineeDob != null || "undefined") {
                    setSelectedDate1(" ");
                } else {
                    setSelectedDate1(nomineeDate);
                }


                if (responseData.currPinCode == responseData.pinCode) {

                    setform2(prevForm2 => ({
                        ...prevForm2,
                        currentaddressselections: "yes" || "",
                    }))

                } else {
                    setform2(prevForm2 => ({
                        ...prevForm2,
                        currentaddressselections: "no" || "",
                    }))

                }



                // console.log("?????????????????????", nomineeDate);
                setform1(prevForm1 => ({
                    ...prevForm1,
                    preferedLanguage: responseData.preferredLanguage || "",
                    name: responseData.name || "",
                    gender: responseData.gender || "",
                    dateofbirth: dobDate || "",
                    number: responseData.contactNo || "",
                    WhatappNo: responseData.whatsappNo || "",
                    parmanentaddress: responseData.permanentAddress || "",
                    permanantStreet: responseData.streetAndLocality || "",
                    permanantlandmark: responseData.landmark || "",
                    permanantcity: responseData.city || "",
                    permanentdistrict: responseData.dist || "",
                    permanentstate: responseData.state || "",
                    permanantcity: responseData.city || "",
                    pincode: responseData.pinCode || "",
                    permananetcityid: responseData.cityId || "",
                    permanantdistrictId: responseData.distId || "",
                    permanantstateId: responseData.stateId || "",


                }));
                setform2(prevform2 => ({
                    ...prevform2,
                    curremtaddress: responseData.currentAddress || "",
                    curretnstreet: responseData.currStreetAndLocality || "",
                    currentlandmark: responseData.currLandmark || "",
                    currentpincode: responseData.currPinCode || "",
                    currentCity: responseData.currCity || "",
                    currentdistrict: responseData.currDist || "",
                    currentstate: responseData.currState || "",
                    currentcityid: responseData.currCityId || "",
                    currentdistrictId: responseData.currDistId || "",
                    cuurentstateid: responseData.currStateId || "",
                    profession: responseData.profession || "",
                    martialStatus: responseData.maritalStatus || "",
                    alreadyenrolled: responseData.enrolledOtherSchemeYesNo || "",

                    annualbusiness: responseData.annualBusinessPotential || "",
                    //IdProoftype: responseData.
                    pancard: responseData.kycDetails.panCardNo || "",
                    currentaddressselections: responseData.currPinCode == responseData.pinCode ? "Yes" : "No" || " ",
                    userprofession: responseData.userProfession || "",




                }))

                setloyalty(responseData.enrolledOtherSchemeYesNo == "Yes" ? "Yes" : "No")
                console.log("Business Potential", loyalty);


                setnominee(nomineform => ({
                    ...nomineform,
                    nomineename: responseData.bankDetail.nomineeName || "",
                    nomineemail: responseData.bankDetail.nomineeEmail || "",
                    nomineenumber: responseData.bankDetail.nomineeMobileNo || "",
                    nomineedateofbirth: nomineeDate || "",
                    nomineeaddress: responseData.bankDetail.nomineeAdd || "",
                    nomineerealtionship: responseData.bankDetail.nomineeRelation || "",



                }))
                fetchAndSetImageData(responseData.kycDetails.selfie, 'PROFILE', 1);
                fetchAndSetImageData(responseData.kycDetails.aadharOrVoterOrDlBack, 'ID_CARD_FRONT', 1);
                fetchAndSetImageData(responseData.kycDetails.aadharOrVoterOrDlBack, 'ID_CARD_BACK', 1);
                fetchAndSetImageData(responseData.kycDetails.panCardFront, 'PAN_CARD_FRONT', 1);



                // console.log("<><><", SelfieData);
                // console.log("<><<><<><>><", responseData, "<><<<><><><><><><<><");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        Gettingprofession();



    }, [])
    const fetchAndSetImageData = async (uuid, imageRelated, userRole) => {
        try {
            // setIsLoading(true)
            const response = await getFile(uuid, imageRelated, userRole);
            const imageUrl = response.url;


            switch (imageRelated) {
                case 'ID_CARD_FRONT':
                    setIdcardfront(imageUrl);
                    break;
                case 'ID_CARD_BACK':
                    setIdcardback(imageUrl);
                    break;
                case 'PAN_CARD_FRONT':
                    setpancarddata(imageUrl);
                    break;
                case 'PROFILE':
                    setSelfieData(imageUrl);
                    break;

                default:
                    console.warn(`Unhandled imageRelated value: ${imageRelated}`);
            }

            // console.log(`Data set for ${imageRelated} (${uuid}):`, imageUrl);
            return response;
        } catch (error) {
            console.error(`Error getting file for ${imageRelated} (${uuid}):`, error);
            throw error;
        } finally {
            // setIsLoading(false);
        }
    };
    const uploadFiles = async (fileDataArray) => {

        // console.log("", IdProofFrontData);
        // console.log("", IdProofFrontData);
        // console.log("", SelfieData);
        // console.log("", PanData);

        // console.log("$$$$$$$$", aadharbackuuid);
        // console.log("$$$$$$$$", aadharfrontuuid);
        // console.log("$$$$$$$$", selfieuuid);
        // console.log("$$$$$$$$", pancarduuid);

        try {
            const responses = [];
            for (const fileData of fileDataArray) {
                const { imageRelated, file } = fileData;
                console.log("inside api uplode files", file);

                if (file) {
                    const formData = new FormData();


                    formData.append('file', {
                        uri: file,
                        type: 'image/' + file.split('/').pop().split('.').pop(),
                        name: file.split('/').pop().split('.').pop(),

                    });
                    formData.append('image_related', imageRelated);
                    formData.append('USER_ROLE', "1");

                    //   console.log("<><><><><FROM DATA  ><><><", formData);

                    const response = await sendFile(formData);
                    console.log("<><><><><FROM API GET FILE  ><><><", response);
                    responses.push(response.data);
                }
            }

            return responses;
        } catch (error) {


            console.error('Error sending files:', error);
            throw error;
        }
    };

    const triggerupdateprofile = async () => {
        try {
            setIsLoading(true);
            const filesToUpload = [

                { imageRelated: 'PROFILE', file: SelfieData },

            ];

            // Filter out files with null data
            const validFilesToUpload = filesToUpload.filter(fileData => fileData.file !== null);

            if (validFilesToUpload.length >= 0) {
                const responses = await uploadFiles(validFilesToUpload);

                // Extract and store entityUid values in separate state variables
                responses.forEach((response, index) => {
                    switch (validFilesToUpload[index].imageRelated) {

                        case 'PROFILE':
                            setselfieuuidnew(response.entityUid);
                            console.log("just going insde ", selfieuuidnew);
                            break;
                        default:
                            break;
                    }

                });

                if (selfieuuidnew != 'undefined' && selfieuuidnew != null) {
                    updateuseprofile();
                }
                else {

                }
            } else {
                console.log('No valid files to upload.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const updateuseprofile = async () => {
        const profilebody = {
            "appVersionCode": "",
            "retailerAppVersionCode": "",
            "egvEnabled": "",
            "otpType": "",
            "welcomePointsMsg": "0",
            "ecardPath": "E-Card_Unavailable.pdf",
            "userId": "1",
            "password": "",
            "inAllow": "",
            "userCode": userCode,
            "emailId": form1.email,
            "enrolledOtherScheme": "",
            "enrolledOtherSchemeYesNo": form2.alreadyenrolled,
            "maritalStatus": form2.martialStatus,
            "maritalStatusId": "",
            "distId": form1.permanantdistrictId,
            "cityId": form1.permananetcityid,
            "addDiff": "",
            "houseFlatNo": form1.parmanentaddress,
            "userProfession": form2.userprofession,
            "professionId": "",
            "subProfessionId": "",
            "profession": form2.profession,
            "loginOtpUserName": "",
            "mobileNo": form1.number,
            "otp": "",
            "preferredLanguage": form1.preferedLanguage,
            "preferredLanguagePos": "",
            "referralCode": "",
            "nameOfReferee": "",
            "name": form1.name,
            "gender": form2.gender,
            "genderPos": "",
            "dob": form1.dateofbirth,
            "contactNo": form1.number,
            "whatsappNo": form1.WhatappNo,
            "permanentAddress": form1.parmanentaddress,
            "streetAndLocality": form1.permanantStreet,
            "landmark": form1.permanantlandmark,
            "city": form1.permanantcity,
            "dist": form1.permanentdistrict,
            "state": form1.permanentstate,
            "stateId": form1.permanantstateId,
            "pinCode": form1.pincode,
            "currentAddress": form2.curremtaddress,
            "currStreetAndLocality": form2.curretnstreet,
            "currLandmark": form2.currentlandmark,
            "currCity": form2.currentCity,
            "currCityId": form2.currentcityid,
            "currDistId": form2.currentdistrictId,
            "currDist": form2.currentdistrict,
            "currState": form2.currentstate,
            "currStateId": form2.cuurentstateid,
            "currPinCode": form2.currentpincode,
            "otherCity": "",
            "otherCurrCity": "",
            "otherSchemeBrand": "",
            "abtOtherSchemeLiked": "",
            "otherSchemeBrand2": "",
            "abtOtherSchemeLiked2": "",
            "otherSchemeBrand3": "",
            "abtOtherSchemeLiked3": "",
            "otherSchemeBrand4": "",
            "abtOtherSchemeLiked4": "",
            "otherSchemeBrand5": "",
            "abtOtherSchemeLiked5": "",
            "annualBusinessPotential": form2.annualBusinessPotential,



            "bankDetail": {
                "errorMessage": "",
                "bankId": "",
                "bankAccNo": "",
                "bankAccHolderName": "",
                "bankAccType": "",
                "bankAccTypePos": "",
                "bankNameAndBranch": "",
                "branchAddress": "",
                "bankIfsc": "",
                "nomineeName": nominee.nomineename,
                "nomineeDob": nominee.nomineedateofbirth,
                "checkPhoto": "",
                "nomineeMobileNo": nominee.nomineenumber,
                "nomineeEmail": nominee.nomineemail,
                "nomineeAdd": nominee.nomineeaddress,
                "nomineeRelation": nominee.nomineerealtionship,
                "nomineeAccNo": "",
                "bankDataPresent": "",

            },

            "pointsSummary": {
                "pointsBalance": "",
                "redeemedPoints": "",
                "numberOfScan": "",
                "tdsPoints": "",
                "schemePoints": "",
                "totalPointsRedeemed": "",
                "totalPointsEarned": "",

            },

            "kycDetails": {
                "kycFlag": "",
                "userId": "",
                "kycIdName": "",
                "kycId": "",
                "selfie": selfieuuidnew,
                "aadharOrVoterOrDLFront": "",
                "aadharOrVoterOrDlBack": "",
                "aadharOrVoterOrDlNo": "",
                "panCardFront": "",
                "panCardBack": "",
                "panCardNo": "",
                "gstFront": "",
                "gstNo": "",
                "gstYesNo": "",

            },

            "rejectedReasonsStr": "",
            "roleId": "",
            "gstNo": "",
            "gstYesNo": "",
            "gstPic": "",
            "categoryDealInID": "",
            "categoryDealIn": "",
            "aspireGift": "",
            "firmName": "",
            "tierFlag": "",
            "fcmToken": "",
            "active": "",
            "airCoolerEnabled": "",


            "welcomeBanner": {
                "code": "",
                "textMessage": "",
                "videoPath": "",
                "imgPath": "",
                "vdoText": "",

            },

            "updateAccount": "",
            "islead": "",
            "diffAcc": ""

        };

        try {
            console.log("@@@@@@@@@@@@@@@@@@", profilebody);
            const resposne = await UpdateUserProfile(profilebody);
            console.log("@@@@@@@@@@@@@@@@@@", resposne);



        } catch (error) {
            console.log("Error in updating user profile ", error);

        } finally {

        }
    }

    //  const baseurl = 'https://www.vguardrishta.com/img/appImages/Profile/';
    return (
        <><ScrollView style={styles.mainWrapper}>
            <View style={styles.flexBox}>
                <View style={styles.ImageProfile}>
                    <Image source={{ uri: SelfieData }} style={{ width: '100%', height: '100%', borderRadius: 50 }} resizeMode='cover' />
                </View>
                <View style={{ margin: 10, backgroundColor: 'yellow' }}></View>
                <View style={styles.profileText}>
                    <Text style={styles.textDetail}>{userName}</Text>
                    <Text style={styles.textDetail}>{userCode}</Text>
                </View>
            </View>
            {/* <View style={{ backgroundColor: 'red', height: height, flexDirection: 'column', justifyContent: 'space-around', padding: 10 }}> */}
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', }}>
                <FloatingLabelInput
                    label={t('strings:lbl_preferred_language')}
                    staticLabel
                    maxLength={30}
                    editable={false}
                    value={form1.preferedLanguage}
                    // onChangeText={(text) => setSelectedLanguage(text)}
                    keyboardType='default'

                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />
                <FloatingLabelInput
                    label={t('strings:name')}
                    value={form1.name}
                    keyboardType="default"
                    //   onChangeText={value => setname(value)}
                    staticLabel
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={{
                        color: 'black',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                    }} />

                <Text style={{ color: 'black', marginLeft: 24, }}>{t('strings:lbl_gender_mandatory')}</Text>

                <View style={{ backgroundColor: '#fff', height: height / 17, margin: 10, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: '#D3D3D3' }}>
                    <Picker
                        mode='dropdown'
                        style={{ color: 'black' }}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) => {
                            // console.log("Selected Value: ", itemValue)
                            setGender(itemValue)
                        }}>
                        <Picker.Item label="Select Gender*" value=" " />
                        <Picker.Item label="Male" value="Male " />
                        <Picker.Item label="Female" value="Female " />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>

                </View>

                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_date_of_birth_mandatory')}</Text>
                <View style={{
                    flexDirection: 'row',

                    borderWidth: 2,

                    borderColor: '#D3D3D3',
                    borderRadius: 10,

                    justifycontent: 'space-evenly',
                    margin: 10,
                    justifycontent: 'Space-between',
                    backgroundColor: '#fff'
                }}>

                    <DatePicker
                        date={form1.dateofbirth}
                        onDateChange={handleDateChange}
                        showDatePicker={showDatePicker}
                        onShowDatePicker={handleShowDatePicker} />
                    <Icon name="keyboard-o" size={25} color="grey" style={{ margin: 18, left: width / 2.5, postion: 'relative' }} />


                </View>

                <FloatingLabelInput

                    label={t('strings:contact_no')}
                    value={form1.number}

                    keyboardType='number-pad'
                    editable={false}
                    maxLength={10}
                    staticLabel
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle} />
                <FloatingLabelInput
                    label={t('strings:_is_what_s_app_contact_same_as_above')}
                    maxLength={10}
                    value={form1.WhatappNo}
                    onChangeText={(text) => handleFieldChange('WhatappNo', text)}
                    keyboardType='number-pad'
                    staticLabel
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle} />
                <FloatingLabelInput
                    label={t('strings:email')}
                    keyboardType='email-address'
                    value={form1.email}
                    onChangeText={(text) => handleFieldChange("email", text)}
                    staticLabel
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle} />
                <Text>Permanent Address</Text>
                <FloatingLabelInput

                    label={t('strings:lbl_permanent_address_mandatory')}


                    keyboardType='default'
                    maxLength={128}
                    value={form1.parmanentaddress}
                    staticLabel
                    // onChangeText={(text) => setaddress(text)}
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle} />
                <FloatingLabelInput
                    label={t('strings:lbl_street_locality')}
                    maxLength={128}
                    keyboardType='default'
                    value={form1.permanantStreet}
                    // onChangeText={(text) => setstreet(text)}
                    containerStyles={styles.input}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />
                <FloatingLabelInput
                    label={t('strings:lbl_landmark')}

                    staticLabel
                    maxLength={60}
                    keyboardType='default'
                    value={form1.permanantlandmark} // Set the value of the input to the 'text' state

                    // onChangeText={(text) => setlandmark(text)}
                    containerStyles={styles.input}
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />

                <FloatingLabelInput
                    containerStyles={styles.input}
                    label={t('strings:select_city')}

                    keyboardType="default"
                    value={form1.permanantcity}
                    //   onChangeText={(text) => [setSelectedState(text),
                    //   setOpen(true)]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />

                <FloatingLabelInput
                    containerStyles={styles.input}
                    label={t('strings:select_district')}
                    keyboardType="default"
                    value={form1.permanentdistrict}
                    //   onChangeText={(text) => [setSelectedState(text),
                    //   setOpen(true)]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />
                <FloatingLabelInput
                    containerStyles={styles.input}
                    label={t('strings:select_state')}

                    keyboardType="default"
                    value={form1.permanentstate}
                    //   onChangeText={(text) => [setSelectedState(text),
                    //   setOpen(true)]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={{
                        color: 'grey',
                        paddingHorizontal: 15,
                    }} />
                <FloatingLabelInput
                    containerStyles={styles.input}
                    label={t('auth:newuser:Secondpagepincode')}

                    keyboardType="default"
                    value={form1.pincode}
                    //   onChangeText={(text) => [setSelectedState(text),
                    //   setOpen(true)]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                />

                <Text style={{ color: 'black', marginLeft: 15, margin: 5, color: "grey", fontSize: responsiveFontSize(1.8) }}>{t('strings:is_current_address_different')}</Text>

                <View style={{
                    backgroundColor: '#fff', height: height / 17, margin: 10, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: '#D3D3D3', borderRadius: 10,
                }}>
                    <Picker
                        mode='dropdown'
                        style={{ color: 'black' }}
                        selectedValue={form2.currentaddressselections}
                        onValueChange={(itemValue, itemIndex) => {
                            handlefiledChangeform2("currentaddressselections", itemValue)

                            // if (itemValue == 'no') {
                            //     handlefiledChangeform2("currentaddressselections", itemValue);
                            // }
                            // if (itemValue == 'yes') {
                            //     handlefiledChangeform2("form2.currentaddressselections", form1.parmanentaddress);
                            //     handlefiledChangeform2("curretnstreet", form1.permanantStreet);
                            //     handlefiledChangeform2("currentlandmark", form1.permanantlandmark);
                            //     handlefiledChangeform2("currentpincode", form1.permanentpincode);
                            //     handlefiledChangeform2("currentCity", form1.permanantcity);
                            //     handlefiledChangeform2("currentdistrict", form1.permanentdistrict);
                            //     handlefiledChangeform2("currentstate", form1.permanentstate);
                            // }
                        }}
                    >
                        <Picker.Item label="Select" value="Select" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>

                {form2.currentaddressselections == 'select' || form2.currentaddressselections == 'yes' ? <></> : <>
                    <FloatingLabelInput
                        label="Current House Flat/block no"
                        editable={form2.currentaddressselections === 'no'}
                        keyboardType='default'
                        value={form2.curremtaddress}
                        onChangeText={(text) => handlefiledChangeform2("curremtaddress", text)}
                        containerStyles={styles.input}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={styles.inputStyle}
                    />
                    <FloatingLabelInput
                        editable={form2.currentaddressselections == 'no'}
                        label="Current Street/ Colony/Locality Name *"
                        keyboardType='default'
                        value={form2.curretnstreet}
                        onChangeText={(text) => handlefiledChangeform2("curretnstreet", text)}
                        containerStyles={styles.input}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={styles.inputStyle}

                    />
                    <FloatingLabelInput

                        editable={form2.currentaddressselections == 'no'}
                        label="Landmark"
                        keyboardType='default'
                        value={form2.currentlandmark}
                        onChangeText={(text) => handlefiledChangeform2("currentlandmark", text)}
                        containerStyles={styles.input}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={styles.inputStyle}
                    />
                </>}
                {form2.currentaddressselections === 'no' ? <></>
                    :
                    <>
                        <DropDownPicker
                            mode="BADGE"
                            showBadgeDot={true}
                            searchable={true}
                            loading={isLoading}
                            label={value}
                            placeholder={form2.currentpincode == "" ? 'Search Pincode' : `Searched Pincode: ${form2.currentpincode}`}
                            searchablePlaceholder="Search Pincode"
                            translation={t('auth:newuser:Secondpagepincode')}
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
                            value={form2.currentpincode}
                            onChangeItem={(item) => {

                                setpincode(item.value)
                            }}
                            onChangeSearchText={(text) => pincodefunction(text)}
                            dropDownContainerStyle={{
                                width: width / 1.2,

                                height: height / 5,
                                padding: 10,
                                left: 14,
                                borderRadius: 5,

                                borderWidth: 0,
                                elevation: 0,
                                backgroundColor: '#D3D3D3'
                            }}
                            style={{
                                backgroundColor: 'white',
                                elevation: 50,
                                opacity: 0.9,
                                borderWidth: 1.5,
                                borderColor: "#D3D3D3",
                                width: width / 1.2,
                                height: height / 15,
                                alignSelf: 'center',
                                bottom: 10,
                                elevation: 0,
                                margintop: 50,
                                margin: 20,
                            }} />
                    </>}
                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_profession')}</Text>
                <View style={{
                    backgroundColor: '#fff', height: height / 17, margin: 10, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: '#D3D3D3', borderRadius: 10,
                }}>

                    <Picker
                        mode='dropdown'
                        style={{ color: 'black' }}
                        selectedValue={form2.profession}
                        onValueChange={(itemValue, itemIndex) => handlefiledChangeform2("profession", itemValue)}
                    >
                        <Picker.Item label="Select" value="" />
                        {professiondata.map(item => (
                            <Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
                        ))}

                    </Picker>

                </View>

                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:select_marital_status')}</Text>
                <View style={{
                    backgroundColor: '#fff', height: height / 17, margin: 10, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: '#D3D3D3', borderRadius: 10,
                }}>
                    <Picker
                        mode='dropdown'
                        style={{ color: 'black' }}
                        selectedValue={form2.martialStatus}
                        onValueChange={(itemValue, itemIndex) => handlefiledChangeform2("martialStatus", itemValue)}
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Married" value="1" />
                        <Picker.Item label=" Unmarried" value="0" />


                    </Picker>



                </View>

                <FloatingLabelInput

                    label="Annual business potential*"
                    value={form2.annualbusiness.toString()}
                    onChangeText={(text) => handlefiledChangeform2("annualbusiness", text)}
                    keyboardType='number-pad'


                    containerStyles={[styles.input]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={styles.inputStyle}
                    // onBlur={handleAadharBlur}
                    maxLength={12} />


                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_update_your_selfie')}</Text>
                <View style={styles.imagecontainereditprofile}>
                    <View
                        style={styles.imagepicker}
                    >

                        {SelfieData === null ?
                            <TouchableOpacity onPress={() => setselfieemodal(true)}>
                                <><Text style={{ color: 'black', top: 15 }}>Update your selfie*</Text></>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => setselfieemodal(true)} color={'grey'} style={{ width: width / 1.8, margin: 5 }}>
                                <View>
                                    <Text style={{ color: "#D3D3D3", marginTop: 10, width: width / 5 }}>Selfie</Text>
                                </View>

                            </TouchableOpacity>}

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={selfieemodal}
                            style={styles.modalcontainer}
                            hardwareAccelerated={true}
                            opacity={0.3}>
                            <View style={{
                                width: width / 1.80, borderRadius: 5, alignSelf: 'center', height: height / 8, top: height / 2.8,
                                margin: 20,
                                backgroundColor: '#D3D3D3',
                                borderRadius: 20,
                                padding: 10,
                                // alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 100,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}>
                                <Picker
                                    mode="dropdown"
                                    placeholder={'Update Your Selfie *'}
                                    style={{ color: 'black' }}
                                    selectedValue={select}
                                    onValueChange={(itemValue, itemIndex) => {
                                        if (itemValue === "Open camera") {
                                            openCamera("Selfie", (documentType, newPhoto) => {
                                                // Handle the captured selfie here
                                                console.log('Captured selfie:', newPhoto)
                                                setselfieemodal(false)
                                            })
                                        } else if (itemValue === "Open Image picker") {
                                            openImagePicker('Selfie', (documentType, newPhoto) => {
                                                // Handle the selected selfie here
                                                setselfieemodal(false)
                                                console.log('Selected selfie:', newPhoto)
                                            })
                                        }
                                    }}
                                >
                                    <Picker.Item label="Select Action" value="" />
                                    <Picker.Item label="Select Photo from gallery" value="Open Image picker" />
                                    <Picker.Item label="Capture Photo from camera" value="Open camera" />

                                </Picker>
                                <Button mode="text" onPress={() => setselfieemodal(false)}>
                                    close
                                </Button>
                            </View>
                        </Modal>





                    </View>

                    <ImageWithModal imageUri={SelfieData} style={styles.noimagepicker} />







                </View>
                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 5 }}>{t('strings:already_enrolled_into_loyalty_scheme')}</Text>

                <View style={{ backgroundColor: '#fff', height: height / 15, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: '#D3D3D3', width: width / 1.2, alignSelf: 'center', borderRadius: 10 }}>


                    <Picker
                        style={{ color: 'black' }}
                        selectedValue={form2.alreadyenrolled}
                        onValueChange={(itemValue, itemIndex) => handlefiledChangeform2("alreadyenrolled", itemValue)}
                    >
                        <Picker.Item label="Select" value="Select" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label=" No" value="No" />



                    </Picker>

                </View>

                {form2.alreadyenrolled == "Yes" ?
                    <View>
                        {form2.alreadyenrolled == "Yes" &&
                            schemes.map((scheme, index) => (
                                <View key={index} style={styles.schemeContainer}>
                                    <FloatingLabelInput
                                        label={`Scheme ${index + 1} Brand Name`}
                                        value={schemeData[index + 1].otherSchemeBrand}
                                        onChangeText={(text) => handleInputChangeschemes(index + 1, `otherSchemeBrand`, text)}
                                        keyboardType="default"
                                        containerStyles={styles.input}
                                        staticLabel
                                        labelStyles={styles.labelStyles}
                                        inputStyles={{
                                            color: 'black',
                                            paddingHorizontal: 10,
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row' }}>
                                        <FloatingLabelInput
                                            label={`Reason for liking Scheme ${index + 1}`}
                                            value={schemeData[index + 1].abtOtherSchemeLiked}
                                            onChangeText={(text) => handleInputChangeschemes(index + 1, `abtOtherSchemeLiked`, text)}
                                            keyboardType="default"
                                            containerStyles={styles.input}
                                            staticLabel
                                            labelStyles={styles.labelStyles}
                                            inputStyles={{
                                                color: 'black',
                                                paddingHorizontal: 10,
                                            }}
                                        />
                                        <IconButton style={styles.iconButton} icon="plus" size={20} onPress={handleIconButtonPress} />
                                    </View>
                                </View>
                            ))}
                    </View> : null}


                <FloatingLabelInput

                    label="ID Proof type"
                    // value={aadharcardno}
                    // onChangeText={(text) => setaadharcardno(text)}
                    keyboardType='number-pad'
                    editable={false}

                    containerStyles={[styles.input]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={{
                        // color: isAadharValid ? 'black' : 'red',
                        paddingHorizontal: 15,
                    }}
                    // onBlur={handleAadharBlur}
                    maxLength={12} />

                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:update_aadhar_voter_id_dl_front')}</Text>
                <View style={styles.imagecontainereditprofile}>
                    <Text style={{ color: '#D3D3D3', }}>IdProof*(Front)</Text>
                    {Idcardfront != null ? <ImageWithModal imageUri={Idcardfront} style={styles.noimagepicker} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={styles.noimagepicker} />}
                </View>
                <Text style={{ color: 'black', marginLeft: 24, marginTop: 5 }}>{t('strings:update_aadhar_voter_id_dl_back')}</Text>
                <View style={styles.imagecontainereditprofile}>
                    <Text style={{ color: '#D3D3D3', }}>IdProof*(Front)</Text>
                    {Idcardback != null ? <ImageWithModal imageUri={Idcardback} style={styles.noimagepicker} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={styles.noimagepicker} />}
                </View>
                <FloatingLabelInput

                    label={t('strings:update_aadhar_voter_id_dl_manually')}

                    // value={aadharcardno}
                    // onChangeText={(text) => setaadharcardno(text)}
                    keyboardType='number-pad'
                    editable={false}

                    containerStyles={[styles.input]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={{
                        // color: isAadharValid ? 'black' : 'red',
                        paddingHorizontal: 15,
                    }}
                    // onBlur={handleAadharBlur}
                    maxLength={12} />


                <Text style={{ color: 'black', marginLeft: 24, marginBottom: 12 }}>{t('strings:update_pan_card_front')}</Text>
                <View style={styles.imagecontainereditprofile}>
                    <Text style={{ color: '#D3D3D3', }}>Pan Card(Front)</Text>
                    {pancarddata != null ? <ImageWithModal imageUri={pancarddata} style={{ marginBottom: 10 }} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={styles.noimagepicker} />}
                </View>

                <FloatingLabelInput

                    label={t('strings:update_pan_number_manually')}

                    // value={aadharcardno}
                    // onChangeText={(text) => setaadharcardno(text)}
                    keyboardType='number-pad'

                    containerStyles={[styles.input]}
                    staticLabel
                    labelStyles={styles.labelStyles}
                    inputStyles={{
                        // color: isAadharValid ? 'black' : 'red',
                        paddingHorizontal: 15,
                    }}
                    // onBlur={handleAadharBlur}
                    maxLength={12} />

                <View style={{ marginTop: 30 }}>

                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('strings:lbl_name_of_nominee')}


                        keyboardType='default'
                        value={nominee.nomineename}
                        onChangeText={(text) => handlefiledchnage3("nomineename", text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 15,
                        }} />
                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:NomineeeDob')}</Text>
                    <View style={{
                        flexDirection: 'row',

                        borderWidth: 2,

                        borderColor: '#D3D3D3',
                        borderRadius: 10,

                        justifycontent: 'space-evenly',
                        margin: 10,
                        justifycontent: 'Space-between',
                        backgroundColor: '#fff',
                    }}>


                        <DatePicker
                            date={nominee.nomineedateofbirth}
                            onDateChange={handleDateChange2}
                            showDatePicker={showDatePicker1}
                            onShowDatePicker={handleShowDatePicker1} />
                        <Icon name="keyboard-o" size={20} color="grey" style={{ margin: 18, left: width / 2.5, postion: 'relative' }} />

                    </View>


                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('strings:lbl_mobile_number')}
                        keyboardType='number-pad'
                        value={nominee.nomineenumber}
                        onChangeText={(text) => handlefiledchnage3("nomineenumber", text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 15,
                        }}
                        maxLength={10} />


                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('strings:lbl_email')}
                        keyboardType='email-address'
                        value={nominee.nomineemail}
                        onChangeText={(text) => handlefiledchnage3("nomineemail", text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 15,
                        }} />



                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('strings:lbl_address')}


                        keyboardType='email-address'
                        value={nominee.nomineeaddress}
                        onChangeText={(text) => handlefiledchnage3("nomineeaddress", text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 15,
                        }} />

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label="Relatioship with you"
                        keyboardType='default'
                        value={nominee.nomineerealtionship}
                        onChangeText={(text) => handlefiledchnage3("nomineerealtionship", text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={styles.inputStyle} />
                    <View style={{ height: height / 15 }}></View>
                </View>

            </View>
            {/* <View style={{ backgroundColor: "yellow", position: 'absolute', top: 3100 }}> */}
            {/* <Buttons
        label="Submit"
        onPress={() => {
            // Check if the data is valid before navigating
            //  navigation.navigate('NewUserKyc', { userData: userData })
            // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
            //validateAndNavigate()
            // callUploadAndThenAnotherFunction();
        }}
        variant="filled" // or any other variant you want to use
        width={width / 1} // specify the width
        icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
        iconWidth={50} // specify the icon width
        iconHeight={20} // specify the icon height
        iconGap={10}
    // specify the gap between the label and the icon
    /> */}
            {/* </View> */}


        </ScrollView >


            <View style={{ padding: 10, backgroundColor: "#fff", margintop: 10, alignItems: 'center' }}>
                <Buttons
                    label="Submit"
                    onPress={() => {

                        // callUploadAndThenAnotherFunction();
                        triggerupdateprofile();
                    }}
                    variant="filled"
                    width={width / 1.05}
                    icon={require('../../../assets/images/arrow.png')}
                    iconWidth={50}
                    iconHeight={20}
                    iconGap={10}
                />
            </View>

        </>




    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 25,

        backgroundColor: '#fff',

    },
    iconButton: {
        backgroundColor: colors.yellow, // Replace 'yourBackgroundColor' with the desired color
        borderRadius: 50,
        alignSelf: 'center',
    },
    viewProfile: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.7),
        margintop: 10,
    },
    ImageProfile: {
        height: 50,
        width: 50,
        backgroundColor: colors.lightGrey,
        borderRadius: 100,

    },
    textDetail: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },

    button: {
        backgroundColor: colors.yellow,
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(1),
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        borderRadius: 5
    },
    flexBox: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        padding: 10,
    },
    labelStyles: {
        backgroundColor: 'transparent',
        margin: 14,

        color: '#D3D3D3',
    },
    input: {
        padding: 5,
        height: height / 13.5,
        margin: 10,
        marginTop: 5,
        color: 'black',
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: 'grey',
        borderWidth: 1.8,
        borderwidth: 2,
        bottom: 0,
        borderRadius: 8,
        borderColor: "#D3D3D3",
    },
    imagepickercontainer: {
        flexDirection: 'row',
        width: width / 1.18,
        borderWidth: 2,
        borderColor: '#D3D3D3',
        borderRadius: 10,
        height: height / 16.5,
        margin: 10,
        justifycontent: 'space-evenly',
        backgroundColor: '#fff',
    },
    noimage: {
        width: width / 8,
        height: height / 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 5,
        left: width / 2.4,

    },
    noimagepicker: {
        width: width / 8,
        height: height / 20,
        backgroundColor: '#fff',
        borderRadius: 5,

        left: width / 1.4,
        // marginBottom: 150,
        bottom: 20
    },
    imagepicker: {
        backgroundColor: '#fff',
        height: height / 20,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 0,
        width: width / 1.75,

    },
    inputStyle: {

        paddingHorizontal: 20,
        paddingTop: 20,
        height: height / 15,
        color: "black",

    },
    picker: {
        backgroundColor: '#fff',
        height: height / 20,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'column',
        marginTop: 0,
        width: width / 1.75,
        marginTop: 5,
        paddingBottom: 5

    },
    pickercontainer: {
        flexDirection: 'row',
        width: width / 1.20,
        borderWidth: 2,

        borderColor: '#D3D3D3',
        borderRadius: 10,
        height: height / 16.5,

        margin: 10,
        justifycontent: 'Space-between',

    },
    imagecontainereditprofile: {
        flexDirection: 'row', padding: 5,
        height: height / 15,
        margin: 10,
        marginBottom: 10,
        paddingVertical: 1,

        color: 'black',
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: 'grey',
        borderWidth: 1.8,
        borderwidth: 2,
        bottom: 0,
        borderRadius: 8,
        borderColor: "#D3D3D3",
        justifyContent: 'space-between'
    },
    modalcontainer: { alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
})

export default EditProfile