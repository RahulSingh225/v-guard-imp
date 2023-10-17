import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import colors from '../../colors'
import { useTranslation } from 'react-i18next';


const NeedHelp = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.contact}>
            <Text style={styles.textHeader}>
                {t('dashboard:help:header')}
            </Text>
            <View style={styles.helpContainer}>
                <Image
                    source={require('../assets/images/ic_phone_call_2.png')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>
                    9717500011
                </Text>
            </View>
            <View style={styles.helpContainer}>
                <Image
                    source={require('../assets/images/ic_email.png')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>
                    info@vguardrishta.com
                </Text>
            </View>
            <View style={styles.helpContainer}>
                <Image
                    source={require('../assets/images/ic_whatsapp.webp')}
                    style={styles.icon}
                />
                <Text style={styles.textHelp}>
                    9818900011
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contact: {
        width: '100%',
        marginTop: 20,
        textAlign: 'left',
    },
    textHeader: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: responsiveFontSize(2.5)
    },
    helpContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        gap: 10
    },
    icon: {
        height: 20,
        width: 20,
    },
    textHelp: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: 'bold',
        color: colors.black
    }
})
export default NeedHelp