import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewUser = () => {
  return (
    <View style={styles.container}>
      <Text>Login with OTP</Text>
      {/* Add your OTP login components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewUser;
