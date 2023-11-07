import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { productCategories } from '../../HomeApiService';

const baseURL = 'https://www.vguardrishta.com/'; // Base URL

const ProductWise = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    productCategories()
      .then(response => response.json())
      .then(responseData => {
        const updatedData = responseData.map(category => ({
          ...category,
          imageUrl: baseURL + category.imageUrl,
        }));
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCategoryPress = (categoryId) => {
    // Check if the category has offers
    const category = data.find(item => item.categoryId === categoryId);
      console.log("category id:", categoryId)
      navigation.navigate('ProductWiseOfferTable', { categoryId });
  };

  return (
    <ScrollView style={styles.mainWrapper}>
      {data.map(category => (
        <TouchableOpacity
          key={category.categoryId}
          style={styles.categoryContainer}
          onPress={() => handleCategoryPress(category.categoryId)}
        >
          <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  categoryContainer: {
    alignItems: 'center',
    marginBottom: 1
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
});

export default ProductWise;
