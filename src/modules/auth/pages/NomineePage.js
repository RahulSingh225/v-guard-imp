import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image, } from 'react-native';
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


import colors from '../../../../colors';
import { useTranslation } from 'react-i18next';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";


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











const NomineePage = () => {
    const { t } = useTranslation();
    const [currentaddres, setcurrentaddres] = useState('Select');
    const [checked, setChecked] = useState(false);
    const [accountnumber, setaccountnumber] = useState('');
    const [accountholdername, setaccountholdername] = useState('');
    const [chequeImage, setchequeImage] = useState();
    const [IFSC, setIFSC] = useState('');
    const [allbankslist, setallbankslist] = useState();
    const [selectedbank, setselectedbank] = useState('')


    const [nomineename, setnomineename] = useState('');
    const [nomineemobileno, setnomineemobileno] = useState('');
    const [nomineeemail, setnomineeemail] = useState('');



    useEffect(() => {
        getallbanks();


    }, [allbankslist])


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
                            <Text style={{ color: 'grey' }}>564851</Text>
                            <Text style={{ color: 'grey' }}>Active</Text>
                        </View>

                    </View>

                    <Text style={{ color: 'black', marginLeft: 20, }}> {t('auth:newuser:BankDetailsForAccount')}</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Account Number"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        value={accountnumber} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaccountnumber(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue"
                        maxLength={16}// Border color when the input is focused (active)
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
                    <TextInput
                        style={styles.input}

                        placeholder="Select Account type "
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='email-address'
                        // value={pincode} // Set the value of the input to the 'text' state
                        //  onChangeText={(text) => setpincode(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />



                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Bank')}</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='model'
                            style={{ color: 'black' }}
                            selectedValue={selectedbank}
                            onValueChange={(itemValue, itemIndex) =>
                                setselectedbank(itemValue)
                            }>

                            {Array.isArray(allbankslist) && allbankslist.length > 0 ? (
                                allbankslist.map(item => (
                                    <Picker.Item
                                        key={item.bankId}
                                        label={item.bankNameAndBranch}
                                        value={item.bankId}
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
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
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
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />


                        <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:NomineeAddress')}</Text>
                        <TextInput
                            style={styles.input}

                            placeholder="Address"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='email-address'
                            value={nomineeemail} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setnomineeemail(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
                        <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                        />
                        <Text style={{ color: 'black' }}>{t('auth:newuser: Iagreetotermsandcondition')}</Text>
                    </View>
                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Next"
                            onPress={() => getallbanks()}
                            variant="filled" // or any other variant you want to use
                            width={350} // specify the width
                            icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
                            iconWidth={50} // specify the icon width
                            iconHeight={20} // specify the icon height
                            iconGap={10}
                        // specify the gap between the label and the icon
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            {t('contact:officeHeading')}
                        </Text>
                        <View style={styles.smallContainer}>
                            <Text style={styles.blackDetail}>
                                {t('contact:officeSubheading')}
                            </Text>
                            <Text style={styles.smallDetail}>
                                {t('contact:officeName')}
                            </Text>
                            <Text style={styles.smallDetail}>
                                {t('contact:officeAddress')}
                            </Text>
                            <Text style={styles.smallDetail}>
                                Ph: +91 484 433 5000
                            </Text>
                            <Text style={styles.smallDetail}>
                                Fax: +91 484 300 5100
                            </Text>
                            <Text style={styles.smallDetail}>
                                Email: mail@vguard.in
                            </Text>
                        </View>
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
        backgroundColor: colors.lightYellow,
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