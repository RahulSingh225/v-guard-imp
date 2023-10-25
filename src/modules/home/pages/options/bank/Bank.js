import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import colors from '../../../../../../colors'
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';


const InstantBankTransfer = () => {
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
                    <Text style={styles.textHeader}>{t('dashboard:redeem:banktransfer:header')}</Text>
                    <Text style={styles.textSubHeader}>{t('dashboard:redeem:banktransfer:subHeader')}</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        label={t('dashboard:redeem:banktransfer:inputAccountNumber')}
                        value={accNo}
                        onChangeText={accNo => setAccNp(accNo)}
                        mode='outlined'
                        theme={{ colors: { primary: colors.yellow} }}
                    />
                    <TextInput
                        label={t('dashboard:redeem:banktransfer:inputAccountHolder')}
                        value={accHolder}
                        onChangeText={accHolder => setAccHolder(accHolder)}
                        mode='outlined'
                        theme={{ colors: { primary: colors.yellow } }}
                    />
                    <TextInput
                        label={t('dashboard:redeem:banktransfer:inputAccountType')}
                        value={accType}
                        onChangeText={accType => setAccType(accType)}
                        mode='outlined'
                        theme={{ colors: { primary: colors.yellow } }}
                    />
                    <TextInput
                        label={t('dashboard:redeem:banktransfer:inputBankName')}
                        value={bankName}
                        onChangeText={bankName => setBankName(bankName)}
                        mode='outlined'
                        theme={{ colors: { primary: colors.yellow} }}
                    />
                    <TextInput
                        label={t('dashboard:redeem:banktransfer:inputIfscCode')}
                        value={ifscCode}
                        onChangeText={ifscCode => setIfscCode(ifscCode)}
                        mode='outlined'
                        theme={{ colors: { primary: colors.yellow} }}
                    />
                    <View style={styles.container}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
                        )}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={selectImageFromGallery}
                        >
                            <Text style={styles.buttonText}>
                                {t('dashboard:redeem:banktransfer:uploadCheque').toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Buttons
                        style={styles.button}
                        label={'Submit'}
                        variant="filled"
                        onPress={() => handleProceed()}
                        width="100%"
                        iconHeight={10}
                        iconWidth={30}
                        iconGap={30}
                        icon={arrowIcon}
                    />
                </View>
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
export default InstantBankTransfer