// LanguagePicker.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../utils/i18n';
import { Picker } from '@react-native-picker/picker';
import colors from '../../colors';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const LanguagePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => changeLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hn" />
        <Picker.Item label="Bengali" value="bn" />
        <Picker.Item label="Kannada" value="kn" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black
  },
  picker: {
    color: colors.black
  }
});

export default LanguagePicker;
