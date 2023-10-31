import React from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import closeIcon from '../assets/images/ic_close.png'

const LogoutConfirmationPopup = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) {
        return null;
      }
  return (
    <Modal
      visible={isVisible} animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.popupText}>Are you sure you want to logout?</Text>
        <Button style={styles.button} title="Yes" onPress={onConfirm} color={colors.black} />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={closeIcon} style={{ flex: 1, width: "100%", height: "100%" }}
          resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        height: '30%',
        width: '80%',
        padding: 30,
        backgroundColor: colors.yellow,
        borderRadius: 10,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
      closeButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: responsiveHeight(8),
        height: responsiveHeight(8),
      },
      closeButtonText: {
        color: 'blue',
      },
      popupText: {
        color: colors.black,
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: responsiveHeight(3),
        width: '70%'
      },
      button: {
        borderRadius: 10,
        marginTop: 20,
        padding: 5
      }
});

export default LogoutConfirmationPopup;
