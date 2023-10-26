import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import colors from '../../../../colors';
import Buttons from '../../../components/Buttons';
import arrowIcon from '../../../assets/images/arrow.png';

const LoginWithOtp = ({ navigation, route }) => {

    const { usernumber, jobprofession } = route.params;
    console.log("====>>>>", usernumber);
    console.log("====>>>>", jobprofession);

    const placeholderColor = colors.grey;

    const { t } = useTranslation();

    const [otp, setOtp] = useState('');
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.registerUser}>
                <View style={styles.mainWrapper}>
                    <Image
                        source={require('../../../assets/images/group_907.png')}
                        style={styles.imageSaathi}
                    />
                    <Text style={styles.mainHeader}>{t('auth:loginWIthOtp:heading')}</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.containter}>
                            <Text style={styles.textHeader}>{t('auth:register:enterOtpHeading')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('auth:register:enterOtp')}
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
                                label={t('auth:loginWIthOtp:submit')}
                                variant="filled"
                                onPress={() => navigation.navigate('Kyc')}
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
