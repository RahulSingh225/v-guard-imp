import messaging from "@react-native-firebase/messaging";

const notificationListener = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {});

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {});

  messaging().onMessage(async (remoteMessage) => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
};


export default notificationListener