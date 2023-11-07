import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, Modal, FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { GetProfession, sendFile, Appversion, RegisterNewUser } from '../../../utils/apiservice';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DatePicker from '../../../components/DatePicker';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useDataContext } from '../../../utils/appcontext';
import ImageWithModal from '../../../components/ImageWithModal';



import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './NewUserKyc';
import Popup from '../../../components/Popup';

const PreviewUserRegistration = ({ navigation, route }) => {

    const [selectedLanguage, setSelectedLanguage] = useState('English');
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
    const [currentaddress, setcurrentaddress] = useState('');
    const [currentstreet, setcurrentstreet] = useState('');
    const [currentlandmark, setcurrentlandmark] = useState('');

    const [currentpincode, setcurrentPincode] = useState('');
    const [currentselectedState, setcurrentSelectedState] = useState();
    const [currentselectedDistrict, setcurrentSelectedDistrict] = useState('');
    const [currentselectedCity, setcurrentSelectedCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [profession, setprofession] = useState('');
    const [professiondata, setprofessiondata] = useState([]);
    const [subprofession, setsubprofession] = useState();
    const [maritialStatus, setmaritialStatus] = useState('Select');

    const [loyalty, setloyalty] = useState('Select');
    const [annualincome, setannualincome] = useState('');
    const [selfieData, setSelfieData] = useState();
    const [idProofFrontData, setIdProofFrontData] = useState();
    const [idProofBackData, setIdProofBackData] = useState();
    const [panData, setPanData] = useState();
    const [Idprooftype, setIdprooftype] = useState('');
    const [aadharcardno, setaadharcardno] = useState('');
    const [pancardno, setpancardno] = useState('');
    const [checked, setChecked] = useState(false);
    const [accountnumber, setaccountnumber] = useState('');
    const [accountholdername, setaccountholdername] = useState('');
    const [chequeImage, setchequeImage] = useState();
    const [IFSC, setIFSC] = useState('');
    const [accounttype, setaccounttype] = useState('')
    const [appversion, setAppversion] = useState('');

    const [selectedbank, setselectedbank] = useState('');
    const [bankid, setbankid] = useState();
    const [validateallfieldforbank, setvalidateallfieldforbank] = useState(false);
    const [aadharfrontuuid, setaadharfrontuuid] = useState('');
    const [aadharbackuuid, setaadharbackuuid] = useState('');
    const [selfieeuuid, setselfieeuuid] = useState('');
    const [chequeImageuuid, setchequeimageuuid] = useState('');
    const [pancarduuid, setpancarduuid] = useState('');


    const [permanentcityid, setpermanentcityid] = useState('');
    const [permantdistrictid, setpermantdistrictid] = useState('');
    const [permananrstateid, setpermananrstateid] = useState('');
    const [currentcityid, setcurrentcityid] = useState('');
    const [currentdistrictid, setcurrentdistrictid] = useState('');
    const [currentstateid, setcurrentstateid] = useState('');


    const [nomineename, setnomineename] = useState('');
    const [nomineemobileno, setnomineemobileno] = useState('');
    const [nomineeemail, setnomineeemail] = useState('');
    const [nomineeaddress, setnomineeaddress] = useState('');
    const [nomineedate, setnomineedate] = useState('');
    const [previewData, setPreviewData] = useState(null);
    const [relationwithyou, setrelationwithyou] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const { PreviewSummaryData } = route.params;
    // console.log('==================%%%=PREVIEW SUMMARY=================', PreviewSummaryData);



    // console.log(KycData);
    // console.log('===============^^^^=====================', Userdata);
    const { t } = useTranslation();

    useEffect(() => {


        // Retrieve the data from AsyncStorage
        const retrieveData = async () => {
            try {

                const data = await AsyncStorage.getItem('previewSummaryData');

                if (data) {
                    // Parse the JSON string back into an object

                    const retrievedData = JSON.parse(data);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetsateid);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetcityid);
                    console.log("++++++++++++&&&&&&&&++DISTRACT++^^^^^^^^^^^^++++++++++", retrievedData.fullData.userData.permananetdistrictId);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentcityid);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentdistrictId);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData.fullData.NewUserKycData.currentstateid);
                    setSelectedLanguage(retrievedData.fullData.userData.selectedLanguage);
                    setGender(retrievedData.fullData.userData.gender);
                    setemail(retrievedData.fullData.userData.email);
                    setNumber(retrievedData.fullData.userData.number);
                    setwhatapp(retrievedData.fullData.userData.whatapp);
                    setaddress(retrievedData.fullData.userData.address);
                    setstreet(retrievedData.fullData.userData.street);
                    setlandmark(retrievedData.fullData.userData.landmark);
                    setSelectedDate(retrievedData.fullData.userData.selectedDate.toDateString());
                    setname(retrievedData.fullData.userData.name);
                    setPincode(retrievedData.fullData.userData.pincode.toString());
                    setSelectedState(retrievedData.fullData.userData.selectedState);
                    setSelectedDistrict(retrievedData.fullData.userData.selectedDistrict);
                    setSelectedCity(retrievedData.fullData.userData.selectedCity);

                    setcurrentaddress(retrievedData.fullData.NewUserKycData.address);
                    setcurrentstreet(retrievedData.fullData.NewUserKycData.street);
                    setcurrentlandmark(retrievedData.fullData.NewUserKycData.landmark);
                    setcurrentPincode(retrievedData.fullData.NewUserKycData.pincode);
                    setcurrentSelectedCity(retrievedData.fullData.NewUserKycData.currentselectedCity);
                    setcurrentSelectedDistrict(retrievedData.fullData.NewUserKycData.currentselectedDistrict);
                    setcurrentSelectedState(retrievedData.fullData.NewUserKycData.currentselectedState);

                    setpermananrstateid(retrievedData.fullData.userData.permananetsateid);
                    setpermantdistrictid(retrievedData.fullData.userData.permananetdistrictId);
                    setpermanentcityid(retrievedData.fullData.userData.permananetcityid);
                    setcurrentdistrictid(retrievedData.fullData.NewUserKycData.currentdistrictId);
                    setcurrentcityid(retrievedData.fullData.NewUserKycData.currentcityid);
                    setcurrentstateid(retrievedData.fullData.NewUserKycData.currentstateid);

                    //KYC DATA

                    setprofession(retrievedData.fullData.NewUserKycData.profession);
                    // setsubprofession(retrievedData.fullData.NewUserKycData.subprofession);
                    setmaritialStatus(retrievedData.fullData.NewUserKycData.maritialStatus);
                    setloyalty(retrievedData.fullData.NewUserKycData.loyalty);
                    setannualincome(retrievedData.fullData.NewUserKycData.annualincome);
                    setSelfieData(retrievedData.fullData.NewUserKycData.selfieData);
                    setIdProofFrontData(retrievedData.fullData.NewUserKycData.idProofFrontData);
                    setIdProofBackData(retrievedData.fullData.NewUserKycData.idProofBackData);
                    setPanData(retrievedData.fullData.NewUserKycData.panData);
                    setaadharcardno(retrievedData.fullData.NewUserKycData.aadharcardno);
                    setpancardno(retrievedData.fullData.NewUserKycData.pancardno);
                    setaccountnumber(retrievedData.BankDetailsAndNominee.accountnumber);
                    setaccountholdername(retrievedData.BankDetailsAndNominee.accountholdername);
                    setIFSC(retrievedData.BankDetailsAndNominee.IFSC);
                    setchequeImage(retrievedData.BankDetailsAndNominee.chequeImage)
                    setaccounttype(retrievedData.BankDetailsAndNominee.accounttype);
                    setselectedbank(retrievedData.BankDetailsAndNominee.selectedbank);
                    setbankid(retrievedData.BankDetailsAndNominee.bankId);
                    setnomineename(retrievedData.BankDetailsAndNominee.nomineename);
                    setnomineemobileno(retrievedData.BankDetailsAndNominee.nomineemobileno);
                    setnomineeemail(retrievedData.BankDetailsAndNominee.nomineeemail);
                    setnomineeaddress(retrievedData.BankDetailsAndNominee.nomineeaddress);
                    setrelationwithyou(retrievedData.BankDetailsAndNominee.relationship);
                    setnomineedate(retrievedData.BankDetailsAndNominee.nomineeselectedDate);
                    //  setnomineedate(retrievedData.BankDetailsAndNominee.nomineeselectedDate);

                }
            } catch (error) {
                console.error('Error retrieving data: ', error);
            } finally {

            }
        };

        retrieveData();

        // GettingAppversion();
        Gettingprofession();
    }, [previewData]);

    const updateDataInAsyncStorage = async () => {


        navigation.navigate("newUser");
    };

    const userbody = {
        "welcomePointsErrorCode": 0,
        // "userId": number,
        // "password": number,
        // "inAllow": 0,
        "emailId": email,
        "enrolledOtherScheme": 0,
        "maritalStatus": maritialStatus,
        "maritalStatusId": null,
        "distId": permantdistrictid,
        "cityId": permanentcityid,
        "addDiff": 1,
        // "userProfession": profession,
        "professionId": 1,
        //  "subProfessionId": 0,
        "profession": profession,
        // "loginOtpUserName": null,
        "mobileNo": number,
        "otp": "1111",
        "preferredLanguage": "English",
        "preferredLanguagePos": "1",
        "referralCode": "",
        "nameOfReferee": "",
        "name": name,
        "gender": gender,
        "genderPos": "1",
        "dob": selectedDate,
        "contactNo": number,
        "whatsappNo": number,
        "permanentAddress": address,
        "streetAndLocality": street,
        "landmark": landmark,
        "city": selectedCity,
        "dist": selectedDistrict,
        "state": selectedState,
        "stateId": permananrstateid,
        "pinCode": pincode,
        "currentAddress": currentaddress,
        "currStreetAndLocality": currentstreet,
        "currLandmark": currentlandmark,
        "currCity": currentselectedCity,
        "currCityId": currentcityid,
        "currDistId": currentdistrictid,
        "currDist": currentselectedDistrict,
        "currState": currentselectedState,
        "currStateId": currentstateid,
        "currPinCode": currentpincode,
        "currPincodeId": '',

        // "otherCity": null,
        // "otherCurrCity": null,
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
        "annualBusinessPotential": annualincome,
        "bankDetail": {
            "bankId": bankid,
            "bankAccNo": accountnumber,
            "bankAccHolderName": accountholdername,
            "bankAccType": accounttype,
            "bankAccTypePos": 1,
            "bankNameAndBranch": selectedbank,
            // "branchAddress": "",
            "bankIfsc": IFSC,
            "nomineeName": nomineename,
            "nomineeDob": nomineedate,
            "checkPhoto": chequeImageuuid,
            "nomineeMobileNo": nomineemobileno,
            "nomineeEmail": nomineeemail,
            "nomineeAdd": nomineeaddress,
            "nomineeRelation": relationwithyou,

        },

        "kycDetails": {
            "kycFlag": "0",
            // "userId": null,
            "kycIdName": "",
            "kycId": 1,
            "selfie": selfieeuuid,
            "aadharOrVoterOrDLFront": aadharbackuuid,
            "aadharOrVoterOrDlBack": aadharbackuuid,
            "aadharOrVoterOrDlNo": aadharcardno,
            "panCardFront": pancarduuid,
            "panCardNo": pancardno,

        },

    }





    const uploadFiles = async (fileDataArray) => {

        try {

            const responses = [];

            for (const fileData of fileDataArray) {
                const { imageRelated, file } = fileData;

                if (file) { // Check if the file is not null
                    const formData = new FormData();
                    formData.append('USER_ROLE', '1');
                    formData.append('image_related', imageRelated);
                    formData.append('file', {
                        uri: file.uri,
                        type: file.type,
                        name: file.name,
                    });

                    const response = await sendFile(formData);
                    responses.push(response.data);
                }
            }

            return responses;
        } catch (error) {
            console.error('Error sending files:', error);
            throw error;
        } finally {

        }
    };

    const callUploadAndThenAnotherFunction = async () => {
        try {

            const filesToUpload = [
                { imageRelated: 'ID_CARD_FRONT', file: idProofFrontData },
                { imageRelated: 'ID_CARD_BACK', file: idProofBackData },
                { imageRelated: 'PAN_CARD_FRONT', file: panData },
                { imageRelated: 'CHEQUE', file: chequeImage },
                // Add more files as needed
            ];

            // Filter out files with null data
            const validFilesToUpload = filesToUpload.filter(fileData => fileData.file !== null);

            if (validFilesToUpload.length > 0) {
                const responses = await uploadFiles(validFilesToUpload);

                // Extract and store entityUid values in separate state variables
                responses.forEach((response, index) => {
                    switch (validFilesToUpload[index].imageRelated) {
                        case 'ID_CARD_FRONT':
                            setaadharfrontuuid(response.entityUid);
                            break;
                        case 'ID_CARD_BACK':
                            setaadharbackuuid(response.entityUid);
                            break;
                        case 'PAN_CARD_FRONT':
                            setpancarduuid(response.entityUid);
                            break;
                        case 'CHEQUE':
                            setchequeimageuuid(response.entityUid);
                            break;
                        // Add more cases for other files if needed
                        default:
                            break;
                    }

                });

                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharfrontuuid,);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", aadharbackuuid);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", pancarduuid);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", chequeImageuuid);
                if (aadharfrontuuid !== null && aadharbackuuid !== null) {
                    registernewuser(userbody);
                }


                // console.log('API Responses:', responses);
                // console.log(aadharfrontuuid);
                // console.log('====================================');
                // console.log(aadharbackuuid);
                // console.log('====================================');


            } else {
                console.log('No valid files to upload.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {

        }
    };

    async function registernewuser() {
        try {
            //   console.log("+++++++++++++++++++++", userbody)
            setIsLoading(true);
            const response = await RegisterNewUser(userbody);

            if (response.message === 'Member registered successfully') {
                setIsPopupVisible(true);
                setPopupMessage(response.message);
                Alert.alert(response.message);
                navigation.navigate('login');
            } else {
                setIsPopupVisible(true);
                setPopupMessage(response.message);
            }
            //  console.log(response)

        } catch (error) {
            throw error;
            // console.error('Error while registering user:', error);

        } finally {
            setIsLoading(false);
        }

    }





    async function Gettingprofession(params) {

        try {

            const professionfromapi = await GetProfession();
            setprofessiondata([professionfromapi[0], professionfromapi[1], professionfromapi[2],]);
            console.log("==%%%%===", professiondata);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        finally {
            // After the API call (whether it succeeds or fails), hide the loader

        }

    }

    // async function GettingAppversion() {
    //     try {
    //         const response = await Appversion();
    //         console.log('====================================');
    //         console.log(response.data);
    //         console.log('====================================');
    //         setAppversion(response.data.toString());
    //     } catch (error) {
    //         throw error

    //     }

    // }

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View >
                    <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
                        <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
                        <View style={{ marginLeft: 40, flexDirection: 'column' }}>
                            <Text style={{ color: 'grey' }}>PreviewSummaryData</Text>
                            <Text style={{ color: 'grey' }}>Rishta ID</Text>
                            <Text style={{ color: 'grey' }}>Mobile No.</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1 }}>

                        <Loader isLoading={isLoading} />
                    </View>
                    {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                        <Text>{popupMessage}</Text>

                    </Popup>
                    )}

                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('auth:newuser:Preferedlanguage')}

                        maxLength={30}
                        editable={false}
                        value={selectedLanguage}
                        onChangeText={(text) => selectedLanguage(text)}
                        keyboardType='default'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Name</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('auth:newuser:Name')}

                        maxLength={30}
                        value={name}
                        editable={false}
                        onChangeText={(text) => setname(text)}
                        keyboardType='default'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />



                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('auth:newuser:Gender')}

                        maxLength={30}
                        value={gender}
                        editable={false}
                        onChangeText={(text) => setGender(text)}
                        keyboardType='default'
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />


                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label={t('auth:newuser:Date')}

                        maxLength={30}
                        value={selectedDate}
                        editable={false}
                        onChangeText={(text) => setSelectedDate(text)}
                        keyboardType='default'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />
                    {/* <TextcontainerStyles={styles.input}>{data.fullData.userData.selectedDate}</Text> */}
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Contact Number</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Contact')}
                        value={number}
                        // onChangeText={(text) => setNumber(text)}
                        keyboardType='number-pad'
                        editable={false}

                        maxLength={10}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />
                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Whatappconatctsame')}</Text>

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Whatapp')}
                        maxLength={10}
                        editable={false}
                        value={whatapp}
                        onChangeText={(text) => setwhatapp(text)}
                        keyboardType='number-pad'
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Email Address</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Email')}


                        keyboardType='email-address'
                        value={email}
                        editable={false}
                        onChangeText={(text) => setemail(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Permanentaddress')}


                        editable={false}
                        keyboardType='default'
                        maxLength={128}
                        value={address}
                        onChangeText={(text) => setaddress(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Street')}
                        editable={false}


                        maxLength={128}
                        keyboardType='default'
                        value={street}
                        onChangeText={(text) => setstreet(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Landmark')}
                        editable={false}


                        maxLength={60}
                        keyboardType='default'
                        value={landmark}
                        onChangeText={(text) => setlandmark(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />


                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:pincode')}</Text>

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:pincode')}
                        labelTextColor={"black"}
                        editable={false}
                        keyboardType="number-pad"
                        value={pincode}
                        onChangeText={(text) => setPincode(text)}
                        maxLength={6}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />



                    <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:State')}</Text>
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

                        <Text style={{ color: 'black', margin: 15 }}>{selectedCity}</Text>
                    </View>

                    <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>{t('auth:newuser:District')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

                        <Text style={{ color: 'black', margin: 15 }}>{selectedDistrict}</Text>


                    </View>

                    <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> {t('auth:newuser:City')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

                        <Text style={{ color: 'black', margin: 15 }}>{selectedState}</Text>
                    </View>

                    <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> Profession</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={profession}
                            onValueChange={(itemValue, itemIndex) =>
                                setprofession(itemValue)
                            }>
                            {professiondata.map(item => (
                                <Picker.Item key={item.professionId} label={item.professionName} value={item.professionName} />
                            ))}

                        </Picker>

                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Sub Profession</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Subprofession')}

                        maxLength={30}
                        value={subprofession}

                        onChangeText={(text) => setsubprofession(text)}
                        keyboardType='default'
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />

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

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Alreadyenroled')} </Text>
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

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('auth:newuser:Anualbusiness')}
                        value={annualincome}
                        onChangeText={(text) => setannualincome(text)}
                        keyboardType='number-pad'



                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                    />

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('auth:newuser:Selfie')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>


                        {selfieData != null ? <Text style={{ color: 'black', }}>{selfieData.name.substring(0, 30)}</Text> : null}
                        {selfieData != null ?
                            <ImageWithModal imageUri={selfieData.uri} name={selfieData.name} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}




                    </View>

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>Select Id Proof </Text>

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label="Aadhar Card"
                        value={Idprooftype}
                        onChangeText={(text) => setIdprooftype(text)}
                        keyboardType='number-pad'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCardFront')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {idProofFrontData != null ? <Text style={{ color: 'black', }}>{idProofFrontData.name.substring(0, 30)}</Text> : null}
                        {idProofFrontData != null ? <ImageWithModal imageUri={idProofFrontData.uri} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCardBack')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {idProofBackData != null ? <Text style={{ color: 'black', }}>{idProofBackData.name.substring(0, 30)}</Text> : null}
                        {idProofBackData != null ? <ImageWithModal imageUri={idProofBackData.uri} /> : <Image resizeMode="contain" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, }}>Aadhar Card No</Text>

                    <FloatingLabelInput
                        containerStyles={[styles.input]}
                        label="Aadhar Card No*"
                        value={aadharcardno}
                        onChangeText={(text) => setaadharcardno(text)}
                        keyboardType='number-pad'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                        maxLength={12}
                    />

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('auth:newuser:Pan')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {panData != null ? <Text style={{ color: 'black', }}>{panData.name.substring(0, 30)}</Text> : null}
                        {panData != null ? <ImageWithModal imageUri={panData.uri} /> : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Pan Card No</Text>

                    <FloatingLabelInput
                        containerStyles={[styles.input]}
                        label="Pan Card No*"
                        value={pancardno}
                        onChangeText={(text) => setpancardno(text)}
                        keyboardType='default'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                        maxLength={10}
                    />

                    <Text style={{ color: 'black', marginLeft: 20, }}> {t('auth:newuser:BankDetailsForAccount')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Account Number"


                        editable={false}
                        keyboardType='number-pad'
                        value={accountnumber}
                        onChangeText={(text) => setaccountnumber(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Account Holder Name</Text>

                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Account Holder Name"
                        editable={false}


                        keyboardType='default'
                        value={accountholdername}
                        onChangeText={(text) => setaccountholdername(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                        maxLength={50}
                    />
                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:SelectAccountype')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        editable={false}
                        label="Account Type"

                        keyboardType='default'
                        value={accounttype}
                        onChangeText={(text) => setaccounttype(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                        maxLength={20}
                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Bank')}</Text>

                    {selectedbank == '' ? <FloatingLabelInput
                        containerStyles={styles.input}
                        editable={false}
                        label="Selected Bank"


                        keyboardType='default'

                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                        maxLength={20}
                    /> : <FloatingLabelInput
                        containerStyles={styles.input}
                        editable={false}
                        label="Selected Bank"


                        keyboardType='default'

                        value={selectedbank}
                        onChangeText={(text) => setselectedbank(text)}
                        borderColor="gray"
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}
                        maxLength={20}
                    />}
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>IFSC Code</Text>

                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label="IFSC Code"
                        editable={false}


                        keyboardType='default'
                        value={IFSC}
                        onChangeText={(text) => setIFSC(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                        maxLength={20}
                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:UploadepassbookFront')}</Text>


                    <View style={{ backgroundColor: '#fff', height: height / 15, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {chequeImage != null ? <Text style={{ color: 'black', }}>{chequeImage.name.substring(0, 30)}</Text> : null}
                        {chequeImage != null ?

                            <Image resizeMode="cover" source={{ uri: chequeImage.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
                            : <Image resizeMode="cover" source={require("../../../assets/images/noimg.jpg")} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />

                        }
                    </View>




                    <Text style={{ color: 'black', marginLeft: 20, fontSize: responsiveFontSize(2) }}>{t('auth:newuser:NomineeDetails')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Name of Nominee"


                        editable={false}
                        keyboardType='default'
                        value={nomineename}
                        onChangeText={(text) => setnomineename(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}


                    />

                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:NomineeMobile')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Mobile No"


                        editable={false}
                        keyboardType='number-pad'
                        value={nomineemobileno}
                        onChangeText={(text) => setnomineemobileno(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />



                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:NomineeEmailAddress')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Email"
                        editable={false}


                        keyboardType='email-address'
                        value={nomineeemail}
                        onChangeText={(text) => setnomineeemail(text)}
                        borderColor="gray"
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:NomineeAddress')}</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Address"
                        editable={false}


                        keyboardType='email-address'
                        value={nomineeaddress}
                        onChangeText={(text) => setnomineeaddress(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>RelationShip with You</Text>
                    <FloatingLabelInput
                        containerStyles={styles.input}

                        label="Relationship with you"
                        editable={false}


                        keyboardType='default'
                        value={relationwithyou}
                        onChangeText={(text) => setrelationwithyou(text)}
                        staticLabel
                        labelStyles={styles.labelStyles}
                        inputStyles={{
                            color: 'black',
                            paddingHorizontal: 10,
                        }}

                    />

                    <View style={{ display: 'flex', width: width / 1, alignItems: 'center', marginVertical: 20, flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 10 }}>
                        <Buttons
                            label="Edit"
                            onPress={() => {
                                // Check if the data is valid before navigating
                                //  navigation.navigate('NewUserKyc', { userData: userData })
                                // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
                                //validateAndNavigate()
                                updateDataInAsyncStorage();
                            }}
                            variant="filled" // or any other variant you want to use
                            width={180} // specify the width
                            icon={require('../../../assets/images/edit.png')} // provide the path to your icon
                            iconWidth={40} // specify the icon width
                            iconHeight={25} // specify the icon height
                            iconGap={10}
                        // specify the gap between the label and the icon
                        />
                        <Buttons
                            label="Submit"
                            onPress={() => {
                                // Check if the data is valid before navigating
                                //  navigation.navigate('NewUserKyc', { userData: userData })
                                // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
                                //validateAndNavigate()
                                callUploadAndThenAnotherFunction();
                            }}
                            variant="filled" // or any other variant you want to use
                            width={180} // specify the width
                            icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
                            iconWidth={50} // specify the icon width
                            iconHeight={20} // specify the icon height
                            iconGap={10}
                        // specify the gap between the label and the icon
                        />


                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView >
        // <Text>Helo</Text>
    )
}

export default PreviewUserRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 5,
        height: height / 14,
        margin: 20,
        marginTop: 5,
        color: 'black',
        borderRadius: 5,
        backgroundColor: '#fff',
        bottom: -5,
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
    },
})