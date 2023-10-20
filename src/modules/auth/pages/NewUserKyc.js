import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image } from 'react-native';
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
import DocumentCapture from '../../../components/DocumentCapture';



const NewUserKyc = ({ navigation }) => {
    useEffect(() => {
        requestCameraPermission();

    }, [])

    const IndianStates = [
        'Select State',
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
        'Select District': [],
        'Andhra Pradesh': ['District 1', 'District 2', 'District 3'],
        'Arunachal Pradesh': ['District A', 'District B'],
        'Assam': ['District X', 'District Y', 'District Z'],
        // Add more districts for other states
    };

    const CitiesData = {
        'Select Citi': [],
        'District 1': ['City A', 'City B'],
        'District 2': ['City X', 'City Y'],
        // Add more cities for other districts
    };


    const [currentaddres, setcurrentaddres] = useState('Select');
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
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const requestCameraPermission = async () => {
        useEffect(() => {

        }, [selfieData, currentaddres, selectedState])

        const status = await Permissions.request(Permissions.CAMERA);
        if (status === 'granted') {
            console.log('Camera permission granted.');
        } else {
            console.log('Camera permission denied.');
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



                    <Text style={{ color: 'black', marginLeft: 20, }}>Current address same as Permanent address</Text>
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
                                    setSelectedState('');
                                    setSelectedCity('');
                                    setSelectedDistrict('');

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
                        <Text style={{ color: 'black', marginLeft: 23, }}>Pincode</Text><TextInput
                            style={styles.input}
                            editable={currentaddres == 'no'}
                            placeholder="Pincode"
                            // Customize the border width and color for both normal and active states
                            borderWidth={1.8}
                            keyboardType='number-pad'
                            value={pincode} // Set the value of the input to the 'text' state
                            onChangeText={(text) => setpincode(text)}
                            borderColor="gray"
                            placeholderTextColor="grey" // Default border color
                            activeBorderColor="blue" // Border color when the input is focused (active)
                        />
                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}>State</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
                            <Picker
                                style={{ color: 'black' }}
                                selectedValue={selectedState}
                                enabled={currentaddres === 'no'}
                                onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}
                            >
                                {IndianStates.map((state, index) => (
                                    <Picker.Item key={index} label={state} value={state} />
                                ))}

                            </Picker>

                        </View>
                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> District</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>

                            <Picker
                                style={{ color: 'black' }}
                                selectedValue={selectedDistrict}
                                enabled={currentaddres === 'no'}
                                onValueChange={(itemValue, itemIndex) => setSelectedDistrict(itemValue)}
                            >
                                {DistrictsData[selectedState] && DistrictsData[selectedState].map((district, index) => (
                                    <Picker.Item key={index} label={district} value={district} />
                                ))}
                            </Picker>

                        </View>

                        <Text style={{ color: 'black', left: 20, marginBottom: 2 }}> City</Text>
                        <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>
                            <Picker
                                style={{ color: 'black' }}
                                selectedValue={selectedCity}
                                enabled={currentaddres === 'no'}
                                onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                            >
                                {CitiesData[selectedDistrict] && CitiesData[selectedDistrict].map((city, index) => (
                                    <Picker.Item key={index} label={city} value={city} />
                                ))}
                            </Picker>

                        </View></>}

                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Profession*</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={profession}
                            onValueChange={(itemValue, itemIndex) =>
                                setprofession(itemValue)
                            }>
                            <Picker.Item label="Electrical Expert" value="Electrical Expert" />
                            <Picker.Item label="Plumbing Expert" value="Plumbing Expert" />
                            <Picker.Item label="Electrical and Plumbing Expert" value="Electrical and Plumbing Expert" />

                        </Picker>

                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Maritial Status*</Text>

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


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}> Already enrolled into loyalty scheme ?</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={loyalty}
                            onValueChange={(itemValue, itemIndex) =>
                                setloyalty(itemValue)}>
                            <Picker.Item label="Yes" value="yes" />
                            <Picker.Item label="No" value="No" />

                        </Picker>

                    </View>

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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Selfiee*</Text>
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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Aadhar Card</Text>
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
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Pan Card (Front)*</Text>
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
                            onPress={() => navigation.navigate('NomineePage')}
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