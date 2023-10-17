import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {height, width} from '../utils/dimensions';

const BottomTabLogo = () => {
  return (
    <View style={{height: "100%", width: "20%"}}>
      <ImageBackground
        style={{
          
          
          marginTop:'auto',
          height: 80,
          width: 100,
         
        }}
        resizeMethod="resize"
        source={require('../assets/images/ic_home_logo_bg2.png')}>
        <View style={{height: '100%', width: '100%', justifyContent: 'space-around'}}>
          <Image
            style={{height: "50%", width: "50%", marginLeft:'10%'}}
            resizeMode="contain"
            source={require('../assets/images/ic_rishta_logo.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default BottomTabLogo;