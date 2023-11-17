import {View, Text} from 'react-native';
import React from 'react';
import KycDetails from './KycDetails';
import PointsSummary from './PointsSummary';
import BankDetail from './BankDetail';
import WelcomeBanner from './WelcomeBanner';

const VguardRishtaUser = {
  appVersionCode: null,
  egvEnabled: null,
  currPinCodeId: null,
  welcomePointsMsg: null,
  welcomePointsErrorCode: 0,
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

  bankDetail: BankDetail.newBankDetail(),

  pointsSummary: PointsSummary.newPointsSummary(),

  kycDetails: KycDetails.newKycDetails(),
  otpType: null,
  rejectedReasonsStr: null,
  roleId: null,
  gstNo: null,
  gstYesNo: '',
  gstPic: null,
  categoryDealInID: null,
  categoryDealIn: null,
  aspireGift: null,
  firmName: null,
  tierFlag: null,
  fcmToken: null,
  active: null,
  welcomeBanner: WelcomeBanner.newWelcomeBanner(),
  panNumber: null,
  panImage: null,
  updateAccount: null,
};

export default Object.freeze(VguardRishtaUser);
