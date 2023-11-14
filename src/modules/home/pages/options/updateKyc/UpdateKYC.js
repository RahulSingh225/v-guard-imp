import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import colors from '../../../../../../colors'
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';


const UpdateKYC = () => {
    const { t } = useTranslation();
    const [accNo, setAccNp] = React.useState("");
    const [accHolder, setAccHolder] = React.useState("");
    const [accType, setAccType] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const selectImageFromGallery = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Image selection canceled');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0]);
            }
        });
    };
    const handleProceed = () => {
        console.log('Account Number:', accNo);
        console.log('Account Holder:', accHolder);
        console.log('Account Type:', accType);
        console.log('Bank Name:', bankName);
        console.log('IFSC Code:', ifscCode);
        console.log('Selected Image:', selectedImage);
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.mainWrapper}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>{t('strings:update_kyc')}</Text>
                </View>
                <View style={styles.form}>
                    
                    <Buttons
                        style={styles.button}
                        label={t('strings:submit')}
                        variant="filled"
                        onPress={() => handleProceed()}
                        width="100%"
                        iconHeight={10}
                        iconWidth={30}
                        iconGap={30}
                        icon={arrowIcon}
                    />
                </View>
                <NeedHelp />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.white
    },
    mainWrapper: {
        padding: 15
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textHeader: {
        fontSize: responsiveFontSize(2.5),
        color: colors.black,
        fontWeight: 'bold'
    },
    textSubHeader: {
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    button: {
        backgroundColor: colors.black,
        paddingVertical: 10,
        borderRadius: 5
    },
    buttonText: {
        color: colors.white,
        width: '100%',
        textAlign: 'center',
    }
})
export default UpdateKYC