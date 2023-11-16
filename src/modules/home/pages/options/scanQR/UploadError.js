import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import Buttons from '../../../../../components/Buttons'
import { useTranslation } from 'react-i18next';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp'


const UploadError = () => {
    const { t } = useTranslation();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.mainWrapper}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../../../assets/images/camera.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain" />
                </View>
                <Buttons
                    style={styles.button}
                    label={t('strings:click_here_to_report_error_scan')}
                    variant="blackButton"
                    onPress={() => console.log('Pressed')}
                    width="100%"
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('strings:enter_code_here')}
                        placeholderTextColor={colors.grey}
                    />
                    <View style={styles.scanImage}>
                        <Image source={require('../../../../../assets/images/ic_scan_code_2.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain" />
                    </View>
                </View>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder={t('strings:description_remarks')}
                    placeholderTextColor={colors.grey}
                    multiline={true}
                    textAlignVertical="top"
                />
                <Buttons
                    style={styles.button}
                    label={t('strings:submit')}
                    variant="filled"
                    onPress={() => console.log('Pressed')}
                    width="100%"
                    iconHeight={10}
                    iconWidth={30}
                    iconGap={30}
                    icon={arrowIcon}
                />
                <NeedHelp />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: colors.white
    },
    mainWrapper: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.white,
        height: '100%',
        gap: 10
    },
    header: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2)
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        height: responsiveHeight(15),
        width: responsiveHeight(15),
    },
    inputContainer: {
        borderColor: colors.lightGrey,
        borderWidth: 2,
        borderRadius: 10,
        height: responsiveHeight(5),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '90%',
        padding: 10,
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        fontWeight: 'bold'
    },
    descriptionInput: {
        width: '100%',
        height: responsiveHeight(15),
        borderColor: colors.lightGrey,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        fontWeight: 'bold'
    },
    scanImage: {
        height: responsiveHeight(4),
        width: responsiveHeight(4),
        marginRight: 5
    }
})

export default UploadError