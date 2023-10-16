import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import colors from '../../../../colors';
import { useTranslation } from 'react-i18next';


const ContactPage = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.mainHeader}>{t('contact:heading')}</Text>
            <Text style={styles.text}>{t('contact:subHeading')}</Text>
            <Text style={styles.detail}>9717500011</Text>
            <Text style={styles.detail}>info@vguardrishta.com</Text>
            <Text style={styles.detail}>9818900011</Text>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {t('contact:customerCareNumber')}
                </Text>
                <View style={styles.smallContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.blackDetail}>
                            1800 103 1300 {t('contact:Airtel')}
                        </Text>
                        <Text style={styles.greyDetail}>
                            ({t('contact:tollfree')})
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.blackDetail}>
                            1860 180 3000 {t('contact:BSNL')}
                        </Text>
                        <Text style={styles.greyDetail}>
                            ({t('contact:chargesApply')})
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    V-Guard E Mail ID
                </Text>
                <View style={styles.smallContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.blackDetail}>
                            customercare@vguard.in
                        </Text>
                    </View>
                </View>
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
    );
};


const styles = StyleSheet.create({
    mainHeader: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 18
    },
    mainWrapper: {
        padding: 30
    },
    text: {
        color: colors.black,
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 16
    },
    detail: {
        color: colors.black,
        marginTop: 10,
        fontSize: 14
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
});



export default ContactPage;
