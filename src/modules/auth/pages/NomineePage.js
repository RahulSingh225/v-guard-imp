import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, Alert, Linking } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { Getallbanks } from '../../../utils/apiservice';

import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import NeedHelp from "../../../components/NeedHelp";
import AsyncStorage from '@react-native-async-storage/async-storage';



import colors from '../../../../colors';
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
    console.log('==================%%%==================', fullData);


    const { t } = useTranslation();
    // const [currentaddres, setcurrentaddres] = useState('Select');
    const [checked, setChecked] = useState(false);
    const [accountnumber, setaccountnumber] = useState(null);
    const [accountholdername, setaccountholdername] = useState(null);
    const [chequeImage, setchequeImage] = useState(null);
    const [IFSC, setIFSC] = useState(null);
    const [accounttype, setaccounttype] = useState("null");

    const [selectedbank, setselectedbank] = useState("null");
    const [allbankslist, setallbankslist] = useState(null);
    const [validateallfieldforbank, setvalidateallfieldforbank] = useState(false);
    const [relationship, setrelationship] = useState(null)


    const [nomineename, setnomineename] = useState('');
    const [nomineemobileno, setnomineemobileno] = useState('');
    const [nomineeemail, setnomineeemail] = useState('');
    const [nomineeaddress, setnomineeaddress] = useState('');





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
        }
        const PreviewSummaryData = {
            BankDetailsAndNominee,
            fullData,

        }
        setvalidateallfieldforbank(false)

        // // Check for at least one field being entered

        //   navigation.navigate('PreviewSummary',)
        // }
        if (
            (accountnumber !== null ||
                accountholdername !== null ||
                chequeImage !== null ||
                IFSC !== null ||
                accounttype !== "null" ||
                selectedbank !== "null") &&
            (accountnumber === null ||
                accountholdername === null ||
                chequeImage === null ||
                IFSC === null ||
                accounttype === "null" ||
                selectedbank === "null")
        ) {

            console.log(">>>>>>>>>>>>>>>>>", accountnumber);
            Alert.alert("Please fill all bank details.");
        } else if (checked === false) {
            Alert.alert("Please agree to terms and conditions.");
        } else {
            // All fields are filled, proceed with data storage and navigation
            const dataToStore = JSON.stringify(PreviewSummaryData);
            await AsyncStorage.setItem("previewSummaryData", dataToStore);
            navigation.navigate("PreviewSummary");
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
                        console.log('====================================');
                        console.log(chequeImage);
                        console.log('====================================');
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
                const data = await AsyncStorage.getItem('previewSummaryData');
                if (data) {
                    const retrievedData = JSON.parse(data);

                    // Set the state variables with the retrieved data
                    console.log('====================================');
                    console.log(retrievedData);
                    console.log('====================================');
                    setaccountnumber(retrievedData.BankDetailsAndNominee.accountnumber);
                    setaccountholdername(retrievedData.BankDetailsAndNominee.accountholdername);
                    setchequeImage(retrievedData.BankDetailsAndNominee.chequeImage);
                    setIFSC(retrievedData.BankDetailsAndNominee.IFSC);
                    setaccounttype(retrievedData.BankDetailsAndNominee.accounttype);
                    setselectedbank(retrievedData.BankDetailsAndNominee.selectedbank);

                    setnomineename(retrievedData.BankDetailsAndNominee.nomineename);
                    setnomineemobileno(retrievedData.BankDetailsAndNominee.nomineemobileno);
                    setnomineeemail(retrievedData.BankDetailsAndNominee.nomineeemail);
                    setnomineeaddress(retrievedData.BankDetailsAndNominee.nomineeaddress);




                    console.log('====================================');
                    console.log(accountholdername);
                    console.log('====================================');

                    // Set other state variables for additional fields.
                }
            } catch (error) {
                console.error('Error retrieving data: ', error);
            }
        };

        if (retrieveData == null) {
            retrieveData();

        }
        if (allbankslist == null) {
            getallbanks();

        }





    }, [allbankslist, accountholdername, accountnumber, accounttype, chequeImage, IFSC])


    async function getallbanks() {
        try {
            const getallbanks = await Getallbanks();
            setallbankslist(getallbanks);



            // console.log("==%%%%===", getallbanks);
        }
        catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        finally {
            // After the API call (whether it succeeds or fails), hide the loader
            // setLoading(false);
        }
    }

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

                    <Text style={{ color: 'black', marginLeft: 20, }}> {t('auth:newuser:BankDetailsForAccount')}</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Account Number"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='number-pad'
                        value={accountnumber} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaccountnumber(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue"
                    // Border color when the input is focused (active)
                    />


                    <TextInput
                        style={styles.input}

                        placeholder="Account Holder Name"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        value={accountholdername} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaccountholdername(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue"
                        maxLength={50} // Border color when the input is focused (active)
                    />



                    <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:SelectAccountype')}</Text>
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={accounttype}
                            onValueChange={(itemValue, itemIndex) =>
                                setaccounttype(itemValue)
                            }>
                            <Picker.Item label="Select Account Type" value="null" />
                            <Picker.Item label=" Current" value="Current" />
                            <Picker.Item label=" Saving" value="Saving" />



                        </Picker>

                    </View>



                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Bank')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='model'
                            style={{ color: 'black' }}
                            selectedValue={selectedbank}
                            onValueChange={(itemValue, itemIndex) =>
                                setselectedbank(itemValue)
                            }>
                            <Picker.Item label="Select" value="null" />
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
                    <TextInput
                        style={styles.input}
                        placeholder="IFSC Code"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        value={IFSC} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setIFSC(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue"
                        maxLength={20}// Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:UploadepassbookFront')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width / 1.05, marginLeft: 20, marginTop: 0, }}>

                        <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.25 }}>
                            {chequeImage != null ? <Text style={{ color: 'black', }}>{chequeImage.name}</Text> : null}
                            {chequeImage != null ?
                                <TouchableOpacity onPress={() => openCamera('cheque', (documentType, data) => {
                                    // Handle the captured data for the 'Selfie' document type here
                                })} >
                                    <Image resizeMode="cover" source={{ uri: chequeImage.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
                                </TouchableOpacity> :
                                <IconButton
                                    icon="camera"
                                    animated='true'

                                    size={20}
                                    onPress={() => openCamera('cheque', (documentType, data) => {
                                        // Handle the captured data for the 'Selfie' document type here
                                    })}
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
                        <Text style={{ color: 'black', marginLeft: 20, fontSize: responsiveFontSize(2) }}>{t('auth:newuser:NomineeDetails')}</Text>
                        <TextInput
                            style={styles.input}

                            placeholder="Name of Nominee"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='default'
                            value={nomineename} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setnomineename(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />

                        <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:NomineeMobile')}</Text>
                        <TextInput
                            style={styles.input}

                            placeholder="Mobile No"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='number-pad'
                            value={nomineemobileno} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setnomineemobileno(text)}
                            borderColor="gray"
                            placeholderTextColor="grey"
                            maxLength={10}// Default border color
                        // Border color when the input is focused (active)
                        />



                        <Text style={{ color: 'black', marginLeft: 23, }}>{t('auth:newuser:NomineeEmailAddress')}</Text>
                        <TextInput
                            style={styles.input}

                            placeholder="Email"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='email-address'
                            value={nomineeemail} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setnomineeemail(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                        // Border color when the input is focused (active)
                        />


                        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:NomineeAddress')}</Text>
                        <TextInput
                            style={styles.input}

                            placeholder="Address"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='email-address'
                            value={nomineeaddress} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setnomineeaddress(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                        // Border color when the input is focused (active)
                        />
                        <TextInput
                            style={styles.input}

                            placeholder="Relatioship with you"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='default'
                            value={relationship} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setrelationship(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                        // Border color when the input is focused (active)
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
                        <Checkbox.Android
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
        borderWidth: 1,
        padding: 10,
        borderColor: 'black', // Default border color
        activeBorderColor: 'blue',
        margin: 20,
        marginTop: 0,
        color: 'grey',
        borderRadius: 5// Border color when focused
    },
    smallContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        gap: 10
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
    }
})