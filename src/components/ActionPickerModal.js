import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal,Pressable } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input'; // Import your input component
import { Picker } from '@react-native-picker/picker'; // Import your Picker component
import { height, width } from '../utils/dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ActionPickerModal = ({onCamera,onGallery}) => {
    const [modalVisible, setModalVisible] = useState(true);
  

    
      
    return (
       
        <Modal style={{height:height/2,width:width/2,backgroundColor:'red'}}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Action!</Text>
            <Pressable style={{marginVertical:15}}
                
                onPress={onGallery}>
              <Text style={styles.textStyle}>Select photo from gallery</Text>
              </Pressable>
              <Pressable style={{marginVertical:15}}
                
                onPress={onCamera}>
                <Text style={styles.textStyle}>Capture photo from camera</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      
    );
};

const styles =  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor:'transparent'
    },
    modalView: {
        backgroundColor:'white',
      margin: 20,

    
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    modalText: {
      marginBottom: 15,
      fontWeight:'bold',
      textAlign: 'center',
    },
  });
  

export default ActionPickerModal;
