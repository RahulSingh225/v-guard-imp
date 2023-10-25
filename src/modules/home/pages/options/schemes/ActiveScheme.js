import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const ActiveScheme = () => {
    const data = [
        {
            heading: 'Heading 1',
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        },
        {
            heading: 'Heading 2',
            message:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ];

    return (
        <ScrollView style={styles.mainWrapper}>
            <Text style={styles.header}>Active Scheme / Offers</Text>
            {data.map((item, index) => (
                <View key={index} style={styles.messageItem}>
                    <Image style={styles.image} source={require('../../../../../assets/images/ic_active_offers.webp')} />
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageHeader}>{item.heading}</Text>
                        <ScrollView
                            style={styles.messageTextContainer}
                            horizontal={true}
                        >
                            <Text style={styles.messageText}>{item.message}</Text>
                        </ScrollView>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 15,
    },
    header: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
    },
    messageItem: {
        borderBottomWidth: 1,
        borderColor: colors.lightGrey,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    messageHeader: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: colors.black
    },
    messageText: {
        fontSize: responsiveFontSize(1.7),
        color: colors.black,
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        height: responsiveFontSize(8),
        width: responsiveFontSize(8)
    },
    messageTextContainer: {
        maxWidth: responsiveWidth(65),
        overflow: 'hidden',
    }
});

export default ActiveScheme;
