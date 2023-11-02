import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../colors';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';

const NeedHelp = () => {
    const { t } = useTranslation();

    const handlePhoneCall = () => {
        Linking.openURL('tel:+91 9717500011');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:info@vguardrishta.com');
    };

    const handleWhatsApp = () => {
        Linking.openURL('https://wa.me/919818900011');
    };

    return (
        <View style={styles.contact}>
            <Text style={styles.textHeader}>{t('dashboard:help:header')}</Text>
            <TouchableOpacity style={styles.helpContainer} onPress={handlePhoneCall}>
                <Image
                    source={require('../assets/images/ic_phone_call_2.png')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>9717500011</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpContainer} onPress={handleEmail}>
                <Image
                    source={require('../assets/images/ic_email.png')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>info@vguardrishta.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpContainer} onPress={handleWhatsApp}>
                <Image
                    source={require('../assets/images/ic_whatsapp.webp')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>9818900011</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contact: {
        width: '100%',
        marginTop: 20,
        textAlign: 'left',
    },
    textHeader: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: responsiveFontSize(2.5),
    },
    helpContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        height: 20,
        width: 20,
    },
    textHelp: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: 'bold',
        color: colors.black,
    },
});

export default NeedHelp;
