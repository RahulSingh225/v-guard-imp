import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {height, width} from '../utils/dimensions';

const BottomTabLogo = () => {
  return (
    <View style={{height: 100, width: 100}}>
      <ImageBackground
        style={{
          marginLeft: 50,
          marginTop: height * 0.8,
          height: 80,
          width: 80,
          justifyContent: 'center',
        }}
        
        resizeMethod="resize"
        source={require('../assets/images/ic_home_logo_bg2.png')}>
        <View style={{height: 100, width: 100, justifyContent: 'center'}}>
          <Image
            style={{height: 40, width: 40, justifyContent: 'center'}}
            resizeMode='contain'
            
            source={require('../assets/images/ic_rishta_logo.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default BottomTabLogo;
