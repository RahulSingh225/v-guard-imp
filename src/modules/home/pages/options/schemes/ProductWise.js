import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import colors from '../../../../../../colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ProductWise = () => {
  return (
    <ScrollView style={styles.mainWrapper}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/image1.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productContainer}>
        </View>
        <View style={styles.downArrowContainer}>
          <Image
            style={[styles.downArrow, { transform: [{ rotate: '-90deg' }] }]}
            source={require('../../../../../assets/images/down_yellow_arrow.png')}
          />
        </View>
      </View>
      <View style={styles.row}>
        
        <View style={styles.productContainer}>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/image2.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.downArrowContainer}>
          <Image
            style={[styles.downArrow, { transform: [{ rotate: '90deg' }] }]}
            source={require('../../../../../assets/images/down_yellow_arrow.png')}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/image3.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productContainer}>
        </View>
        <View style={styles.downArrowContainer}>
          <Image
            style={[styles.downArrow, { transform: [{ rotate: '-90deg' }] }]}
            source={require('../../../../../assets/images/down_yellow_arrow.png')}
          />
        </View>
      </View>
      <View style={styles.row}>
        
        <View style={styles.productContainer}>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/image4.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.downArrowContainer}>
          <Image
            style={[styles.downArrow, { transform: [{ rotate: '90deg' }] }]}
            source={require('../../../../../assets/images/down_yellow_arrow.png')}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  productContainer: {
    width: '50%',
    backgroundColor: colors.grey,
  },
  imageContainer: {
    width: '50%',
    backgroundColor: colors.black,
    padding: 30,
  },
  downArrowContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -responsiveWidth(2.5) }, { translateY: -responsiveHeight(1.5) }],
  },
  downArrow: {
    height: responsiveFontSize(3),
    width: responsiveFontSize(3),
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    height: responsiveHeight(20),
    marginBottom: 1
  },
  dot: {
    textAlign: 'center',
    color: colors.black
  }
});

export default ProductWise;
