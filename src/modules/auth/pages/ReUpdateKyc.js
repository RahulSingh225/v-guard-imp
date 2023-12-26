import { View, Text, ScrollView, TextInput, Image, Pressable } from 'react-native'
import React, { useTransition } from 'react'
import { height, width } from '../../../utils/dimensions'
import { Colors } from '../../../utils/constants'
import PickerField from '../../../components/PickerField'
import { Picker } from '@react-native-picker/picker'
import DatePicker from '../../../components/DatePicker'
import Loader from '../../../components/Loader'
import ActionPickerModal from '../../../components/ActionPickerModal'
import { Citylist, GetProfession, Getallbanks, Getsubprofession, PincodedetailList, fetchPinCodeData } from '../../../utils/apiservice'
import VguardRishtaUser from '../../common/modals/VguardRishtaUser'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'



const ReUpdateKyc = ({navigation}) => {



    React.useEffect(() => {
        AsyncStorage.getItem('VGUSER').then(r=>setVGuardRishtaUser(JSON.parse(r)));
        GetProfession().then(r => console.log(r))
        Getsubprofession().then(r => console.log(r))
        Getallbanks().then(response => {
            var bank = []
            response.map(r => bank.push({ label: r.bankNameAndBranch, value: r.bankId }))
            setBanks(bank);

        });
        GetProfession().then(response => {
            var profession = [{ label: 'Select Profession', value: 0 }]
            response.map(r => profession.push({ label: r.professionName, value: r.professionId }))
            setProfession(profession)
        });

    }, [])
    const [scheme, setScheme] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const [uiSwitch, setUIswitch] = React.useState({ dob: false, currentpincode:false,pincode: false,Nomineedob:false })
    const [showPicker, setShowPicker] = React.useState({ isVisible: false, documentType: null })
    const [banks, setBanks] = React.useState([])
    const [profession, setProfession] = React.useState([])
    const [subProfession, setSubProfession] = React.useState([])
    const [pincode_suggestions, setPincode_Suggestions] = React.useState([])
    const [vGuardRishtaUser, setVGuardRishtaUser] = React.useState({
        appVersionCode: null,
        egvEnabled: null,
        currPinCodeId: null,
        welcomePosMsg: null,
        welcomePosErrorCode: 0,
        ecardPath: null,
        loginOtpUserName: null,
        isWhatsAppSame: 0,
        userCode: null,
        userId: null,
        emailId: null,
        retailerInfluencer: null,
        mobileNo: null,
        otp: null,
        preferredLanguage: null,
        preferredLanguagePos: null,
        referralCode: null,
        nameOfReferee: null,
        name: null,
        gender: null,
        genderPos: null,
        addDiff: -1,
        dob: null,
        contactNo: null,
        whatsappNo: null,
        permanentAddress: null,
        streetAndLocality: null,
        landmark: null,
        city: null,
        cityId: null,
        state: null,
        stateId: null,
        distId: null,
        dist: null,
        pinCode: null,
        pinCodeId: null,
        otherCity: null,
        airCoolerEnabled: null,
        maritalStatusId: null,
        maritalStatus: null,
        profession: null,
        professionId: null,
        subProfession: null,
        subProfessionId: null,
        currentAddress: null,
        currStreetAndLocality: null,
        currLandmark: null,
        currCity: null,
        otherCurrCity: null,
        currCityId: null,
        currDistId: null,
        currDist: null,
        currState: null,
        currStateId: null,
        currPinCode: null,
        enrolledOtherScheme: null,
        enrolledOtherSchemeYesNo: null,
        otherSchemeBrand: null,
        abtOtherSchemeLiked: null,
        otherSchemeBrand2: null,
        abtOtherSchemeLiked2: null,
        otherSchemeBrand3: null,
        abtOtherSchemeLiked3: null,
        otherSchemeBrand4: null,
        abtOtherSchemeLiked4: null,
        otherSchemeBrand5: null,
        abtOtherSchemeLiked5: null,
        annualBusinessPotential: null,
        bankDetail: {
            bankId: null,
            bankAccNo: null,
            bankAccHolderName: null,
            bankAccType: null,
            bankAccTypePos: null,
            bankNameAndBranch: null,
            bankIfsc: null,
            checkPhoto: null,
            nomineeName: null,
            nomineeDob: null,
            nomineeMobileNo: null,
            nomineeEmail: null,
            nomineeAdd: null,
            nomineeRelation: null,
            nomineeAccNo: null,
            bankDataPresent: null,

        },
        posSummary: null,
        kycDetails: {
            kycIdName: 'Aadhar Card',
            kycId: 1,
            selfie: null,
            aadharOrVoterOrDLFront: null,
            aadharOrVoterOrDlBack: null,
            aadharOrVoterOrDlNo: null,
            panCardFront: null,
            panCardBack: null,
            panCardNo: null,
            kycFlag: "0",
            gstFront: null,
            gstNo: null,
            gstYesNo: null,

        },
        otpType: null,
        rejectedReasonsStr: null,
        roleId: null,
        gstNo: null,
        gstYesNo: "",
        gstPic: null,
        categoryDealInID: null,
        categoryDealIn: null,
        aspireGift: null,
        firmName: null,
        tierFlag: null,
        fcmToken: null,
        active: null,
        welcomeBanner: {
            code: null,
            textMessage: null,
            videoPath: null,
            imgPath: null,
            vdoText: null,
        },
        panNumber: null,
        panImage: null,
        updateAccount: null,

    })
    const {t} = useTranslation();
    const [imageData, setImageData] = React.useState([{
        documentType: null,
        path: null,
        filename: null,
        type: null
    }])
    const [currentAddressFlag, setCurrentAddressFlag] = React.useState(0)
    const gender = [
        { label: 'Select Gender*', value: 0 },
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Other', value: 3 },
    ]
    const whatsappNo = [
        { label: 'Select Whatsapp contact same as above?', value: 0 },
        { label: 'Yes', value: 1 },
        { label: 'No', value: 2 },

    ]
    const maritalStatus = [
        { label: 'Select Marital Status*', value: 0 },
        { label: 'Married', value: 1 },
        { label: 'Unmarried', value: 2 },

    ]
    const currentAddressOption = [
        { label: 'Select', value: 0 },
        { label: 'Yes', value: 1 },
        { label: 'No', value: 2 },

    ]
    const accountType = [
        { label: 'Type of Account', value: 0 },
        { label: 'Current', value: 1 },
        { label: 'Saving', value: 2 },

    ]
    const alreadyenrolled = [
        { label: 'Select already enrolled into loyalty scheme?', value: 0 },
        { label: 'Yes', value: 1 },
        { label: 'No', value: 2 },

    ]
    const language = [
        { label: 'English', value: 1 }
    ]

    function openCamera(documentType) {
        console.log('OPENING CAMERA')
        setShowPicker({ isVisible: false })
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                console.log(response)
                let imageUri = response.uri || response.assets?.[0]?.uri;
                switch (documentType) {
                    case 'PROFILE':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])
                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))

                        break;
                    case 'ID_CARD_FRONT':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                        setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDLFront: imageUri } }))

                        break;
                    case 'ID_CARD_BACK':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                        setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlBack: imageUri } }))

                        break;
                    case 'PAN_CARD_FRONT':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])
 
                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardFront: imageUri } }))

                       break;
                    case 'CHEQUE': 
                    setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail,checkPhoto : imageUri } }))

                    break;
                    default:
                        break;
                }
               // setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))
                console.log(imageUri);
            }
        });

    }
    async function openGallery(documentType) {
        console.log("openingGall")
        setShowPicker({ isVisible: false })
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        await launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                switch (documentType) {
                    case 'PROFILE':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))

                        break;
                    case 'ID_CARD_FRONT':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                        setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDLFront: imageUri } }))

                        break;
                    case 'ID_CARD_BACK':
                        setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                        setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlBack: imageUri } }))

                        break;
                    case 'PAN_CARD_FRONT': 
                    setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardFront: imageUri } }))

                       break;
                    case 'CHEQUE': 
                    setImageData([...imageData,{documentType:documentType,path:imageUri,filename:response.assets[0].fileName,type:response.assets[0].type}])

                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail,checkPhoto : imageUri } }))

                    break;
                    default:
                        break;
                }
                //setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, selfie: imageUri } }))
                //setSelectedImage(imageUri);
            }
        });

    }

    function InitatePreview(){
        AsyncStorage.setItem('IMAGE_DATA',JSON.stringify(imageData)).then(result=>{
            AsyncStorage.setItem('VGUSER',JSON.stringify(vGuardRishtaUser)).then(result=>{
                    navigation.navigate('PreviewReUpdateKyc')
            })

        })
    }



    async function processPincode(pincode,type) {
        console.log(pincode)
        if (pincode.length > 3) {
            console.log('pincode function called')
            const suggestionData = await fetchPinCodeData(pincode);

            if (Array.isArray(suggestionData) && suggestionData.length > 0) {

                const filteredSuggestions = suggestionData.filter((item) => (
                    item.pinCode !== null
                ));
                setPincode_Suggestions(filteredSuggestions);


                // setPincode(pincode);
                //setIsLoading(true);
                if (pincode.length == 6) {

                    updateDistrictState(pincode,type);
                }



            } else {
                setSuggestions([]);
            }
        }
        console.log(pincode, 'huuh');

        type==='permanent'?setVGuardRishtaUser({ ...vGuardRishtaUser, pinCode: pincode }):setVGuardRishtaUser({ ...vGuardRishtaUser, currPinCode: pincode })
    }
    
    function updateDistrictState(pincode,type) {
        setIsLoading(true)

        fetchPinCodeData(pincode)
            .then(data => {
                const pincodeid = data[0].pinCodeId;
                console.log('Pin Code Data:', pincodeid);
                return PincodedetailList(pincodeid);
            })
            .then(secondData => {
                console.log(secondData)
                type==='permanent'?
                setVGuardRishtaUser({ ...vGuardRishtaUser, dist: secondData.distName, distId: secondData.distId, state: secondData.stateName, stateId: secondData.stateId, cityId: secondData.cityId, city: secondData.cityName,pinCode:pincode })
                :setVGuardRishtaUser({ ...vGuardRishtaUser, currDist: secondData.distName, currDistId: secondData.distId, currState: secondData.stateName, currStateId: secondData.stateId, currCityId: secondData.cityId, currCity: secondData.cityName,currPinCode:pincode })


                return Citylist(secondData.distId);
            })
            .then(cityData => {
                //setcitylistpicker(cityData);
                console.log('Second API call:', cityData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error in Page 1:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function processSubProfession(v) {
        const subprofession = [
            { label: 'Select Sub Category', value: 0 }
        ]
        Getsubprofession().then(response => {
            response.map(r => {
                subprofession.push({ label: r.professionName, value: r.professionId })
            })
            setSubProfession(subprofession);
        })
    }

    return (
        <View>
            {isLoading &&
                <Loader />}

            <ScrollView>
                {showPicker.isVisible &&
                    <ActionPickerModal onCamera={() => openCamera(showPicker.documentType)} onGallery={() => openGallery(openGallery(showPicker.documentType))} />}
                <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Edit your details below</Text>
                </View>
                <View style={{ paddingLeft: width * 0.1, gap: 10 }}>
                    <View style={{ borderWidth: 1, borderColor: 'black', maxWidth: 80 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Remarks</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: 'black', maxWidth: width * 0.8 }}>

                        <Text style={{ marginVertical: 10, color: 'red' }}>{`\u25CF Reasons`}</Text>


                        <Text style={{ color: 'red' }}>{`\u25CF Reasons`}</Text>
                    </View>
                    <Text>{t('strings:lbl_preferred_language')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={() => console.log('h')}
                            selectedValue={1}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {language.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.name || ''} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, name: t })} placeholder={t('strings:name')} />
                    </View>

                    <Text>{t('strings:lbl_gender_mandatory')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(g) => setVGuardRishtaUser({ ...vGuardRishtaUser, gender: gender[g].label, genderPos: g })}
                            selectedValue={vGuardRishtaUser?.genderPos || ""}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {gender.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>

                    </View>
                    <View  style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <DatePicker date={vGuardRishtaUser?.dob || null} onDateChange={(event,date)=>{
                            if(event.type=='set'){
                                setVGuardRishtaUser({...vGuardRishtaUser,dob:date})
                                setUIswitch({...uiSwitch,dob:!uiSwitch.dob})
                            }
                        }} label={t('strings:lbl_date_of_birth_mandatory')} showDatePicker={uiSwitch.dob} onShowDatePicker={()=>setUIswitch({...uiSwitch,dob:!uiSwitch.dob})} />
                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.contactNo || ""} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, contactNo: t })} placeholder={t('strings:contact_no')} />
                    </View>
                    <Text>{t('strings:_is_what_s_app_contact_same_as_above')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(v) => {

                                if (v === 1) {
                                    setVGuardRishtaUser({ ...vGuardRishtaUser, isWhatsAppSame: 1, whatsappNo: vGuardRishtaUser?.contactNo || "" })
                                } else {
                                    setVGuardRishtaUser({ ...vGuardRishtaUser, isWhatsAppSame: 0 })
                                }

                            }}
                            selectedValue={vGuardRishtaUser?.isWhatsAppSame || ""}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {whatsappNo.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>

                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.whatsappNo || ""} editable={vGuardRishtaUser?.isWhatsAppSame == 1 ? false : true} o placeholder={t('strings:lbl_whats_app_number')} />
                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.emailId || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, emailId: e })} placeholder={t('strings:email')} />
                    </View>
                    <Text>{'Permanent Address'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.permanentAddress|| ""} onChangeText={(p) => setVGuardRishtaUser({ ...vGuardRishtaUser, permanentAddress: p })} placeholder={t('strings:lbl_permanent_address_mandatory')} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.streetAndLocality || ""} onChangeText={(s) => setVGuardRishtaUser({ ...vGuardRishtaUser, streetAndLocality: s })} placeholder={t('strings:lbl_street_locality')} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.landmark || ""} onChangeText={(t) => setVGuardRishtaUser({ ...vGuardRishtaUser, landmark: t })} placeholder={t('strings:lbl_landmark')} />
                    </View>
                    <Text>{'Pincode'}</Text>

                    <DropDownPicker
                        mode="BADGE"
                        showBadgeDot={true}
                        searchable={true}
                        searchPlaceholder='Search Your Pincode'
                        loading={isLoading}

                        placeholder={vGuardRishtaUser?.pinCode === null ? 'Search Pincode' : `${vGuardRishtaUser?.pinCode || ""}`}
                        searchablePlaceholder="Search Pincode"


                        // placeholder={value}
                        searchTextInputProps={{
                            maxLength: 6,
                            keyboardType: "number-pad"

                        }}

                        listMode="SCROLLVIEW"
                        scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
                        open={uiSwitch.pincode}
                        items={pincode_suggestions.map((item) => ({
                            label: item.pinCode,
                            value: item.pinCode,

                        }
                        ))}
                        setOpen={() => setUIswitch({ pincode: !uiSwitch.pincode })}
                        value={vGuardRishtaUser?.pinCode || ""}
                        onSelectItem={(item) => {
                            console.log(item)
                            setVGuardRishtaUser({ ...vGuardRishtaUser, pinCode: item.label, pinCodeId: item.value })
                            processPincode(`${item.value}`,'permanent')

                            // pinocdefeting(item.value);
                            //console.log(value);





                        }}



                        onChangeSearchText={(text) => processPincode(text,'permanent')}
                        dropDownContainerStyle={{
                            maxWidth: width * 0.8,
                            height: height / 5,
                            borderWidth: 1,

                            borderColor: "black",

                            elevation: 0,
                            backgroundColor: "white"
                        }}
                        style={{
                            backgroundColor: 'white',


                            elevation: 50,
                            opacity: 0.9,
                            borderWidth: 1,
                            maxWidth: width * 0.8,
                            height: height / 15,


                            elevation: 0,

                            borderColor: "black",
                        }}
                    />

                    
                    <Text>{t('strings:select_state')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.state || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder={t('strings:select_state')}/>

                    </View>
                    <Text>{t('strings:select_district')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.dist || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder={t('strings:select_district')} />

                    </View>
                    <Text>{t('strings:select_city')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.city || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder={t('strings:select_city')} />

                    </View>
                    <Text>{'Cureent Address same as permanent address?'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(v) => {

                                setCurrentAddressFlag(v)
                                if (v === 1) {
                                    console.log('trigger')
                                    setVGuardRishtaUser({ ...vGuardRishtaUser, currentAddress: vGuardRishtaUser?.permanentAddress || "", currStreetAndLocality: vGuardRishtaUser?.streetAndLocality || "",  currLandmark: vGuardRishtaUser?.landmark || "", currPinCode: vGuardRishtaUser?.pinCode || "", currPinCodeId: vGuardRishtaUser?.pinCodeId || "", currCity: vGuardRishtaUser?.city || "", currCityId: vGuardRishtaUser?.cityId || "", currDist: vGuardRishtaUser?.dist || "", currDistId: vGuardRishtaUser?.distId || "", currState: vGuardRishtaUser?.state || "", currStateId: vGuardRishtaUser?.stateId || "" })
                                }
                            }}
                            selectedValue={currentAddressFlag}
                        >
                            {currentAddressOption.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <Text>{t('strings:is_current_address_different')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.currentAddress || ""} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currentAddress: c })} editable={vGuardRishtaUser?.currentAddress ? false : true} placeholder='Current Address*House/Flat/Block No.' />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.currStreetAndLocality} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currStreetAndLocality: c })} editable={vGuardRishtaUser?.currentAddress ? false : true} placeholder='Street/Colony/Locality Name*' />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.currLandmark} onChangeText={(c) => setVGuardRishtaUser({ ...vGuardRishtaUser, currLandmark: c })} editable={vGuardRishtaUser?.currentAddress ? false : true} placeholder='Landmark' />
                    </View>
                    <Text>{t('strings:lbl_pin_code_mandatory')}</Text>

                    <DropDownPicker
                        mode="BADGE"
                        showBadgeDot={true}
                        searchable={true}
                        searchPlaceholder='Search Your Pincode'
                        loading={isLoading}

                        placeholder={vGuardRishtaUser?.currPinCode === null ? 'Search Pincode' : `${vGuardRishtaUser?.currPinCode || ""}`}
                        searchablePlaceholder="Search Pincode"


                        // placeholder={value}
                        searchTextInputProps={{
                            maxLength: 6,
                            keyboardType: "number-pad"

                        }}

                        listMode="SCROLLVIEW"
                        scrollViewProps={{ nestedScrollEnabled: true, decelerationRate: "fast" }}
                        open={uiSwitch.currentpincode}
                        items={pincode_suggestions.map((item) => ({
                            label: item.pinCode,
                            value: item.pinCode,

                        }
                        ))}
                        setOpen={() => setUIswitch({ pincode: !uiSwitch.currentpincode })}
                        value={vGuardRishtaUser?.currPinCode}
                        onSelectItem={(item) => {
                            console.log(item)
                            setVGuardRishtaUser({ ...vGuardRishtaUser, currPinCode: item.label, currPinCodeId: item.value })
                            processPincode(`${item.value}`,'current')

                            // pinocdefeting(item.value);
                            //console.log(value);





                        }}



                        onChangeSearchText={(text) => processPincode(text,'current')}
                        dropDownContainerStyle={{
                            maxWidth: width * 0.8,
                            height: height / 5,
                            borderWidth: 1,

                            borderColor: "black",

                            elevation: 0,
                            backgroundColor: "white"
                        }}
                        style={{
                            backgroundColor: 'white',


                            elevation: 50,
                            opacity: 0.9,
                            borderWidth: 1,
                            maxWidth: width * 0.8,
                            height: height / 15,


                            elevation: 0,

                            borderColor: "black",
                        }}
                    />

                    <Text>{t('strings:select_state')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                    <TextInput value={vGuardRishtaUser?.currState || ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>
                    <Text>{t('strings:select_district')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                    <TextInput value={vGuardRishtaUser?.currDist|| ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>
                    <Text>{t('strings:select_city')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                    <TextInput value={vGuardRishtaUser?.currCity|| ""} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>
                    <Text>{t('strings:select_profession')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(v) => {
                                    
                                processSubProfession(v)

                                setVGuardRishtaUser({ ...vGuardRishtaUser, profession: profession[v].label, professionId: v })
                            }}
                            selectedValue={vGuardRishtaUser?.professionId || ""}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {profession.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    {vGuardRishtaUser?.professionId == 2 &&
                        <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                            <Picker
                                style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                                enabled={true}
                                onValueChange={(v) => {



                                    setVGuardRishtaUser({ ...vGuardRishtaUser, subProfession: subProfession[v].label, subProfessionId: v })

                                }}
                                selectedValue={vGuardRishtaUser?.subProfessionId || ""}
                                onFocus={() => console.log('h')}
                                onBlur={() => console.log('h')}>
                                {subProfession.map(l =>
                                    <Picker.Item label={l.label} value={l.value} />
                                )}

                            </Picker>
                        </View>}
                    <Text>{t('strings:select_marital_status')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(m) => setVGuardRishtaUser({ ...vGuardRishtaUser, maritalStatus: maritalStatus[m].label, maritalStatusId: m })}
                            selectedValue={vGuardRishtaUser?.maritalStatusId || ""}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {maritalStatus.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <Text>{t('strings:already_enrolled_into_loyalty_scheme')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(a) => setVGuardRishtaUser({ ...vGuardRishtaUser, enrolledOtherScheme: a, enrolledOtherSchemeYesNo: alreadyenrolled[a].label })}
                            selectedValue={vGuardRishtaUser?.enrolledOtherScheme || ""}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {alreadyenrolled.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.otherSchemeBrand || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand: e })} placeholder='If yes please mention scheme and brand name.' />

                    </View>
                    <View style={{ flexDirection: 'row', maxWidth: width }}>
                        <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                            <TextInput value={vGuardRishtaUser?.abtOtherSchemeLiked || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked: e })} placeholder='If yes, what you liked about the program.' />

                        </View>
                        <Pressable onPress={() => setScheme(scheme+1)}>

                            <Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
                        </Pressable>
                    </View>
                    {scheme > 0 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput value={vGuardRishtaUser?.otherSchemeBrand2 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand2: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput value={vGuardRishtaUser?.abtOtherSchemeLiked2 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked2: e })} placeholder='If yes, what you liked about the program.' />

                                </View>
                                <Pressable onPress={() => setScheme(scheme+1)}>
                                    <Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
                                </Pressable>
                            </View>
                        </>
                    }
                    {scheme > 1 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput value={vGuardRishtaUser?.otherSchemeBrand3 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand3: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput value={vGuardRishtaUser?.abtOtherSchemeLiked3 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked3: e })} placeholder='If yes, what you liked about the program.' />

                                </View>
                                <Pressable onPress={() => setScheme(scheme+1)}>

                                    <Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
                                </Pressable>
                            </View>
                        </>
                    }
                    {scheme > 2 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput value={vGuardRishtaUser?.otherSchemeBrand4 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand4: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput value={vGuardRishtaUser?.abtOtherSchemeLiked4 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked4: e })} placeholder='If yes, what you liked about the program.' />

                                </View>
                                <Pressable onPress={() => setScheme(scheme+1)}>
                                    <Image style={{ resizeMode: 'contain', width: 20, height: 20,justifyContent:'center' , alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
                                </Pressable>
                            </View>
                        </>
                    }
                    {scheme > 3 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput value={vGuardRishtaUser?.otherSchemeBrand5 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand5: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput value={vGuardRishtaUser?.abtOtherSchemeLiked5 || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked5: e })} placeholder='If yes, what you liked about the program.' />

                                </View>
                                <Pressable onPress={() => setScheme(scheme+1)}>
                                    <Image style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }} source={require('../../../assets/images/ic_add_yellow.webp')} />
                                </Pressable>
                            </View>
                        </>
                    }
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.annualBusinessPotential || ""} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, annualBusinessPotential: e })} placeholder={t('strings:annual_business_potential')} />

                    </View>
                    <Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'PROFILE' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder={t('strings:lbl_update_your_selfie')} />
                        {vGuardRishtaUser?.kycDetails?.selfie ?
                            <Image  style={{height:24,width:30,marginHorizontal: 10, alignSelf: 'center' }}  source={{ uri: vGuardRishtaUser?.kycDetails?.selfie || ""}} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />
                        }
                    </Pressable>
                    <Text>{'Aadhar Card'}</Text>
                    <Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'ID_CARD_FRONT' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder={t('strings:update_aadhar_voter_id_dl_front')} />
                        {vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDLFront ?
                            <Image style={{height:24,width:30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDLFront }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </Pressable>
                    <Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'ID_CARD_BACK' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder={t('strings:update_aadhar_voter_id_dl_back')} />
                        {vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlBack ? <Image style={{height:24,width:30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlBack }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </Pressable>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.kycDetails?.aadharOrVoterOrDlNo || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, aadharOrVoterOrDlNo: e } }))} placeholder={t('strings:update_aadhar_voter_id_dl_manually')} />

                    </View>
                    <Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'PAN_CARD_FRONT' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder={t('strings:update_pan_card_front')} />
                        {vGuardRishtaUser?.kycDetails?.panCardFront ? <Image style={{height:24,width:30, marginHorizontal: 10, alignSelf: 'center' }} source={{uri:vGuardRishtaUser?.kycDetails?.panCardFront}} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </Pressable>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.kycDetails?.panCardNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser?.kycDetails, panCardNo: e } }))} placeholder={t('strings:update_pan_number_manually')} />

                    </View>
                    <Text>{t('strings:lbl_bank_details')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.bankAccNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, bankAccNo: e } }))} placeholder={t('strings:lbl_account_number')} />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.bankAccHolderName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, bankAccHolderName: e } }))} placeholder={t('strings:lbl_account_holder_name')} />

                    </View>
                    <Text>{t('strings:select_account_type')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankAccType: accountType[e].label, bankAccTypePos: e } }))}
                            selectedValue={0}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {accountType.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <Text>{t('strings:bank_name')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <Picker
                            style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black' }}
                            enabled={true}
                            onValueChange={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankNameAndBranch: banks[e].label, bankId: e } }))}
                            selectedValue={0}
                            onFocus={() => console.log('h')}
                            onBlur={() => console.log('h')}>
                            {banks.map(l =>
                                <Picker.Item label={l.label} value={l.value} />
                            )}

                        </Picker>
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.bankIfsc || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", bankIfsc: e } }))} placeholder={t('strings:ifsc')} />

                    </View>
                    <Pressable onPress={() => setShowPicker({ isVisible: true, documentType: 'CHEQUE' })} style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder={t('strings:lbl_upload_cancelled_cheque')} />
                        {vGuardRishtaUser?.bankDetail?.checkPhoto ? <Image style={{height:24,width:30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser?.bankDetail?.checkPhoto }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </Pressable>
                    <Text>{t('strings:lbl_nominee_details')}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.nomineeName || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeName: e } }))} placeholder={t('strings:lbl_name_of_nominee')} />

                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <DatePicker date={vGuardRishtaUser?.bankDetail?.nomineeDob} onDateChange={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeDob: e } }))} label={vGuardRishtaUser?.bankDetail?.nomineeDob ? vGuardRishtaUser?.bankDetail?.nomineeDob : 'Date of Birth DD/MM/YYYY*'} onShowDatePicker={()=>setUIswitch({...uiSwitch,Nomineedob:!uiSwitch.Nomineedob})} showDatePicker={uiSwitch.Nomineedob} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.nomineeMobileNo || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeMobileNo: e } }))} placeholder={t('strings:lbl_mobile_number')} />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.nomineeEmail || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail, nomineeEmail: e } }))} placeholder={t('strings:lbl_email')} />

                    </View>

                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.nomineeAdd|| ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeAdd: e } }))} placeholder={t('strings:lbl_address')} />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser?.bankDetail?.nomineeRelation || ""} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser?.bankDetail || "", nomineeRelation: e } }))} placeholder='Relationship with you' />

                    </View>
                </View>
                <Pressable onPress={()=>InitatePreview()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Preview</Text>
                </Pressable>
            </ScrollView>



        </View>
    )
}

export default ReUpdateKyc