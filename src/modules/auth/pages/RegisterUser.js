import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { NewusermobileNumberValidation, generateOtpViaCall, otpviacall } from '../../../utils/apiservice';
import Message from "../../../components/Message";
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from '../../../components/Popup';
import { width, height } from '../../../utils/dimensions';
import { Colors } from '../../../utils/constants';
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
// import vguardristuser from '../../../modules/common/Model/Vguardristauser';
const RegisterUser = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [preferedLanguage, setpreferedLanguage] = useState(1);
    const [countdown, setCounter] = useState(null);
    const [otpsentflag, setotpsentflag] = useState(false);
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState('Retailer');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [validationResult, setValidationResult] = useState({ isValid: true, errorMessage: '' });

    const handleNumberChange = (text) => {


        // Validate the mobile number
        const isValidNumber = /^[3-9]\d{9}$/.test(text);
        const errorMessage = isValidNumber ? '' : 'Invalid mobile number';
        setNumber(text);

        setValidationResult({ isValid: isValidNumber, errorMessage });
    };
    const handleValidation = async () => {
        try {
            if (!number || number === null || number.trim() === '' || number.length !== 10) {
                showPopupMessage("Please enter a valid phone number");
            } else if (selectedOption === 'Retailer') {
                showPopupMessage("Please select a Job Profession");
            } else {
                setIsLoading(true);
                console.log("in first api ", number, preferedLanguage);
                const validationResponse = await NewusermobileNumberValidation(number, preferedLanguage);
                const successMessage = validationResponse.data.message;
                if (successMessage === 'Please enter OTP to proceed with the registration process') {
                    setIsPopupVisible(true);
                    showPopupMessage(successMessage);
                    setTimeout(() => {
                        AsyncStorage.setItem("userno", number);
                        AsyncStorage.setItem("preferedLanguage", preferedLanguage.toString());
                        navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption, preferedLanguage: preferedLanguage });
                    }, 150);
                } else {
                    setIsPopupVisible(true);
                    showPopupMessage(successMessage);
                }

            }
        }
        catch (error) {
            console.error('Validation error:', error);

            showPopupMessage('Error during validation. Please try again.');
            setIsLoading(false);
        }
        finally {
            setIsLoading(false)
        }
    };

    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setIsPopupVisible(true);
        setTimeout(() => {
            setIsPopupVisible(false);
        }, 2500);
    };



    // Handle the response as needed


    const placeholderColor = colors.grey;



    const handleOptionSelect = (option) => {
        if (selectedOption == 'Retailer') {
            console.log('====================================');


            setSelectedOption(option);
            console.log('====================================');
            // setSelectedOption('Retailer');
        }
        else {
            setSelectedOption("Retailer");
        }

    };


    const calltogetopt = async () => {
        try {
            let userCredentials = {
                mobileNo: number,
                otpType: "voice"

            };

            let response = await generateOtpViaCall(userCredentials);
            let message = response.data.message;
            console.log(message,response)
            if (response.status === 200) {
                // setCounter(60);
                // setotpsentflag(true);
                // setIsPopupVisible(true);
                // setPopupMessage(message);
                AsyncStorage.setItem("userno", number);
                AsyncStorage.setItem("preferedLanguage", preferedLanguage.toString());
                navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption, preferedLanguage: preferedLanguage });
            } else {
                setIsPopupVisible(true);
                setPopupMessage(message);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        let intervalId;
        if (countdown > 0) {
            intervalId = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [selectedOption, preferedLanguage, countdown])





    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.registerUser}>
                <View style={styles.mainWrapper}>
                    <Image
                        source={require('../../../assets/images/ic_rishta_logo.png')}
                        style={styles.imageSaathi}
                    />
                    <Text style={styles.mainHeader}>{t('strings:new_user_registration')}</Text>
                    {isLoading == true ? <View style={{ flex: 1 }}>

                        <Loader isLoading={isLoading} />
                    </View> : null}
                    {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                        <Text>{popupMessage}</Text>
                        {/* // <Text>ICORRECT OTP</Text> */}
                    </Popup>
                    )}
                    <View style={styles.formContainer}>
                        <View style={styles.containter}>
                            <Text style={styles.textHeader}>{t('strings:lbl_select_job_profession')}</Text>
                            <View style={styles.radioButtons}>
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleOptionSelect('Influencer')}
                                >
                                    <Image
                                        source={
                                            selectedOption === 'Influencer'
                                                ? require('../../../assets/images/tick_1.png')
                                                : require('../../../assets/images/tick_1_notSelected.png')
                                        }
                                        style={styles.tick}
                                    />
                                    <Text style={[styles.textHeader, { color: selectedOption === 'Retailer' ? 'black' : 'grey' }]}>{t('strings:influencer')}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.containter}>
                            <Text style={styles.textHeader}>{t('strings:lbl_enter_mobile_number')}</Text>
                            <View style={styles.inputContainer}>
                                <Image style={styles.icon} source={require('../../../assets/images/mobile_icon.png')} resizeMode='contain' />

                                <TextInput
                                    style={styles.input}
                                    placeholder={t('strings:enter_your_mobile_number')}
                                    placeholderTextColor={placeholderColor}
                                    value={number}
                                    keyboardType='numeric'
                                    onChangeText={handleNumberChange}
                                    maxLength={10}
                                />
                            </View>
                            {!validationResult.isValid && (
                                <Text style={styles.errorText}>{validationResult.errorMessage}</Text>
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Buttons
                                style={styles.button}
                                label={t('strings:get_otp')}
                                variant="filled"
                                //  onPress={() => navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption })}
                                onPress={() => handleValidation()}
                                width="100%"
                                iconHeight={10}
                                iconWidth={30}
                                iconGap={30}
                                icon={arrowIcon}
                            />
                        </View>
                        <Text style={styles.or}>{t('strings:or')}</Text>
                        <TouchableOpacity onPress={() => calltogetopt()}>
                            <View style={styles.otpPhone}>
                                <Image source={require('../../../assets/images/group_501.png')} style={styles.phone} />
                                <Text style={styles.greyText}>{t('strings:lbl_otp_through_phone_call')}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* <View style={{ backgroundColor: 'transparent', height: height / 25, flexDirection: "row", justifyContent: "space-evenly", width: width / 1.3, marginTop: 20, marginLeft: 15 }}>
                            <View>
                                <Text>OTP Not Received ?</Text>
                            </View>
                            <TouchableOpacity onPress={() => countdown === 0 && handleValidation()}>
                                <View style={{ right: 28 }}>
                                    <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.5) }}>RESEND OTP</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 15 }} >
                            <Text style={{ color: "grey", fontSize: responsiveFontSize(2), alignSelf: "center", }}>or</Text>
                        </View> */}
                        {/* <View style={{ backgroundColor: 'transparent', height: 40, flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', paddingTop: 10, alignSelf: 'center' }}>

                            <TouchableOpacity>
                                <View >
                                    <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), left: 10 }}>GET OTP VIA CALL</Text>
                                </View>
                            </TouchableOpacity>
                            {countdown > 0 && <Text style={{ fontSize: responsiveFontSize(1.8), paddingLeft: 5, paddingRight: 5 }}> in </Text>}
                            {countdown > 0 && <View >
                                <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), right: 15 }}>{countdown} s</Text>
                            </View>}
                        </View> */}

                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footergreyText}>{t('strings:powered_by_v_guard')}</Text>
                        <Image
                            source={require('../../../assets/images/group_910.png')}
                            style={styles.imageVguard}
                        />
                    </View>
                </View>

            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    registerUser: {
        height: '100%',
        backgroundColor: colors.white,
        display: 'flex',
    },
    errorText: {
        color: 'red',
        fontSize: responsiveScreenFontSize(1.5),

    },
    mainWrapper: {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1
    },
    textHeader: {
        color: colors.grey,
        fontSize: 14,
        fontWeight: 'bold'
    },
    mainHeader: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    imageSaathi: {
        width: 127,
        height: 98,
        marginBottom: 30,
    },
    imageVguard: {
        width: 100,
        height: 36,
    },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        padding: 16,
        flex: 2,
    },
    input: {
        color: colors.black,
        flex: 1
    },
    inputContainer: {
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        marginBottom: 20,
        elevation: 5,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 10,
        width: 20,
        height: 20
    },
    or: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 20,
        marginTop: 20
    },
    tick: {
        height: 15,
        width: 15
    },
    footergreyText: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.grey,
        paddingBottom: 5,
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        backgroundColor: colors.lightGrey,
        width: '100%',
        paddingVertical: 10
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    radioButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        alignItems: 'center'
    },
    containter2: {


        Bottom: 10,
        gap: 5,
        marginBottom: 20,

    },
    containter: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 50
    },
    phone: {
        height: 50,
        width: 50
    },
    greyText: {
        fontSize: 14,
        color: colors.grey,
    },
    otpPhone: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default RegisterUser
