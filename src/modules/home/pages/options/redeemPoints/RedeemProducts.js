import { View, Text, Button } from 'react-native'
import React, {useState} from 'react'
import Popup from '../../../../../components/Popup'

const RedeemProducts = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <View>
      <Button title="Show Popup" onPress={togglePopup} />

      <Popup isVisible={isPopupVisible} onClose={togglePopup}>
        <Text style={{ fontWeight: 'bold' }}>This is a global popup!</Text>
      </Popup>
    </View>
  )
}

export default RedeemProducts