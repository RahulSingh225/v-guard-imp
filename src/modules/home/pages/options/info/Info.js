import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ReusableCarousel from '../../../../../components/ReusableCarousel'
import colors from '../../../../../../colors';
import image from '../../../../../assets/images/banner_redeem_ppoints.webp'
import CustomTouchableOption from '../../../../../components/CustomTouchableOption';
import NeedHelp from '../../../../../components/NeedHelp';
import { useTranslation } from 'react-i18next';

const Info = () => {
  const { t } = useTranslation();

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
              text="strings:v_guard_info"
              iconSource={require('../../../../../assets/images/ic_vguard_info.webp')}
              screenName="vGuardInfo"
            />
      <CustomTouchableOption
              text="strings:downloads_small"
              iconSource={require('../../../../../assets/images/ic_downloads_.webp')}
              screenName="downloads"
            />
      <CustomTouchableOption
              text="strings:v_guard_product_catalog"
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
    backgroundColor: colors.white
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