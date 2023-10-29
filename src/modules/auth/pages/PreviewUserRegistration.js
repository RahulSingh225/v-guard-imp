import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import { GetProfession } from '../../../utils/apiservice';
import DatePicker from '../../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useDataContext } from '../../../utils/appcontext';



import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import NewUserKyc from './NewUserKyc';

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
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [profession, setprofession] = useState();
    const [professiondata, setprofessiondata] = useState([]);
    const [subprofession, setsubprofession] = useState();
    const [maritialStatus, setmaritialStatus] = useState('Select');
    const [loyalty, setloyalty] = useState('Select');
    const [annualincome, setannualincome] = useState();
    const [selfieData, setSelfieData] = useState(null);
    const [idProofFrontData, setIdProofFrontData] = useState(null);
    const [idProofBackData, setIdProofBackData] = useState(null);
    const [panData, setPanData] = useState(null);
    const [Idprooftype, setIdprooftype] = useState();
    const [aadharcardno, setaadharcardno] = useState();
    const [pancardno, setpancardno] = useState();
    const [checked, setChecked] = useState(false);
    const [accountnumber, setaccountnumber] = useState('');
    const [accountholdername, setaccountholdername] = useState('');
    const [chequeImage, setchequeImage] = useState();
    const [IFSC, setIFSC] = useState('');
    const [accounttype, setaccounttype] = useState('')

    const [selectedbank, setselectedbank] = useState('');
    const [allbankslist, setallbankslist] = useState();
    const [validateallfieldforbank, setvalidateallfieldforbank] = useState(false);


    const [nomineename, setnomineename] = useState('');
    const [nomineemobileno, setnomineemobileno] = useState('');
    const [nomineeemail, setnomineeemail] = useState('');
    const [nomineeaddress, setnomineeaddress] = useState('');
    const [previewData, setPreviewData] = useState(null);
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
                //  console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", data);
                if (data) {
                    // Parse the JSON string back into an object

                    const retrievedData = JSON.parse(data);
                    console.log("++++++++++++&&&&&&&&++++^^^^^^^^^^^^++++++++++", retrievedData);
                    setSelectedLanguage(retrievedData.fullData.userData.selectedLanguage);
                    setGender(retrievedData.fullData.userData.gender);
                    setemail(retrievedData.fullData.userData.email);
                    setNumber(retrievedData.fullData.userData.number);
                    setwhatapp(retrievedData.fullData.userData.whatapp);
                    setaddress(retrievedData.fullData.userData.address);
                    setstreet(retrievedData.fullData.userData.street);
                    setlandmark(retrievedData.fullData.userData.landmark);
                    setSelectedDate(retrievedData.fullData.userData.selectedDate);
                    setname(retrievedData.fullData.userData.name);
                    setPincode(retrievedData.fullData.userData.pincode);
                    setSelectedState(retrievedData.fullData.userData.selectedState);
                    setSelectedDistrict(retrievedData.fullData.userData.selectedDistrict);
                    setSelectedCity(retrievedData.fullData.userData.selectedCity);
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
                    setnomineename(retrievedData.BankDetailsAndNominee.nomineename);
                    setnomineemobileno(retrievedData.BankDetailsAndNominee.nomineemobileno);
                    setnomineeemail(retrievedData.BankDetailsAndNominee.nomineeemail);
                    setnomineeaddress(retrievedData.BankDetailsAndNominee.nomineeaddress);


                }
            } catch (error) {
                console.error('Error retrieving data: ', error);
            }
        };

        retrieveData();
        Gettingprofession();
    }, [previewData]);

    const updateDataInAsyncStorage = async () => {
        setLoading(true);
        try {
            const data = await AsyncStorage.getItem('previewSummaryData');
            if (data) {
                // Parse the JSON string back into an object
                const retrievedData = JSON.parse(data);

                // Update the fields with the new values
                retrievedData.fullData.NewUserKycData.profession = profession;
                retrievedData.fullData.NewUserKycData.subprofession = subprofession; // Add this line
                retrievedData.fullData.NewUserKycData.maritialStatus = maritialStatus;
                retrievedData.fullData.NewUserKycData.loyalty = loyalty;
                retrievedData.fullData.NewUserKycData.annualincome = annualincome;
                retrievedData.fullData.NewUserKycData.aadharcardno = aadharcardno;
                retrievedData.fullData.NewUserKycData.pancardno = pancardno;
                retrievedData.fullData.NewUserKycData.Idprooftype = Idprooftype; // Add this line

                // Update the data in AsyncStorage
                await AsyncStorage.setItem('previewSummaryData', JSON.stringify(retrievedData));
                console.log('Updated data:', retrievedData.fullData.NewUserKycData);

                // Optionally, you can also change the button state to "Edit" after updating.
                // For example, set a state variable to control the button text:
                setUpdateButtonText('Edit');
            }
        } catch (error) {
            console.error('Error updating data in AsyncStorage: ', error);
        } finally {
            setLoading(false); // Stop showing the loader
        }
    };





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
            setLoading(false);
        }

    }

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View >
                    <View style={{ backgroundColor: 'transparent', height: height / 8, margin: 20, flexDirection: 'row', width: width / 2.1, justifyContent: 'space-evenly', alignItems: 'center', padding: 20 }}>
                        <Avatar.Image size={84} source={require('../../../assets/images/ac_icon.png')} />
                        <View style={{ margin: 20, flexDirection: 'column' }}>
                            <Text style={{ color: 'grey' }}>previewSummaryData</Text>
                            <Text style={{ color: 'grey' }}>Rishta ID</Text>
                            <Text style={{ color: 'grey' }}>Mobile No.</Text>



                        </View>

                    </View>
                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Preferedlanguage')}</Text>
                    <TextInput
                        style={styles.input}

                        label="Prefered Language"
                        placeholder="Prefered Language"
                        maxLength={30}
                        editable={false}
                        value={selectedLanguage} // Set the value of the input to the 'text' state
                        onChangeText={(text) => selectedLanguage(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Name</Text>
                    <TextInput
                        style={styles.input}

                        label="Name"
                        placeholder="Name"
                        maxLength={30}
                        value={name}
                        editable={false}// Set the value of the input to the 'text' state
                        onChangeText={(text) => setname(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Gender')}</Text>
                    <TextInput
                        style={styles.input}

                        label="Gender"
                        placeholder="Gender"
                        maxLength={30}
                        value={gender}
                        editable={false} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setGender(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Date')}</Text>

                    <TextInput
                        style={styles.input}

                        label="Date"
                        placeholder="Date"
                        maxLength={30}
                        value={selectedDate}
                        editable={false}
                        onChangeText={(text) => setSelectedDate(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />
                    {/* <Text style={styles.input}>{data.fullData.userData.selectedDate}</Text> */}
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        value={number} // Set the value of the input to the 'text' state
                        // onChangeText={(text) => setNumber(text)}
                        keyboardType='number-pad'
                        editable={false}
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        maxLength={10}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                    // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 20, }}>{t('auth:newuser:Whatappconatctsame')}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="WhatsApp Number"
                        maxLength={10}
                        editable={false}
                        value={whatapp} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setwhatapp(text)}
                        keyboardType='number-pad'
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"

                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"

                        borderWidth={1.8}
                        keyboardType='email-address'
                        value={email}
                        editable={false} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setemail(text)}
                        borderColor="gray"
                        placeholderTextColor="grey"// Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Permanent House Flat/block no</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Permanent House Flat/block no"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        editable={false}
                        keyboardType='default'
                        maxLength={128}
                        value={address} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaddress(text)}
                        borderColor="gray"
                        placeholderTextColor="grey"// Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Street/ Colony/Locality Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Street/ Colony/Locality Name *"
                        editable={false}
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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Landmark</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Landmark"
                        editable={false}
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
                        editable={false}
                        keyboardType="number-pad"
                        value={pincode}
                        onChangeText={(text) => setPincode(text)}
                        maxLength={6}
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
                    <TextInput
                        style={styles.input}
                        label="Sub Profession"
                        placeholder="Sub Profession"
                        maxLength={30}
                        value={subprofession}
                        // editable={false}// Set the value of the input to the 'text' state
                        onChangeText={(text) => setsubprofession(text)}
                        keyboardType='default'
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"
                    // Default border color
                    // Border color when the input is focused (active)
                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Martial Status</Text>

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

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Enrolled In Loyalty  </Text>
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
                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>Annual Income</Text>
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

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('auth:newuser:Selfie')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>


                        {selfieData != null ? <Text style={{ color: 'black', }}>{selfieData.name.substring(0, 30)}</Text> : null}
                        {selfieData != null ? <Image resizeMode="cover"
                            source={{ uri: selfieData.uri }}
                            style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} /> : null}


                    </View>

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>Select Id Proof </Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={Idprooftype}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdprooftype(itemValue)}>
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="Addhar Card" value="Aadhar Card" />
                            <Picker.Item label=" Pan Card" value="Pan Card" />



                        </Picker>

                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCardFront')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {idProofFrontData != null ? <Text style={{ color: 'black', }}>{idProofFrontData.name.substring(0, 30)}</Text> : null}
                        {idProofFrontData != null ? <Image resizeMode="cover" source={{ uri: idProofFrontData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} /> : <Image resizeMode="cover" source={"../../../assets/images/ic_alert_.png"} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:AadharCardBack')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {idProofBackData != null ? <Text style={{ color: 'black', }}>{idProofBackData.name.substring(0, 30)}</Text> : null}
                        {idProofBackData != null ? <Image resizeMode="cover" source={{ uri: idProofBackData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} /> : <Image resizeMode="cover" source={"../../../assets/images/ic_alert_.png"} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, }}>Aadhar Card No</Text>

                    <TextInput
                        style={[styles.input, { marginTop: 0 }]}
                        placeholder="Aadhar Card No*"
                        value={aadharcardno} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setaadharcardno(text)}
                        keyboardType='number-pad'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                        activeBorderColor="black"
                        maxLength={12}// Border color when the input is focused (active)
                    />

                    <Text style={{ color: 'black', marginBottom: 2, marginLeft: 25 }}>{t('auth:newuser:Selfie')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {panData != null ? <Text style={{ color: 'black', }}>{panData.name.substring(0, 30)}</Text> : null}
                        {panData != null ? <Image resizeMode="cover" source={{ uri: panData.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} /> : <Image resizeMode="cover" source={"../../../assets/images/ic_alert_.png"} style={{ width: width / 8, height: height / 18, backgroundColor: 'red', borderRadius: 5, margin: 5 }} />}


                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Pan Card No</Text>

                    <TextInput
                        style={[styles.input, { marginTop: 0 }]}
                        placeholder="Pan Card No*"
                        value={pancardno} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpancardno(text)}
                        keyboardType='default'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                        activeBorderColor="black"
                        maxLength={10} // Border color when the input is focused (active)
                    />

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

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Account Holder Name</Text>

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
                            <Picker.Item label="Select Account Type" value="Select Account Type" />
                            <Picker.Item label=" Current" value="Current" />
                            <Picker.Item label=" Saving" value="Saving" />



                        </Picker>

                    </View>

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:Bank')}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Selected Bank"
                        label="Selected Bank"                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        editable={false}
                        value={selectedbank} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setselectedbank(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue"
                        maxLength={20}// Border color when the input is focused (active)
                    />
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>IFSC Code</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="IFSC Code"
                        label="Ifsc code"                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        value={IFSC} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setIFSC(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color

                        maxLength={20}// Border color when the input is focused (active)
                    />

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>{t('auth:newuser:UploadepassbookFront')}</Text>


                    <View style={{ backgroundColor: 'transparent', height: height / 15, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0, justifyContent: 'flex-end', flexDirection: 'row', width: width / 1.1, marginLeft: 20, margin: 15 }}>
                        {chequeImage != null ? <Text style={{ color: 'black', }}>{chequeImage.name.substring(0, 30)}</Text> : null}
                        {chequeImage != null ?

                            <Image resizeMode="cover" source={{ uri: chequeImage.uri }} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />
                            : <Image resizeMode="cover" source={"../../../assets/images/ic_alert_.png"} style={{ width: width / 8, height: height / 18, backgroundColor: 'transparent', borderRadius: 5, margin: 5 }} />

                        }
                    </View>




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
                    // Border color when the input is focused (active)
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
                        value={nomineeaddress} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setnomineeaddress(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />

                    <View style={{ display: 'flex', width: width / 1, alignItems: 'center', marginVertical: 20, flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 10 }}>
                        <Buttons
                            label="Next"
                            onPress={() => {
                                // Check if the data is valid before navigating
                                //  navigation.navigate('NewUserKyc', { userData: userData })
                                // validateAndNavigate('male', email, number, address, street, pincode, selectedState, selectedDistrict, selectedCity,);
                                //validateAndNavigate()
                                validateFields();
                            }}
                            variant="filled" // or any other variant you want to use
                            width={180} // specify the width
                            icon={require('../../../assets/images/arrow.png')} // provide the path to your icon
                            iconWidth={50} // specify the icon width
                            iconHeight={20} // specify the icon height
                            iconGap={10}
                        // specify the gap between the label and the icon
                        />

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
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
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
})