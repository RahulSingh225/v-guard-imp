import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import colors from '../../../../../../colors';
import { productWiseOffers } from '../../HomeApiService';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../../components/Loader';

const ProductWiseOfferTable = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [loader, showLoader] = useState(false);

  useEffect(() => {
    showLoader(true);
    productWiseOffers(categoryId)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        setData(responseData);
        showLoader(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.text, { flex: 0.5 }]}>{item.serialNumber}</Text>
      <Text style={[styles.text, { flex: 1 }]}>{item.points}</Text>
      <Text style={[styles.text, { flex: 1.5 }]}>{item.materialDesc}</Text>
    </View>
  );

  const dataForFlatList = data.map((product, index) => ({
    key: index.toString(),
    serialNumber: (index + 1).toString(),
    points: product.points.toString(),
    materialDesc: product.materialDesc,
  }));

  return (
    <ScrollView style={styles.mainWrapper}>
      {loader && <Loader />}
      <View style={styles.head}>
        <Text style={[styles.text, { flex: 0.5 }]}>Sl.No</Text>
        <Text style={[styles.text, { flex: 1 }]}>Points</Text>
        <Text style={[styles.text, { flex: 1.5 }]}>Material Description</Text>
      </View>
      <FlatList
        data={dataForFlatList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  head: {
    flexDirection: 'row',
    height: responsiveHeight(7),
    backgroundColor: colors.lightGrey,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 10,
  },
  text: {
    color: colors.black,
    textAlign: 'center',
    margin: 5,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    marginBottom: 10,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default ProductWiseOfferTable;
