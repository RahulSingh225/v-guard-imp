import { View, Text, StyleSheet, TouchableHighlight, Image, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from '../../../../../../colors';
import NeedHelp from '../../../../../components/NeedHelp';
import Buttons from '../../../../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { fetchTicketOptions } from '../../HomeApiService';
import { Picker } from '@react-native-picker/picker';


const Ticket = ({ navigation }) => {
  
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState('');
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionsLoading, setIsOptionsLoading] = useState(true); // Track if options are loading


  useEffect(() => {
    AsyncStorage.getItem('name').then((name) => {
      setUserName(name);
    });
    AsyncStorage.getItem('userCode').then((code) => {
      setUserCode(code);
    });
    fetchTicketOptions()
      .then(response => response.json())
      .then(data => {
        setOptions(data);
        setIsOptionsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
        setIsOptionsLoading(false);
      });
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const openTnC = () => {
    Linking.openURL("https://vguardrishta.com/tnc_retailer.html");
  };
  openFaqS = () => {
    Linking.openURL("https://vguardrishta.com/frequently-questions-retailer.html");
  }

  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.flexBox}>

        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}></View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userName}</Text>
            <Text style={styles.textDetail}>{userCode}</Text>
          </View>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('ticketHistory')}
        >
          <Text style={styles.buttonText}>Ticket History</Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.blackText}>Issue Type</Text>
      {isOptionsLoading ? (
        <Text style={styles.blackText}>Loading options...</Text>
      ) : options.length === 0 ? (
        <Text style={styles.blackText}>No options available.</Text>
      ) : (
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}
            style={styles.picker}
          >
            {options.map(option => (
              <Picker.Item key={option.issueTypeId} label={option.name} value={option.issueTypeId} />
            ))}
          </Picker>
          {/* <View style={styles.inputImage}>
          <Image source={require('../../../../../assets/images/ic_ticket_drop_donw1.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain" />
          </View> */}
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('dashboard:ticket:uploadPicture')}
          placeholderTextColor={colors.grey}
        />
        <View style={styles.inputImage}>
          <Image source={require('../../../../../assets/images/photo_camera.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain" />
        </View>
      </View>
      <Text style={styles.blackText}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder={t('dashboard:ticket:description')}
        placeholderTextColor={colors.grey}
        multiline={true}
        textAlignVertical="top"
      />
      <Buttons
        label={t('dashboard:ticket:submit')}
        variant="filled"
        onPress={() => console.log('Pressed')}
        width="100%"
      />
      <View style={styles.hyperlinks}>
        <TouchableOpacity onPress={openTnC}>
          <Text style={styles.linkText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openFaqS}>
          <Text style={styles.linkText}>Frequently Asked Questions (FAQs)</Text>
        </TouchableOpacity>
      </View>
      <NeedHelp />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  picker: {
    color: colors.black,
    // backgroundColor: colors.grey,
    height: responsiveHeight(5),
    width: '100%',
    fontSize: responsiveFontSize(1.5)
  },
  mainWrapper: {
    padding: 15,
    flexGrow: 1,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    fontSize: responsiveFontSize(1.7),
  },
  ImageProfile: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 100
  },
  textDetail: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.7)
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5)
  },
  button: {
    backgroundColor: colors.yellow,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 5
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
    fontWeight: 'bold'
  },
  descriptionInput: {
    width: '100%',
    height: responsiveHeight(25),
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)
  },
  inputImage: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    marginRight: 5
  },
  blackText: {
    color: colors.black,
    fontWeight: 'bold',
    marginTop: responsiveHeight(4),
  },
  hyperlinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(1)
  },
  linkText: {
    color: 'blue', 
    textDecorationLine: 'underline',
    fontSize: responsiveFontSize(1.5)
  }
})

export default Ticket