import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'

const UniqueCodeHistory = () => {
  return (
    <View>
      <Text style={styles.text}>UniqueCodeHistory</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color: colors.black
    }
})

export default UniqueCodeHistory