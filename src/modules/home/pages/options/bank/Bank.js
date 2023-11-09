import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import colors from '../../../../../../colors'
import { useTranslation } from 'react-i18next';
// import { TextInput } from 'react-native-paper';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import { sendFile } from '../../../../../utils/apiservice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getBankNames, updateBankDetails } from '../../HomeApiService';
import Snackbar from 'react-native-snackbar';
import { Picker } from '@react-native-picker/picker';


const InstantBankTransfer = () => {
    const { t } = useTranslation();
    const [accNo, setAccNo] = React.useState("");
    const [accHolder, setAccHolder] = React.useState("");
    const [accType, setAccType] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("");
    const [entityUid, setEntityUid] = useState("");
    const [userRole, setUserRole] = useState('');
    const [availableBanks, setAvailableBanks] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('userRole').then((userRole) => {
            setUserRole(userRole);
        });
        getBankNames()
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to create ticket');
                }
            })
            .then(responses => {
                if (Array.isArray(responses)) {
                    const bankNames = responses.map(bank => bank.bankNameAndBranch);
                    setAvailableBanks(bankNames);
                } else {
                    console.error('Invalid response format');
                }
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }, []);



    const handleImagePickerPress = () => {
        setShowImagePickerModal(true);
    };


    const handleCameraUpload = () => {
        setShowImagePickerModal(false);
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Camera was canceled');
                } else if (response.error) {
                    console.error('Camera error: ', response.error);
                } else {
                    const fileData = {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName,
                    };
                    setSelectedImage(response.assets[0].uri);
                    setSelectedImageName(response.assets[0].fileName);
                    triggerApiWithImage(fileData);
                }
            }
        );
    };

    const handleGalleryUpload = () => {
        setShowImagePickerModal(false);
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Image picker was canceled');
                } else if (response.error) {
                    console.error('Image picker error: ', response.error);
                } else {
                    const fileData = {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName,
                    };
                    setSelectedImage(response.assets[0].uri);
                    setSelectedImageName(response.assets[0].fileName);
                    triggerApiWithImage(fileData);
                }
            }
        );
    };

    const triggerApiWithImage = async (fileData) => {
        const formData = new FormData();
        formData.append('USER_ROLE', userRole);
        formData.append('image_related', 'CHEQUE');
        formData.append('file', fileData);

        try {
            const response = await sendFile(formData);
            setEntityUid(response.data.entityUid);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const handleProceed = () => {
        const postData = {
            bankAccNo: accNo,
            bankAccHolderName: accHolder,
            bankAccType: accType,
            bankNameAndBranch: bankName,
            bankIfsc: ifscCode,
            checkPhoto: entityUid,
        };
        updateBankDetails(postData)
            .then(response => {
                console.log(postData, "---------------postdata")
                if (response.status === 200) {
                    setSelectedImage(null);
                    setSelectedImageName('');
                    setEntityUid('');
                    setIfscCode('');
                    setBankName('');
                    setAccType('');
                    setAccHolder('');
                    setAccNo('');
                    const responses = response.json()
                    return responses;
                } else {
                    throw new Error('Failed to create ticket');
                }
            })
            .then(data => {
                // console.log(data, "--------------response to bank update");
                showSnackbar(data.message);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };
    const showSnackbar = (message) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
        });
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.mainWrapper}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>{t('dashboard:redeem:banktransfer:header')}</Text>
                    <Text style={styles.textSubHeader}>{t('dashboard:redeem:banktransfer:subHeader')}</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={t('dashboard:redeem:banktransfer:inputAccountNumber')}
                            placeholderTextColor={colors.grey}
                            value={accNo}
                            onChangeText={accNo => setAccNo(accNo)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={t('dashboard:redeem:banktransfer:inputAccountHolder')}
                            value={accHolder}
                            placeholderTextColor={colors.grey}
                            onChangeText={accHolder => setAccHolder(accHolder)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                    <Picker
                            selectedValue={accType}
                            onValueChange={(itemValue) => setAccType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label={t('dashboard:redeem:banktransfer:inputAccountType')} value="" style={{color:colors.grey, fontSize: responsiveFontSize(1.8)}} />
                            <Picker.Item key={'savings'} label={'Savings'} value={'savings'} />
                            <Picker.Item key={'current'} label={'Current'} value={'current'} />
                        </Picker>
                        <Image source={require('../../../../../assets/images/ic_ticket_drop_down2.png')} style={{ width: '5%', height: '100%', marginRight: 5 }} resizeMode="contain" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={bankName}
                            onValueChange={(itemValue) => setBankName(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label={t('dashboard:redeem:banktransfer:selectBank')} value="" style={{color:colors.grey, fontSize: responsiveFontSize(1.8)}} />
                            {availableBanks.map((bank, index) => (
                                <Picker.Item key={index} label={bank} value={bank.bankNameAndBranch} />
                            ))}
                        </Picker>
                        <Image source={require('../../../../../assets/images/ic_ticket_drop_down2.png')} style={{ width: '5%', height: '100%', marginRight: 5 }} resizeMode="contain" />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={t('dashboard:redeem:banktransfer:inputIfscCode')}
                            value={ifscCode}
                            placeholderTextColor={colors.grey}
                            onChangeText={ifscCode => setIfscCode(ifscCode)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.inputContainer} onPress={handleImagePickerPress}>
                            {selectedImage ? (
                                <TextInput
                                    style={styles.input}
                                    placeholder={selectedImageName}
                                    placeholderTextColor={colors.grey}
                                    editable={false}
                                />
                            ) : (
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('dashboard:redeem:banktransfer:uploadCheque')}
                                    placeholderTextColor={colors.grey}
                                    editable={false}
                                />
                            )}
                            <View style={styles.inputImage}>
                                {selectedImage ? (
                                    <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                                ) : (
                                    <Image source={require('../../../../../assets/images/photo_camera.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Modal for selecting camera or gallery */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showImagePickerModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Button title="Launch Camera" onPress={handleCameraUpload} />
                                    <Button title="Choose from Gallery" onPress={handleGalleryUpload} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
                <View style={styles.button}>
                    <Buttons
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
        padding: 15,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    inputImage: {
        height: responsiveHeight(2),
        width: responsiveHeight(2),
        marginRight: 5
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
        height: responsiveHeight(8)
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    buttonText: {
        color: colors.white,
        width: '100%',
        textAlign: 'center',
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
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1)
    },
    input: {
        width: '90%',
        padding: 10,
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        // fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        gap: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        alignItems: 'center'
    },
    picker: {
        width: '90%',
        color: colors.grey   ,
    },
    labelPicker: {
        color: colors.grey,
        fontWeight: 'bold'
    }
})
export default InstantBankTransfer