import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../../../../colors';

const UniqueCodeHistory = () => {
  const { t } = useTranslation();
  const redemptionHistoryData = [
    {
      date: '2023-10-15',
      code: '7890123456',
      status: 'Failed',
    },
    {
      date: '2023-10-10',
      code: '3214567890',
      status: 'Failed',
    },
    {
      date: '2023-10-05',
      code: '1234567890',
      status: 'Failed',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.item]}>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.code}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>{t('dashboard:scan:UniqueCodeHeader')}</Text>
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
    width: '30%',
    color: colors.black,
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGrey,
  },
  status: {
    width: '24%',
    textAlign: 'center',
    backgroundColor: colors.yellow,
    color: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  }

});

export default UniqueCodeHistory;
