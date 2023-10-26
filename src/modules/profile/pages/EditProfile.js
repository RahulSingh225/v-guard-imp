import { View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../../../../colors'

const EditProfile = () => {
    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={styles.flexBox}>
                <View style={styles.ImageProfile}></View>
            </View>
            <View style={styles.profileText}>
                <Text style={styles.textDetail}>Test User</Text>
                <Text style={styles.textDetail}>XXXXX</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 15
    },
    viewProfile: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.7),
    },
    ImageProfile: {
        height: 50,
        width: 50,
        backgroundColor: colors.lightGrey,
        borderRadius: 100
    },
    textDetail: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2)
    },
    profileText: {
        marginTop: responsiveHeight(2)
    },
    button: {
        backgroundColor: colors.yellow,
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(1),
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        borderRadius: 5
    },
})

export default EditProfile