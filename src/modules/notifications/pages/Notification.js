import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getNotifications} from '../../../utils/apiservice';

const Notification = () => {
  useEffect(() => {
    getNotifications().then(async r => {
      console.log(r);
      const result = await r.json();
      console.log(result);
      setNotifications(result)
    });
  }, []);
  const data = [
    {
      alertDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      alertDate: '23-10-2023',
    },
    {
      alertDesc:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      alertDate: '3-07-2023',
    },
    {
      alertDesc:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      alertDate: '24-05-2023',
    },
    {
      alertDesc:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      alertDate: '23-01-2023',
    },
  ];
  const [notifications, setNotifications] = useState(data);

  return (
    <ScrollView style={styles.mainWrapper}>
      {notifications.map((item, index) => (
        <View key={index} style={styles.messageItem}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/ic_alert_.png')}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.messageHeader}>{item.alertDate}</Text>
            <ScrollView style={styles.messageTextContainer} horizontal={true}>
              <Text style={styles.messageText}>{item.alertDesc}</Text>
            </ScrollView>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
  },
  header: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
  },
  messageItem: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  messageHeader: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: colors.black,
  },
  messageText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.black,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: responsiveFontSize(5),
    width: responsiveFontSize(5),
  },
  messageTextContainer: {
    maxWidth: responsiveWidth(75),
    overflow: 'hidden',
  },
});

export default Notification;
