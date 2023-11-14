import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Buttons from '../../../components/Buttons';
import colors from '../../../../colors';
import language from '../../../assets/images/language.png';
import arrowIcon from '../../../assets/images/arrow.png';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.buttonContainer}>
        <Buttons
          style={styles.button}
          label=""
          variant="outlined"
          onPress={() => alert('Choose Your Language')}
          iconHeight={30}
          iconWidth={30}
          iconGap={0}
          icon={language}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/group_910.png')}
          style={styles.imageVguard}
        />
        <Image
          source={require('../../../assets/images/group_907.png')}
          style={styles.imageSaathi}
        />
      </View>
      <View style={styles.startButtonContainer}>
        <Buttons
          style={styles.startButton}
          label={t('strings:start')}
          variant="filledButton"
          onPress={() => navigation.navigate('category')}
          iconHeight={10}
          iconWidth={30}
          iconGap={30}
          icon={arrowIcon}
          width="90%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    padding: 25,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    alignSelf: 'right',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
    width: '100%',
    gap: 100,
  },
  imageVguard: {
    width: 200,
    height: 73,
  },
  imageSaathi: {
    width: 200,
    height: 196,
  },
  startButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
});

export default SplashScreen;
