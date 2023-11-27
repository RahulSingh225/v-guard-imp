import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, Alert, Linking } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, Checkbox, Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { Getallbanks } from '../../../utils/apiservice';
import DatePicker from '../../../components/DatePicker';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import NeedHelp from "../../../components/NeedHelp";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from '../../../components/Popup';
import colors from '../../../../colors';
import Loader from '../../../components/Loader';
import { useTranslation } from 'react-i18next';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useDataContext } from '../../../utils/appcontext';



const NomineePage = ({ navigation, route }) => {

    // const { data, setData } = useDataContext();
    const { fullData } = route.params;
    //  console.log('==================%%%===INCOMING TO NOMINEE PAGE ===============', fullData);


    const { t } = useTranslation();
    // const [currentaddres, setcurrentaddres] = useState('Select');
    const [checked, setChecked] = useState(false);
    const [number, setnumber] = useState();
    const [accountnumber, setaccountnumber] = useState('');
    const [accountholdername, setaccountholdername] = useState(null);
    const [chequeImage, setchequeImage] = useState(null);
    const [IFSC, setIFSC] = useState(null);
    const [accounttype, setaccounttype] = useState("");

    const [selectedbank, setselectedbank] = useState('');
    const [allbankslist, setallbankslist] = useState(null);
    const [bankid, setbankid] = useState('');
    const [validateallfieldforbank, setvalidateallfieldforbank] = useState(false);
    const [relationship, setrelationship] = useState('')


    const [nomineename, setnomineename] = useState('');
    const [nomineemobileno, setnomineemobileno] = useState('');
    const [nomineeemail, setnomineeemail] = useState('');
    const [nomineeaddress, setnomineeaddress] = useState('');

    const [nomineeselectedDate, setnomineeSelectedDate] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDatenominee, setSelectedDatenominee] = useState();


    const handleDateChange = (event, selectedDatenominee) => {
        if (event.type === 'set') {
            setSelectedDatenominee(selectedDatenominee);
            // setnomineeSelectedDate(selectedDate);
            // setnomineeSelectedDate(selectedDate);


        }
        setShowDatePicker(false);
    };

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
    };





    const validateFields = async () => {
        const BankDetailsAndNominee = {
            accountnumber,
            accountholdername,
            chequeImage,
            IFSC,
            accounttype,
            selectedbank,
            nomineename,
            nomineemobileno,
            nomineeemail,
            nomineeaddress,
            relationship,
            selectedDatenominee,
            bankid,
        }
        const PreviewSummaryData = {
            BankDetailsAndNominee,
            fullData,

        }
        setvalidateallfieldforbank(false)

        // // Check for at least one field being entere


        if (checked) {

            // console.log(accountnumber);
            // console.log(accountholdername);
            // console.log(chequeImage);
            // console.log(IFSC);
            // console.log(accounttype);
            // console.log(selectedbank);

            if (
                accountnumber === '' &&
                accountholdername === null &&
                chequeImage === null &&
                IFSC === null &&
                accounttype == "" &&
                selectedbank == ''
            ) {
                console.log("<><><><>>", BankDetailsAndNominee);
                const dataToStore = JSON.stringify(PreviewSummaryData);
                await AsyncStorage.setItem("previewSummaryData", dataToStore);
                navigation.navigate("PreviewSummary");
            }
            else if (
                accountnumber !== '' &&
                accountholdername !== null &&
                chequeImage !== null &&
                IFSC !== null &&
                accounttype != "" &&
                selectedbank != ''
            ) {

                const dataToStore = JSON.stringify(PreviewSummaryData);
                await AsyncStorage.setItem("previewSummaryData", dataToStore);
                console.log("++++++++INSDE NOMINEE PAGE CONSLE BEFORE NAVIGATION++++++++$$$$$$", dataToStore);
                navigation.navigate("PreviewSummary");
            }
            else {

                // console.log(accountnumber);
                // console.log(accountholdername);
                // console.log(chequeImage);
                // console.log(IFSC);
                // console.log(accounttype);
                // console.log(selectedbank);
                setIsPopupVisible(true);
                setPopupMessage('Please fill compleate bank details.');

            }
        } else {
            setIsPopupVisible(true);
            setPopupMessage("Please agree to terms and conditions.");
        }
    };
    const openTermsAndConditions = () => {
        // Add the URL of your terms and conditions page
        const termsAndConditionsURL = "https://vguardrishta.com/tnc_retailer.html";

        // Open the URL in the device's default web browser
        Linking.openURL(termsAndConditionsURL);
    };

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
                    case 'cheque':
                        setchequeImage(newPhoto);
                        // console.log('====================================');
                        // console.log(chequeImage);
                        // console.log('====================================');
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
                case 'cheque':
                    setchequeImage(newPhoto);
                    console.log(chequeImage);
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


    useEffect(() => {

        const retrieveData = async () => {
            try {
                setIsLoading(true);
                const data = await AsyncStorage.getItem('previewSummaryData');
                if (data) {
                    const retrievedData = JSON.parse(data);
                    const selectedDatenomineeDate = new Date(retrievedData.BankDetailsAndNominee.selectedDatenominee);
                    const formattedDate = selectedDatenomineeDate.toLocaleDateString();
                    // console.log('Formatted Date:', formattedDate);


                    console.log('=============in nominee page=======================');
                    //  console.log(retrievedData.fullData.userData.number);
                    //  console.log('====================================');
                    setnumber(retrievedData.fullData.userData.number)
                    setaccountnumber(retrievedData.BankDetailsAndNominee.accountnumber);
                    setaccountholdername(retrievedData.BankDetailsAndNominee.accountholdername);
                    setchequeImage(retrievedData.BankDetailsAndNominee.chequeImage);
                    setIFSC(retrievedData.BankDetailsAndNominee.IFSC);
                    setaccounttype(retrievedData.BankDetailsAndNominee.accounttype);
                    setselectedbank(retrievedData.BankDetailsAndNominee.selectedbank);
                    // setSelectedDatenominee(retrievedData.BankDetailsAndNominee.selectedDatenominee.tolocalDateString());

                    setnomineename(retrievedData.BankDetailsAndNominee.nomineename);
                    setnomineemobileno(retrievedData.BankDetailsAndNominee.nomineemobileno);
                    setnomineeemail(retrievedData.BankDetailsAndNominee.nomineeemail);
                    setnomineeaddress(retrievedData.BankDetailsAndNominee.nomineeaddress);
                    setSelectedDatenominee(selectedDatenomineeDate);
                    setrelationship(retrievedData.BankDetailsAndNominee.relationship);
                    console.log('==============in nominee page======================');
                    console.log(selectedDatenominee);
                    console.log('====================================');
                }
            } catch (error) {
                console.error('Error retrieving data: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        retrieveData();
        if (allbankslist == null) {
            getallbanks();

        }
    }, [allbankslist])


    async function getallbanks() {
        try {
            const getallbanks = await Getallbanks();
            setallbankslist(getallbanks);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        finally {

        }
    }
    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: "white" }} >
                <View >
                    <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
                        <View style={{ margin: 20, flexDirection: 'column' }}>
                            <Text style={{ color: 'grey' }}>New User</Text>
                            <Text style={{ color: 'grey' }}>Rishta ID</Text>
                            <Text style={{ color: 'grey' }}>{number}</Text>
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
                    <Text style={{ color: 'black', marginLeft: 20, }}> {t('strings:lbl_bank_details')}</Text>
                    <View styles={styles.floatingcontainerstyle}>
                        <FloatingLabelInput
                            containerStyles={styles.input}

                            label={t('strings:lbl_account_number')}
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
                    </View>
                    <FloatingLabelInput
                        containerStyles={styles.input}
                        label={t('strings:lbl_account_holder_name')}
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
                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('strings:select_account_type')}</Text>
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: "#D3D3D3", width: width / 1.15 }}>
                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={accounttype}
                            onValueChange={(itemValue, itemIndex) =>
                                setaccounttype(itemValue)
                            }>
                            <Picker.Item label={t('strings:account_type:placeholder')} value="" />
                            <Picker.Item label={t('strings:account_type:current')} value="Current" />
                            <Picker.Item label={t('strings:account_type:saving')} value="Saving" />
                        </Picker>

                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:bank_name')}</Text>
                    <View style={{ backgroundColor: '#fff', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, borderWidth: 1.8, borderColor: "#D3D3D3", width: width / 1.15 }}>
                        <Picker
                            mode='model'
                            style={{ color: 'black' }}
                            selectedValue={selectedbank}
                            onValueChange={(itemValue, itemIndex) => {
                                const selectedItem = allbankslist[itemIndex];
                                setselectedbank(itemValue);
                                setbankid(selectedItem.bankId);
                                console.log("<><><><><><><><><>>", bankid);
                            }}>
                            <Picker.Item label="Select" value='' />
                            {Array.isArray(allbankslist) && allbankslist.length > 0 ? (
                                allbankslist.map(item => (
                                    <Picker.Item
                                        key={item.bankId}
                                        label={item.bankNameAndBranch}
                                        value={item.bankNameAndBranch}
                                    />
                                ))
                            ) : (
                                <Picker.Item label="Loading..." value="" />
                            )}
                        </Picker>
                    </View>
                    <View style={styles.floatingcontainerstyle}>
                        <FloatingLabelInput
                            containerStyles={styles.input}
                            label={t('strings:ifsc')}
                            keyboardType='default'
                            value={IFSC}
                            onChangeText={(text) => setIFSC(text)}
                            borderColor="gray"
                            staticLabel
                            labelStyles={styles.labelStyles}
                            inputStyles={{
                                color: 'black',
                                paddingHorizontal: 10,
                            }}
                            maxLength={20}
                        />
                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('strings:lbl_upload_cancelled_cheque')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', flexDirection: 'row', width: width / 1.15, bottom: 10, borderColor: '#D3D3D3', borderWidth: 2, elevation: 0, marginTop: 10, }}>
                            {chequeImage != null ? <Text style={{ color: 'black', paddingLeft: 10, }}>{chequeImage.name.substring(0, 30)}</Text> : null}
                            {chequeImage != null ? <TouchableOpacity onPress={() => openCamera('Pan', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })} >
                                <Image resizeMode="cover" source={{ uri: chequeImage.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
                            </TouchableOpacity> : <IconButton
                                icon="camera"
                                animated='true'

                                size={20}
                                onPress={() => openCamera('Cheque', (documentType, data) => {
                                    // Handle the captured data for the 'Selfie' document type here
                                })}
                                style={{ left: width / 1.35 }}
                            />}
                        </View>
                        <IconButton
                            icon="link"

                            size={20}
                            onPress={() => openImagePicker('cheque', (documentType, data) => {
                                // Handle the captured data for the 'Selfie' document type here
                            })}
                        />

                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: 'black', marginLeft: 20, fontSize: responsiveFontSize(2) }}>{t('strings:lbl_nominee_details')}</Text>
                        <View style={styles.floatingcontainerstyle}>
                            <FloatingLabelInput
                                containerStyles={styles.input}

                                label={t('strings:lbl_name_of_nominee')}
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
                        </View>
                        <Text style={{ color: 'black', marginLeft: 20, }}>Nomiee DOB</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderRadius: 5, flexDirection: 'column', marginTop: 0, width: width / 1.15, borderWidth: 1.8, borderColor: "#D3D3D3" }}>
                            <DatePicker
                                date={selectedDatenominee}
                                onDateChange={handleDateChange}
                                showDatePicker={showDatePicker}
                                onShowDatePicker={handleShowDatePicker}
                            />
                        </View>
                        <View style={styles.floatingcontainerstyle}>
                            <FloatingLabelInput
                                containerStyles={styles.input}

                                label={t('strings:lbl_mobile_number')}


                                keyboardType='number-pad'
                                value={nomineemobileno}
                                onChangeText={(text) => setnomineemobileno(text)}
                                staticLabel
                                labelStyles={styles.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.floatingcontainerstyle}>
                            <FloatingLabelInput
                                containerStyles={styles.input}

                                label={t('strings:lbl_email')}

                                keyboardType='email-address'
                                value={nomineeemail}
                                onChangeText={(text) => setnomineeemail(text)}
                                staticLabel
                                labelStyles={styles.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}

                            />
                        </View>
                        <View style={styles.floatingcontainerstyle}>
                            <FloatingLabelInput
                                containerStyles={styles.input}
                                label={t('strings:lbl_address')}
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
                        </View>
                        <View style={styles.floatingcontainerstyle}>
                            <FloatingLabelInput
                                containerStyles={styles.input}
                                label="Relationship with you"
                                keyboardType='default'
                                value={relationship}
                                onChangeText={(text) => setrelationship(text)}
                                staticLabel
                                labelStyles={styles.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
                        <Checkbox.Android
                            color={colors.yellow}
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                        />
                        <Text style={{ color: 'black' }}>{t(' I agree to terms and condition')}</Text>
                    </View>

                    <View style={{ margin: 20 }}>
                        <Text style={{ color: 'blue', }}>
                            I have read & fully understood the{' '}
                            <TouchableOpacity style={{ top: 5 }} onPress={openTermsAndConditions}>
                                <Text style={{ color: 'blue', textDecorationLine: 'underline', top: 5 }}>
                                    terms and conditions
                                </Text>
                            </TouchableOpacity>{' '}
                            of V-guard Rishta Loyalty Program and abide to follow them.
                        </Text>
                    </View>
                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Preview"
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
                    <View style={{ margin: 20 }}>
                        <NeedHelp />
                    </View>
                </View>

            </ScrollView >
        </SafeAreaView >
    )

}

export default NomineePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 5,
        height: height / 15,
        width: width / 1.15,
        borderWidth: 1.8,
        borderColor: "#D3D3D3",
        margin: 20,
        marginTop: 5,
        color: 'black',
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    smallContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        gap: 10
    },
    labelStyles: {
        backgroundColor: 'transparent',
        margin: 15,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    blackDetail: {
        color: colors.black,
        fontSize: 14
    },
    smallDetail: {
        marginLeft: 10,
        color: colors.black,
        fontSize: 14
    },
    greyDetail: {
        color: colors.grey,
        fontSize: 14
    },
    floatingcontainerstyle: {
        width: width / 1.05,

    }
})