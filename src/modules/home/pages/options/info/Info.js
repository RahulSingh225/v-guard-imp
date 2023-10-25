import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ReusableCarousel from '../../../../../components/ReusableCarousel'
import colors from '../../../../../../colors';
import image from '../../../../../assets/images/banner_redeem_ppoints.webp'
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import NeedHelp from '../../../../../components/NeedHelp';

const Info = () => {
  const carouselData = [
    { imageUrl: require('../../../../../assets/images/banner_redeem_ppoints.webp') },
    { imageUrl: require('../../../../../assets/images/banner.webp') },
    { imageUrl: require('../../../../../assets/images/banner_redeem_ppoints.webp') },
  ];
  
  return (
    <View  style={styles.container}>
      <View style={styles.carousel}>
        <ReusableCarousel data={carouselData} />
      </View>
      <View style = {styles.mainWrapper}>
      <View style={styles.options}>
      <CustomTouchableOption
              text="dashboard:info:vguardInfo"
              iconSource={require('../../../../../assets/images/ic_vguard_info.webp')}
              screenName="vGuardInfo"
            />
      <CustomTouchableOption
              text="dashboard:info:downloads"
              iconSource={require('../../../../../assets/images/ic_downloads_.webp')}
              screenName="downloads"
            />
      <CustomTouchableOption
              text="dashboard:info:catalogue"
              iconSource={require('../../../../../assets/images/ic_vguard_product_catalog.webp')}
              screenName="productCatalogue"
            />
      </View>
      <NeedHelp />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  carousel: {
    backgroundColor: colors.black
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30
  },
  mainWrapper: {
    padding: 15
  }
});

export default Info