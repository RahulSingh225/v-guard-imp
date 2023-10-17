import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const CustomTouchableOption = ({ text, iconSource, screenName }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.oval}
      onPress={() => navigation.navigate(screenName)}>
      <View style={styles.optionIcon}>
        <Image
          source={iconSource}
          style={{ flex: 1, width: undefined, height: undefined }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.nav}>{t(text)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  oval: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(18),
    width: responsiveWidth(25),
    maxWidth: responsiveWidth(25),
    flexGrow: 1,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    elevation: 5,
    borderRadius: 100,
  },
  optionIcon: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    marginBottom: 20
  },
  nav: {
    color: colors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold'
  },
});

export default CustomTouchableOption;
