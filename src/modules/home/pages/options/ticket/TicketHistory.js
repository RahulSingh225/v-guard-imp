import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import colors from '../../../../../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { fetchTicketHistory } from '../../HomeApiService';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const TicketHistory = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    userName: '',
    userId: '',
    userCode: '',
    userImage: '',
    userRole: ''
  });
  const [profileImage, setProfileImage] = useState('');


  useEffect(() => {
    AsyncStorage.getItem('USER').then(r => {
      const user = JSON.parse(r);
      console.log(user);
      const data = {
        userName: user.name,
        userCode: user.userCode,
        pointsBalance: user.pointsSummary.pointsBalance,
        redeemedPoints: user.pointsSummary.redeemedPoints,
        userImage: user.kycDetails.selfie,
        userRole: user.professionId,
        userId: user.contactNo
      };
      setUserData(data);
    });
    fetchTicketHistory()
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);
        console.log("<><<><<><>><", responseData, "<><<<><><><><><><<><");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log("<><><><><><")
    if (userData.userRole && userData.userImage) {
      
      const getImage = async () => {
        try {
          const profileImage = await getFile(userData.userImage, 'PROFILE', userData.userRole);
          setProfileImage(profileImage.url);
        } catch (error) {
          console.log('Error while fetching profile image:', error);
        }
      };
  
      getImage();
    }
  }, [userData.userRole, userData.userImage]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexBox}>

        <View style={styles.profileDetails}>
          <View style={styles.ImageProfile}>
            <Image source={{ uri: profileImage }} style={{ width: '100%', height: '100%', borderRadius: 100 }} resizeMode='contain' />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.textDetail}>{userData.userName}</Text>
            <Text style={styles.textDetail}>{userData.userCode}</Text>
          </View>
        </View>
      </View>
      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{t('strings:no_data')}</Text>
        </View>
      ) : (
        data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.createdDate}</Text>
              <Text style={styles.messageText}>{item.name}</Text>
              <View style={styles.statusContainer}>
                {/* <Image style={styles.downImage} source={require('../../../../../assets/images/ic_ticket_drop_donw1.png')} /> */}
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: responsiveFontSize(2),
    color: colors.grey,
    fontWeight: 'bold',
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  messageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageText: {
    fontSize: responsiveFontSize(1.6),
    textAlign: 'left',
    color: colors.black
  },
  status: {
    backgroundColor: colors.yellow,
    color: colors.black,
    padding: 5,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    borderRadius: 5
  },
  downImage: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(2)
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default TicketHistory;
