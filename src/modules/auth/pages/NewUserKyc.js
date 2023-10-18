import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const NewUserKyc = ({ navigation }) => {
    useEffect(() => {
        requestCameraPermission();

    }, [selectedState, selectedDistrict, selectedCity])
    const cameraRef = useRef(null);
    const [catagory, setcatagory] = useState();
    const [maritialstatus, setmaritialstatus] = useState();
    const [loyalty, setloyalty] = useState();
    const [Number, setNumber] = useState();

    const [annualincome, setannualincome] = useState()
    const [address, setaddress] = useState();
    const [street, setstreet] = useState();
    const [landmark, setlandmark] = useState();
    const [pincode, setpincode] = useState();
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const requestCameraPermission = async () => {
        const status = await Permissions.request(Permissions.CAMERA);
        if (status === 'granted') {
            console.log('Camera permission granted.');
        } else {
            console.log('Camera permission denied.');
        }
    };


    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);

            setImageUri(data.uri);
        }
    };
    return (
        <SafeAreaView>
            <ScrollView >
                <View >



                    <Text style={{ color: 'black', marginLeft: 20, }}>Select Catagory</Text>
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={catagory}
                            onValueChange={(itemValue, itemIndex) =>
                                setcatagory(itemValue)


                            }>
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="Hindi" value="Hindi" />
                        </Picker>

                    </View>
                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Maritial Status*</Text>

                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 0 }}>


                        <Picker
                            mode='dropdown'
                            style={{ color: 'black' }}
                            selectedValue={maritialstatus}
                            onValueChange={(itemValue, itemIndex) =>
                                setmaritialstatus(itemValue)
                            }>
                            <Picker.Item label="Married" value="Married" />
                            <Picker.Item label="Single" value="Single" />

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
                        placeholder="Annual Income"
                        value={annualincome} // Set the value of the input to the 'text' state
                        onChangeText={text => setannualincome(annualincome)}
                        keyboardType='number-pad'
                        // Customize the border width and color for both normal and active states
                        borderWidth={1}
                        borderColor="black"
                        placeholderTextColor="grey"// Default border color
                        activeBorderColor="black" // Border color when the input is focused (active)
                    />





                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Next"
                            onPress={() => navigation.navigate('NewuserKyc')}
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
        </SafeAreaView>
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