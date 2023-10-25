import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'

const Welfare = () => {
  return (
    <View style={styles.mainWrapper}>
      <Text style={styles.text}>No Data</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
    fontWeight: 'bold'
  },
  mainWrapper: {
    height: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Welfare