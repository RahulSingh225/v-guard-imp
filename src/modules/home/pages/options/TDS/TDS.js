import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../../../../../colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getAccessmentYear } from '../../HomeApiService';


const TDS = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  // const data = [
  //   {
  //     year: '2022-2023',
  //     file: 'https://www.africau.edu/images/default/sample.pdf'
  //   },
  //   {
  //     year: '2021-2022',
  //     file: 'https://www.africau.edu/images/default/sample.pdf'
  //   },
  // ]

  useEffect(()=>{
    getAccessmentYear()
    .then(response => response.json())
    .then(data => {
      setData(data);
      console.log("DATA::::::::::::", data)
    })
    .catch(error => {
      console.error('Error fetching options:', error);
    });
  }, []);


  const handleDownload = (file) => {
    // Linking.openURL(file);
  };
  return (
    <View style={styles.mainWrapper}>
      <Text style={styles.header}>{t('strings:tds_certificate')}</Text>
      <Text style={styles.greyText}>Select Assessment Year</Text>
      {data.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.yearText}>{item}</Text>
          <TouchableOpacity onPress={() => handleDownload(item)}>
            <Image style={styles.downImage} source={require('../../../../../assets/images/ic_ticket_drop_down2.png')} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: colors.black,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  mainWrapper: {
    padding: 15,
  },
  greyText: {
    color: colors.grey,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  yearText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: colors.black
  },
  downImage: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5)
  },
})

export default TDS
