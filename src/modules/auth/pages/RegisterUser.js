import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';
import { NewusermobileNumberValidation } from '../../../utils/apiservice';
import Message from "../../../components/Message";
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from '../../../components/Popup';
const RegisterUser = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [preferedLanguage, setpreferedLanguage] = useState(1);
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState('Retailer');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');




    const handleValidation = async () => {
        try {
            if (!number || number === null || number.trim() === '') {
                setIsPopupVisible(true);
                setPopupMessage("Please enter your phone no ");
            }
            else if (selectedOption === 'Retailer') {
                setIsPopupVisible(true);
                setPopupMessage('Please select a Job Profession');
            }
            // Call the API function with user inputs

            else {
                setIsLoading(true);
                console.log('Validation response:', number);
                const validationResponse = await NewusermobileNumberValidation(number, preferedLanguage);
                console.log('Validation response:', validationResponse.data.message);
                const successMessage = validationResponse.data.message;
                setPopupMessage(successMessage);
                setIsPopupVisible(true);
                if (successMessage == 'Please enter OTP to proceed with the registration process') {
                    await AsyncStorage.setItem("userno", number);
                    // await AsyncStorage.setItem("preferedLanguage", preferedLanguage.toString());

                    navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption, preferedLanguage: preferedLanguage })

                } else {
                    setIsLoading(false);
                    // Alert.alert(validationResponse.data.message)
                    setIsPopupVisible(true);
                    setPopupMessage(validationResponse.data.message);



                    //  navigation.navigate('loginwithotp', { usernumber: number, jobprofession: selectedOption, preferedLanguage: preferedLanguage })
                }

            }


            // Handle the response as needed
        } catch (error) {
            console.error('Error during validation:', error);
            // setIsPopupVisible(true);
            // setPopupMessage("Somthing went wrong ");
            // Handle the error as needed
        } finally {
            setIsLoading(false);

        }
    };

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

    useEffect(() => {



    }, [selectedOption, preferedLanguage])





    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.registerUser}>
                <View style={styles.mainWrapper}>
                    <Image
                        source={require('../../../assets/images/group_907.png')}
                        style={styles.imageSaathi}
                    />
                    <Text style={styles.mainHeader}>{t('auth:register:heading')}</Text>
                    <View style={{ flex: 1 }}>

                        <Loader isLoading={isLoading} />
                    </View>
                    {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                        <Text>{popupMessage}</Text>
                        {/* // <Text>ICORRECT OTP</Text> */}
                    </Popup>
                    )}
                    <View style={styles.formContainer}>
                        <View style={styles.containter}>
                            <Text style={styles.textHeader}>{t('auth:register:selectProfession')}</Text>
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
                                    <Text style={[styles.textHeader, { color: selectedOption === 'Retailer' ? 'black' : 'grey' }]}>{t('auth:register:influencer')}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.containter}>
                            <Text style={styles.textHeader}>{t('auth:register:enterMobile')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('auth:register:mobile')}
                                placeholderTextColor={placeholderColor}
                                value={number}
                                keyboardType='number-pad'
                                onChangeText={(text) => setNumber(text)}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Buttons
                                style={styles.button}
                                label={t('auth:register:getOtp')}
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
                        <Text style={styles.or}>{t('auth:login:or')}</Text>
                        <View style={styles.otpPhone}>
                            <Image source={require('../../../assets/images/group_501.png')} style={styles.phone} />
                            <Text style={styles.greyText}>{t('auth:register:getOtpPhone')}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footergreyText}>{t('auth:login:poweredBy')}</Text>
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
        justifyContent: 'center',
        padding: 16,
        flex: 2,
    },
    input: {
        height: 40,
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

export default RegisterUser
