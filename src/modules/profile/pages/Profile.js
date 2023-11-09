import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image, Linking, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from '../../../../colors';
import { getUserProfile } from '../../../utils/apiservice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const Profile = ({navigation}) => {
  const baseURL = 'https://www.vguardrishta.com/img/appImages/Profile/';
  const ecardURL = 'https://www.vguardrishta.com/img/appImages/eCard/';

  const [data, setData] = useState([]);
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userImage').then((userimage) => {
      setUserImage(userimage);
    });
    AsyncStorage.getItem('name').then((name) => {
      setUserName(name);
    });
    AsyncStorage.getItem('userCode').then((code) => {
      setUserCode(code);
    });
    getUserProfile()
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);
        console.log("<><<><<><>><", responseData, "<><<<><><><><><><<><");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const labels = [
    'Preferred Language',
    'Gender',
    'Date of Birth',
    'Contact',
    'WhatsApp',
    'Email',
    'Permanent Address',
    'Profession',
    'Enrolled in Scheme',
    'Annual Business Potential',
    'Selfie',
    'ID Document',
    'Bank Details',
    'Pan Card',
  ];
  const renderField = (fieldName) => {
    const fieldMap = {
      'Date of Birth': 'dob',
      'Contact': 'contactNo',
      'WhatsApp': 'whatsappNo',
      'Permanent Address': 'permanentAddress',
      'Enrolled in Scheme': 'enrolledOtherSchemeYesNo',
      'Annual Business Potential': 'annualBusinessPotential',
      'Preferred Language': 'preferredLanguage',
      'Gender': 'gender',
      'Email': 'emailId',
      'Profession': 'profession',
    };
  
    if (fieldName in fieldMap) {
      const mappedField = fieldMap[fieldName];
      if (mappedField in data) {
        const fieldValue = data[mappedField];
        return fieldValue === true ? 'Yes' : fieldValue === false ? 'No' : fieldValue;
      } else {
        return 'N/A';
      }
    } else if (fieldName === 'Selfie') {
      if (data.kycDetails && data.kycDetails.selfie) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else if (fieldName === 'ID Document') {
      if (data.kycDetails && data.kycDetails.aadharOrVoterOrDLFront && data.kycDetails.aadharOrVoterOrDlBack && data.kycDetails.aadharOrVoterOrDlNo) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else if (fieldName === 'Pan Card') {
      if (data.kycDetails && data.kycDetails.panCardFront && data.kycDetails.panCardBack && data.kycDetails.panCardNo) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else if (fieldName === 'Bank Details') {
      if (data.bankDetail && data.bankDetail.bankAccNo) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else if (fieldName in data) {
      const fieldValue = data[fieldName];
      return fieldValue === true ? 'Yes' : fieldValue === false ? 'No' : fieldValue;
    } else {
      return 'N/A';
    }
  };
  

  const openEVisitingCard = () => {
    console.log(ecardURL+data.ecardPath, 'url---------')
    Linking.openURL(ecardURL+data.ecardPath);
  };
  
  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>
        <View style={styles.ImageProfile}>
        <Image source={{ uri: baseURL + userImage }} style={{ width: '100%', height: '100%', borderRadius: 100 }} resizeMode='contain' />
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('editProfile')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.profileText}>
        <Text style={styles.textDetail}>{userName}</Text>
        <Text style={styles.textDetail}>{userCode}</Text>
        <TouchableOpacity onPress={openEVisitingCard}>
        <Text style={styles.viewProfile}>View E-Visiting Card</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        {labels.map((label, index) => (
          <View style={styles.labelDataContainer}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.data}>{renderField(label)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.white,
  },
  ImageProfile: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 100,
  },
  textName: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(2),
  },
  label: {
    color: colors.grey,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(3),
    fontWeight: 'bold'
  },
  textDetail: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold'
  },
  viewProfile: {
    color: colors.yellow,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7),
  },
  data: {
    color: colors.black,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(3),
    textAlign: 'right',
    fontWeight: 'bold'
  },
  profileText: {
    marginTop: responsiveHeight(2),
  },
  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 5,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
  },
  detailsContainer: {
    flexDirection: 'column',
    marginBottom: 50
  },
  labelDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default Profile;
