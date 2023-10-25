import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const YourRewards = () => {
    const rewards = [120, 132, 175, 130];

    // Group the rewards into pairs
    const pairedRewards = [];
    for (let i = 0; i < rewards.length; i += 2) {
        pairedRewards.push(rewards.slice(i, i + 2));
    }

    return (
        <ScrollView contentContainerStyle={styles.mainWrapper}>
            <Text style={styles.header}>Your Rewards</Text>
            {pairedRewards.map((pair, rowIndex) => (
                <View key={rowIndex} style={styles.rowContainer}>
                    {pair.map((reward, index) => (
                        <View key={index} style={styles.card}>
                            <Image style={{ flex: 1, width: '100%', height: '100%' }}
                                resizeMode="contain" source={require('../../../../../assets/images/ic_rewards_gift.png')} />
                            <Text style={styles.cardText}>You have won {reward} points</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 15,
        backgroundColor: colors.white,
        height: '100%'
    },
    header: {
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center',
        marginBottom: 10,
        color: colors.black,
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: responsiveWidth(45),
        aspectRatio: 1,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        borderRadius: 10,
    },
    cardText: {
        fontSize: responsiveFontSize(2),
        color: colors.black,
        textAlign: 'center'
    },
});

export default YourRewards;
