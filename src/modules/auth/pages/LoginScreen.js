import {View, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const LoginScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('auth:login:label')}</Text>
    </View>
  );
};

export default LoginScreen;
