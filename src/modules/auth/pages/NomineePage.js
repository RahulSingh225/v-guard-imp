import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, PermissionsAndroid, Image } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Buttons from "../../../components/Buttons";
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import DocumentCapture from '../../../components/DocumentCapture';
import colors from '../../../../colors';
import { useTranslation } from 'react-i18next';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const NomineePage = () => {
    const { t } = useTranslation();
    const [currentaddres, setcurrentaddres] = useState('Select');
    const [checked, setChecked] = useState(false);
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



                    <Text style={{ color: 'black', marginLeft: 20, }}>Nominee Details(for insurance purpose)</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Name of Nominee"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='default'
                        value={pincode} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpincode(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />
                    <View style={{ backgroundColor: 'transparent', height: height / 17, margin: 20, borderWidth: 1, borderRadius: 5, flexDirection: 'column', marginTop: 3 }}>






                    </View>
                    <Text style={{ color: 'black', marginLeft: 23, }}>Mobile No</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Mobile No"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='number-pad'
                        value={pincode} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpincode(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />



                    <Text style={{ color: 'black', marginLeft: 23, }}>Email Address</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Email"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='email-address'
                        value={pincode} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpincode(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />


                    <Text style={{ color: 'black', marginLeft: 24, marginBottom: 2 }}>Address*</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Address"
                        // Customize the border width and color for both normal and active states
                        borderWidth={1.8}
                        keyboardType='email-address'
                        value={pincode} // Set the value of the input to the 'text' state
                        onChangeText={(text) => setpincode(text)}
                        borderColor="gray"
                        placeholderTextColor="grey" // Default border color
                        activeBorderColor="blue" // Border color when the input is focused (active)
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
                        <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                        />
                        <Text style={{ color: 'black' }}>I agree to the Terms and Conditions</Text>
                    </View>
                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', marginVertical: 20 }}>
                        <Buttons
                            label="Next"
                            // onPress={() => navigation.navigate('NewuserKyc')}
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