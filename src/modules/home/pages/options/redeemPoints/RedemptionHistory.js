import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../../../../colors';

const RedemptionHistory = () => {
  const { t } = useTranslation();
  const redemptionHistoryData = [
    {
      date: '2023-10-15',
      product: 'Product A',
      status: 'Active',
    },
    {
      date: '2023-10-10',
      product: 'Product B',
      status: 'Delivered',
    },
    {
      date: '2023-10-05',
      product: 'Product C',
      status: 'Credited',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.item]}>
      <Text style={[styles.text, item.status === 'Active' ? styles.activeText : styles.inactiveText]}>{item.date}</Text>
      <Text style={[styles.text, item.status === 'Active' ? styles.activeText : styles.inactiveText]}>{item.product}</Text>
      <Text style={[styles.status, item.status === 'Active' ? styles.activeItem : styles.inactiveItem]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>{t('dashboard:redeem:redemptionHistoryOption:header')}</Text>
      </View>
      <FlatList
        data={redemptionHistoryData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: colors.black,
  },
  headerWrapper: {
    padding: 15,
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex'
  },
  text: {
    flexGrow: 1,
    width: '30%'
  },
  activeItem: {
    backgroundColor: colors.yellow,
    color: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  },
  inactiveItem: {
    backgroundColor: colors.lightGrey,
    color: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
  },
  activeText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: colors.grey,
    fontWeight: 'bold'
  },
  status: {
    width: '24%',
    textAlign: 'center'
  }

});

export default RedemptionHistory;
