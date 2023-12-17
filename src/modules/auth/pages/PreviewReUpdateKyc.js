import { View, Text, ScrollView, TextInput, Image, Pressable } from 'react-native'
import React from 'react'
import { height, width } from '../../../utils/dimensions'
import { Colors } from '../../../utils/constants'

import Loader from '../../../components/Loader'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { reUpdateUserForKyc, sendFile } from '../../../utils/apiservice'




const PreviewReUpdateKyc = ({ navigation }) => {

    React.useEffect(() => {
        AsyncStorage.getItem('VGUSER').then(result => setVGuardRishtaUser(JSON.parse(result)))
    }, [])

    const [isLoading, setIsLoading] = React.useState(false)


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
    const [imageData, setImageData] = React.useState([{
        documentType: null,
        path: null,
        filename: null,
        type: null
    }])



    function InitatePreview() {
        setIsLoading(true)
        AsyncStorage.getItem("IMAGE_DATA").then(result=>{
            let Images = JSON.parse(result);
            Images.map(async (i)  =>{
                try {
                    const formData = new FormData();
                    formData.append('file',{uri:i.path,type:i.type,name:i.filename});
                    formData.append('image_related',i.documentType);
                    formData.append('USER_ROLE',"1");
                    const result = await sendFile(formData);
                    if(result.data.entityUid){
                        switch (documentType) {
                            case 'CHEQUE':
                                setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail,checkPhoto : result.data.entityUid } }))
                                break;
                                case "PAN_CARD_FRONT":
                                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, panCardFront: result.data.entityUid } }))

                                break;
                                case 'ID_CARD_BACK':
                                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, aadharOrVoterOrDlBack: result.data.entityUid } }))

                                break;
                                case 'ID_CARD_FRONT':
                                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, aadharOrVoterOrDLFront: result.data.entityUid } }))

                                break;
                                case 'PROFILE':
                                    setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, selfie: result.data.entityUid } }))

                                break;
                               
                        
                            default:
                                break;
                        }

                    }

                } catch (error) {
                    setIsLoading(false)
                    console.log(error);
                }
               
            })
            reUpdateUserForKyc(vGuardRishtaUser).then(response=>{
                setIsLoading(false)
                console.log(response);
                if(response.code==200){
                    navigation.navigate('login')
                }
            }).catch(console.log(error));
            
        })
       



    }







    return (
        <View>
            {isLoading &&
                <Loader />}

            <ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.8, height: 40, backgroundColor: Colors.colorPrimary }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Preview</Text>
                </View>
                <View style={{ paddingLeft: width * 0.1, gap: 10 }}>

                    <Text>{'Preffered Language'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.preferredLanguage} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.name} />
                    </View>

                    <Text>{'Gender*'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.gender} />


                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.dob} />

                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.contactNo} />
                    </View>
                    <Text>{'Is Whatsapp no. same as above?'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.isWhatsAppSame ? 'Yes' : 'No'} />


                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.whatsappNo} />
                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.emailId} />
                    </View>
                    <Text>{'Permanent Address'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.permanentAddress} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.streetAndLocality} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.landmark} />
                    </View>
                    <Text>{'Pincode'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>

                        <TextInput editable={false} value={vGuardRishtaUser.pinCode} />
                    </View>


                    <Text>{'State'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser.state} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>
                    <Text>{'District'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser.dist} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>
                    <Text>{'City'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput value={vGuardRishtaUser.city} editable={false} onChangeText={(p) => { processPincode(p) }} placeholder='Pincode' />

                    </View>

                    <Text>{'Current Address'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currentAddress} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currStreetAndLocality} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currLandmark} />
                    </View>
                    <Text>{'Pincode'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>

                        <TextInput editable={false} value={vGuardRishtaUser.currPinCode} />
                    </View>
                    <Text>{'State'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currState} />

                    </View>
                    <Text>{'District'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currDist} />

                    </View>
                    <Text>{'City'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.currCity} />

                    </View>
                    <Text>{'Profession'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.profession} />

                    </View>
                    {vGuardRishtaUser.professionId == 2 &&
                        <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                            <TextInput editable={false} value={vGuardRishtaUser.subProfession} />

                        </View>}
                    <Text>{'Marital Status'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.maritalStatus} />

                    </View>
                    <Text>{'Already Enrolled into loyalty scheme?'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.enrolledOtherSchemeYesNo} />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand} />

                    </View>
                    <View style={{ flexDirection: 'row', maxWidth: width }}>
                        <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                            <TextInput editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked} />

                        </View>

                    </View>
                    {vGuardRishtaUser.otherSchemeBrand2 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand2} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand2: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked2} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked2: e })} placeholder='If yes, what you liked about the program.' />

                                </View>

                            </View>
                        </>
                    }
                    {vGuardRishtaUser.otherSchemeBrand3 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand3} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand3: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked3} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked3: e })} placeholder='If yes, what you liked about the program.' />

                                </View>

                            </View>
                        </>
                    }
                    {vGuardRishtaUser.otherSchemeBrand4 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand4} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand4: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked4} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked4: e })} placeholder='If yes, what you liked about the program.' />

                                </View>

                            </View>
                        </>
                    }
                    {vGuardRishtaUser.otherSchemeBrand5 &&
                        <>
                            <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                <TextInput editable={false} value={vGuardRishtaUser.otherSchemeBrand5} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, otherSchemeBrand5: e })} placeholder='If yes please mention scheme and brand name.' />

                            </View>
                            <View style={{ flexDirection: 'row', maxWidth: width }}>
                                <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                                    <TextInput editable={false} value={vGuardRishtaUser.abtOtherSchemeLiked5} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, abtOtherSchemeLiked5: e })} placeholder='If yes, what you liked about the program.' />

                                </View>

                            </View>
                        </>
                    }
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.annualBusinessPotential} onChangeText={(e) => setVGuardRishtaUser({ ...vGuardRishtaUser, annualBusinessPotential: e })} placeholder='Annual business potential*' />

                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder='Selfie' />
                        {vGuardRishtaUser.kycDetails.selfie ?
                            <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.selfie }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />
                        }
                    </View>
                    <Text>{'Aadhar Card'}</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder='Aadhar Card (Front)' />
                        {vGuardRishtaUser.kycDetails.aadharOrVoterOrDLFront ?
                            <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.aadharOrVoterOrDLFront }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </  View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder='Aadhar Card (Back)' />
                        {vGuardRishtaUser.kycDetails.aadharOrVoterOrDlBack ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.aadharOrVoterOrDlBack }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </  View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.kycDetails.aadharOrVoterOrDlNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, aadharOrVoterOrDlNo: e } }))} placeholder='Aadhar Card No' />

                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder='Update Pan Card (Front)' />
                        {vGuardRishtaUser.kycDetails.panCardFront ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.kycDetails.panCardFront }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.kycDetails.panCardNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, kycDetails: { ...vGuardRishtaUser.kycDetails, panCardNo: e } }))} placeholder='Pan No' />

                    </View>
                    <Text>{'Bank Details(For A/C transfer only'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.bankAccNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankAccNo: e } }))} placeholder='Account Number' />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.bankAccHolderName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankAccHolderName: e } }))} placeholder='Account Holder Name' />

                    </View>
                    <Text>{'Account Type'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.bankAccType} />

                    </View>
                    <Text>{'Bank Name'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.bankNameAndBranch} />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.bankIfsc} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, bankIfsc: e } }))} placeholder='IFSC Code' />

                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} placeholder='Cancelled cheque copy' />
                        {vGuardRishtaUser.bankDetail.checkPhoto ? <Image style={{ height: 24, width: 30, marginHorizontal: 10, alignSelf: 'center' }} source={{ uri: vGuardRishtaUser.bankDetail.checkPhoto }} /> :
                            <Image style={{ marginHorizontal: 10, alignSelf: 'center' }} source={require('../../../assets/images/photo_camera.png')} />}
                    </View>
                    <Text>{'Nominee Details(for Insurance purpose)'}</Text>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeName} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeName: e } }))} placeholder='Name of Nominee' />

                    </View>
                    <View style={{ width: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeDob} />
                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeMobileNo} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeMobileNo: e } }))} placeholder='Mobile Number' />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeEmail} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeEmail: e } }))} placeholder='E-mail' />

                    </View>

                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeAdd} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeAdd: e } }))} placeholder='Address' />

                    </View>
                    <View style={{ maxWidth: width * 0.8, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                        <TextInput editable={false} value={vGuardRishtaUser.bankDetail.nomineeRelation} onChangeText={(e) => setVGuardRishtaUser((vGuardRishtaUser) => ({ ...vGuardRishtaUser, bankDetail: { ...vGuardRishtaUser.bankDetail, nomineeRelation: e } }))} placeholder='Relationship with you' />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-around' }}>
                    <Pressable onPress={() => navigation.pop()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.3, height: 40, backgroundColor: 'black' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={() => InitatePreview()} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 5, width: width * 0.4, height: 40, backgroundColor: Colors.colorPrimary }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Submit</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default PreviewReUpdateKyc