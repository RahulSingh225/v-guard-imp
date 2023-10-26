import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from '../../../../colors';

const Profile = ({navigation}) => {
  const data = {
    language: 'English',
    gender: 'Male',
    date_of_birth: '23-09-2001',
    contact_no: '9000000000',
    whatsapp_no: '9000000000',
    email: 'john@example.com',
    permanent_address: 'Manjunantha Layout, Arekere, Near Indian Institute of Management, Bengaluru',
    profession: 'Electrician',
    enrolled_loyalty: true,
    name_of_scheme: 'XYZ',
    annual_bussiness_potential: 2,
    selfie: true,
    id_doc: true,
    pan_card: true,
    bank_details: false,
  };

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
      'Date of Birth': 'date_of_birth',
      'Contact': 'contact_no',
      'WhatsApp': 'whatsapp_no',
      'Permanent Address': 'permanent_address',
      'Enrolled in Scheme': 'enrolled_loyalty',
      'Annual Business Potential': 'annual_bussiness_potential',
      'ID Document': 'id_doc',
      'Pan Card': 'pan_card',
      'Bank Details': 'bank_details',
      'Preferred Language': 'language',
      'Gender': 'gender',
      'Email': 'email',
      'Profession': 'profession',
      'Selfie': 'selfie',
    };

    if (fieldName in fieldMap) {
      const mappedField = fieldMap[fieldName];
      if (mappedField in data) {
        const fieldValue = data[mappedField];
        return fieldValue === true ? 'Yes' : fieldValue === false ? 'No' : fieldValue;
      } else {
        return 'N/A';
      }
    } else if (fieldName in data) {
      const fieldValue = data[fieldName];
      return fieldValue === true ? 'Yes' : fieldValue === false ? 'No' : fieldValue;
    } else {
      return 'N/A';
    }
  };




  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>
        <View style={styles.ImageProfile}></View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('editProfile')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.profileText}>
        <Text style={styles.textDetail}>Test User</Text>
        <Text style={styles.textDetail}>XXXXX</Text>
        <Text style={styles.viewProfile}>View E-Visiting Card</Text>
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
