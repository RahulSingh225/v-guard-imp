import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { Newuserotpvalidation, NewusermobileNumberValidation, otpviacall } from "../../../utils/apiservice";
import Popup from '../../../components/Popup';
import Loader from '../../../components/Loader';
import { width, height } from '../../../utils/dimensions';
import { Colors } from '../../../utils/constants';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginWithOtp = ({ navigation, route }) => {
    const { usernumber, jobprofession, preferedLanguage } = route.params;

    console.log("====>>>>", usernumber);
    console.log("====>>>>", jobprofession);
    console.log("====>>>>", preferedLanguage);
    const [otp, setOtp] = useState('');
    const [number, setnumber] = useState(usernumber);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCounter] = useState(null);
    const [otpsentflag, setotpsentflag] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Influencer');




    const placeholderColor = colors.grey;

    const handleValidation = async () => {
        try {
            console.log("====>>>>", usernumber);
            console.log("====>>>>", jobprofession);
            console.log("====>>>>", preferedLanguage);
            if (!number || number === null || number.trim() === '' || number.length !== 10) {
                showPopupMessage("Please enter a valid phone number");
            } else if (selectedOption === 'Retailer') {
                showPopupMessage("Please select a Job Profession");
            } else {
                setIsLoading(true);

                const validationResponse = await NewusermobileNumberValidation(number, preferedLanguage);
                setCounter(60);
                const successMessage = validationResponse.data.message;
                if (successMessage === 'Please enter OTP to proceed with the registration process') {
                    setIsPopupVisible(true);
                    showPopupMessage(successMessage);
                    setTimeout(() => {
                        AsyncStorage.setItem("userno", number);
                        AsyncStorage.setItem("preferedLanguage", preferedLanguage.toString());
                        // navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption, preferedLanguage: preferedLanguage });
                    }, 0);
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

    const calltogetopt = async () => {
        try {
            let userCredentials = {
                loginOtpUserName: number,
                otpType: "voice"

            };

            let response = await otpviacall(userCredentials);
            let message = response.message;
            if (response.code === 200) {
                setCounter(60);
                setotpsentflag(true);
                setIsPopupVisible(true);
                setPopupMessage(message);
            } else {
                setIsPopupVisible(true);
                setPopupMessage(message);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    async function validateotp() {

        try {

            if (!otp) {
                setIsPopupVisible(true);
                setPopupMessage("Please Enter the otp to proceed ")
            }
            else {
                const verification = await Newuserotpvalidation(number, otp);
                const successMessage = verification.data.message;
                console.log(successMessage);
                if (successMessage === 'OTP verified successfully, please proceed with the registration.') {
                    console.log(">>>>login is heree")
                    setPopupMessage(successMessage);
                    setIsPopupVisible(true);
                    setTimeout(() => {

                        navigation.navigate('newUser', {
                            passedNo: number,
                            jobprofession: jobprofession,
                            preferedLanguage: preferedLanguage,
                        })
                        setIsPopupVisible(false)

                    }, 1000);


                } else {
                    setIsPopupVisible(true);
                    setPopupMessage(verification.data.message);
                    // navigation.navigate('newUser', {
                    //     passedNo: number, // Pass the usernumber prop
                    //     jobprofession: jobprofession, // Pass the jobprofession prop
                    // })
                }

            }




        } catch (error) {

            console.log("=====+++>>>>", error);

        } finally {

        }

    }


    useEffect(() => {

        if (countdown == null) {
            setCounter(60);

        }


        let intervalId;

        if (countdown > 0) {
            intervalId = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000); // Set the interval to run every second (1000 milliseconds)
        }

        // Return a cleanup function to stop the counter when the component is unmounted or countdown becomes 0
        return () => clearInterval(intervalId);

    }, [otp, number, countdown]);

    // useEffect(() => {
    //     // Handle the case when countdown becomes 0
    //     if (countdown <= 0) {
    //         clearInterval(intervalId);
    //     }

    // }, [countdown]);


    const { t } = useTranslation();


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.registerUser}>
                {isLoading == true ? <View style={{ flex: 1 }}>

                    <Loader isLoading={isLoading} />
                </View> : null}
                <View style={styles.mainWrapper}>

                    <Image
                        source={require('../../../assets/images/group_907.png')}
                        style={styles.imageSaathi}
                    />
                    <Text style={styles.mainHeader}>{t('strings:lbl_otp_verification')}</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.containter}>
                            {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                                <Text>{popupMessage}</Text>
                                {/* // <Text>ICORRECT OTP</Text> */}
                            </Popup>
                            )}
                            <Text style={styles.textHeader}>{t('strings:enter_otp_description')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('strings:enter_otp')}
                                placeholderTextColor={placeholderColor}
                                keyboardType='number-pad'
                                value={otp}

                                onChangeText={(text) => setOtp(text)}
                                maxLength={4}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Buttons
                                style={styles.button}
                                label={t('strings:submit')}
                                variant="filled"
                                onPress={() => validateotp()}
                                width="100%"
                                iconHeight={10}
                                iconWidth={30}
                                iconGap={30}
                                icon={arrowIcon}
                            />
                        </View>
                        {/* <Text style={styles.or}>{t('strings:or')}</Text>
                        {countdown != null && <View style={styles.buttonContainer2}>
                            <Buttons
                                style={styles.button}
                                label={t('strings:login_with_otp')}
                                variant="filled"
                                //  onPress={() => navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption })}
                                onPress={() => loginUserWithOtp()}
                                width="100%"
                                iconHeight={10}
                                iconWidth={30}
                                iconGap={30}
                                icon={arrowIcon}
                            />
                        </View>} */}
                        {/* <Text style={styles.or}>{t('strings:or')}</Text> */}
                        {/* <TouchableOpacity onPress={() => calltogetopt()}>
                            <View style={styles.otpPhone}>
                                <Image source={require('../../../assets/images/group_501.png')} style={styles.phone} />
                                <Text style={styles.greyText}>Click Here to get OTP through phone call</Text>
                            </View>
                        </TouchableOpacity> */}

                        <View style={{ backgroundColor: 'transparent', height: height / 25, flexDirection: "row", justifyContent: "space-evenly", width: width / 1.3, marginTop: 20, marginLeft: 15 }}>
                            <View>
                                <Text style={{ color: "black" }}>OTP Not Received ?</Text>
                            </View>
                            <TouchableOpacity onPress={() => countdown === 0 && handleValidation()}>
                                <View style={{ right: 28 }}>
                                    <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.5) }}>RESEND OTP</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 15 }} >
                            <Text style={{ color: "grey", fontSize: responsiveFontSize(2), alignSelf: "center", }}>or</Text>
                        </View>
                        <View style={{ backgroundColor: 'transparent', height: 40, flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', paddingTop: 10, alignSelf: 'center' }}>

                            <TouchableOpacity onPress={() => calltogetopt()}>
                                <View >
                                    <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), left: 10 }}>GET OTP VIA CALL</Text>
                                </View>
                            </TouchableOpacity>
                            {countdown > 0 && <Text style={{ fontSize: responsiveFontSize(1.8), paddingLeft: 5, paddingRight: 5, color: "black" }}> in </Text>}
                            {countdown > 0 && <View >
                                <Text style={{ color: Colors.yellow, fontSize: responsiveFontSize(1.8), right: 15 }}>{countdown} s</Text>
                            </View>}
                        </View>

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
    mainWrapper: {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1
    },
    textHeader: {
        textAlign: 'center',
        width: '80%',
        color: colors.grey,
        fontSize: 14,
        fontWeight: 'bold'
    },
    mainHeader: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10
    },
    imageSaathi: {
        width: 100,
        height: 98,
        marginBottom: 30
    },
    imageVguard: {
        width: 100,
        height: 36,
    },
    formContainer: {
        width: '100%',
        padding: 16,
        flex: 2,
    },
    input: {
        height: 40,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        color: colors.black,
        backgroundColor: colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
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
    containter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    }
})

export default LoginWithOtp