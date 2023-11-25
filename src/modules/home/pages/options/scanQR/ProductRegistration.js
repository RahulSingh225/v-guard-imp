import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Modal, Button } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Buttons from '../../../../../components/Buttons';
import { useTranslation } from 'react-i18next';
import arrowIcon from '../../../../../assets/images/arrow.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { sendFile } from '../../../../../utils/apiservice';
const baseURL = 'https://www.vguardrishta.com/';

const ProductRegistration = ({ navigation }) => {
    const { t } = useTranslation();
    // const [qrcode, setQrCode] = useState('');
    // const [skuDetails, setSkuDetails] = useState('');
    // const [purchaseDate, setPurchaseDate] = useState('');
    const [value, onChangeText] = useState('');

    const qrcode = '1234567890'
    const skuDetails = 'VS-400'
    const purchaseDate = '12-12-2012'
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);

    const [selectedBillImage, setSelectedBillImage] = useState(null);
    const [selectedBillImageName, setSelectedBillImageName] = useState('');
    const [selectedWarrantyImage, setSelectedWarrantyImage] = useState(null);
    const [selectedWarrantyImageName, setSelectedWarrantyImageName] = useState('');

    const [imageType, setImageType] = useState('')

    const handleImagePickerPress = (type) => {
        setImageType(type);
        setShowImagePickerModal(true);
    };

    const handleCameraUpload = () => {
        setShowImagePickerModal(false);
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            response => {
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
                    if(imageType=='bill'){
                        setSelectedBillImage(response.assets[0].uri);
                        setSelectedBillImageName(response.assets[0].fileName);
                    }
                    else if(imageType=='warranty'){
                        setSelectedWarrantyImage(response.assets[0].uri);
                        setSelectedWarrantyImageName(response.assets[0].fileName);
                    }
                    triggerApiWithImage(fileData);
                }
            },
        );
    };

    const handleGalleryUpload = () => {
        console.log('Image type==============', imageType)

        setShowImagePickerModal(false);
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            response => {
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
                    if(imageType=='bill'){
                        setSelectedBillImage(response.assets[0].uri);
                        setSelectedBillImageName(response.assets[0].fileName);
                    }
                    else if(imageType=='warranty'){
                        setSelectedWarrantyImage(response.assets[0].uri);
                        setSelectedWarrantyImageName(response.assets[0].fileName);
                    }
                    triggerApiWithImage(fileData);
                }
            },
        );
    };

    const triggerApiWithImage = async fileData => {
        const formData = new FormData();
        formData.append('USER_ROLE', userRole);
        
        formData.append('file', fileData);

        if(imageType=='bill'){
            formData.append('image_related', 'BILL');
        }
        else if(imageType=='warranty'){
            formData.append('image_related', 'WARRANTY');
        }
    
        try {
          const response = await sendFile(formData);
          setEntityUid(response.data.entityUid);
        } catch (error) {
          console.error('API Error:', error);
        }
      };

    return (
        <ScrollView style={styles.mainWrapper}>
            <Text style={styles.heading}>Register Product</Text>
            <View style={styles.form}>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:qr_code')}</Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            editable={false}
                            onChangeText={text => onChangeText(text)}
                            value={qrcode}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:squ_details')}</Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            editable={false}
                            value={skuDetails}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:bill_details')}</Text>
                    <TouchableOpacity
                        style={styles.inputArea}
                        onPress={() => handleImagePickerPress('bill')}>
                        {selectedBillImage ? (
                            <TextInput
                                style={styles.input}
                                placeholder={selectedBillImageName}
                                placeholderTextColor={colors.grey}
                                editable={false}
                            />
                        ) : (
                            <TextInput
                                style={styles.input}
                                placeholder={t('strings:capture_bill_details')}
                                placeholderTextColor={colors.grey}
                                editable={false}
                            />
                        )}
                        <View style={styles.inputImage}>
                            {selectedBillImage ? (
                                <Image
                                    source={{ uri: selectedBillImage }}
                                    style={{ width: 30, height: 30 }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={require('../../../../../assets/images/ic_attatchment_pin.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:warranty_photo_mandatory')}</Text>
                    <TouchableOpacity
                        style={styles.inputArea}
                        onPress={() => handleImagePickerPress('warranty')}>
                        {selectedWarrantyImage ? (
                            <TextInput
                                style={styles.input}
                                placeholder={selectedWarrantyImageName}
                                placeholderTextColor={colors.grey}
                                editable={false}
                            />
                        ) : (
                            <TextInput
                                style={styles.input}
                                placeholder={t('strings:capture_warranty_details')}
                                placeholderTextColor={colors.grey}
                                editable={false}
                            />
                        )}
                        <View style={styles.inputImage}>
                            {selectedWarrantyImage ? (
                                <Image
                                    source={{ uri: selectedWarrantyImage }}
                                    style={{ width: 30, height: 30 }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={require('../../../../../assets/images/ic_attatchment_pin.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:selling_price')}</Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            editable
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            style={styles.input}
                            placeholder={t('strings:enter_selling_price')}
                            placeholderTextColor={colors.grey}
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>{t('strings:purchase_date_mandatory')}</Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            editable={false}
                            value={purchaseDate}
                            style={styles.input}
                        />
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../../../../../assets/images/calendar.png')}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <Buttons
                        style={styles.button}
                        label={t('strings:add_customer_details')}
                        variant="filled"
                        onPress={console.log('helo<><<><><')}
                        width="100%"
                        iconHeight={10}
                        iconWidth={30}
                        iconGap={30}
                        icon={arrowIcon}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showImagePickerModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button title="Launch Camera" onPress={handleCameraUpload} />
                        <Button
                            title="Choose from Gallery"
                            onPress={handleGalleryUpload}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 15,
        backgroundColor: colors.white
    },
    heading: {
        color: colors.black,
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        marginBottom: 10
    },
    label: {
        fontWeight: 'bold',
        color: colors.black
    },
    inputArea: {
        borderColor: colors.lightGrey,
        borderRadius: 5,
        borderWidth: 1,
        width: '100%',
        color: colors.black,
        paddingHorizontal: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputRow: {
        marginTop: 15
    },
    input: {
        color: colors.black,
        width: '90%'
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
      }
});

export default ProductRegistration;
