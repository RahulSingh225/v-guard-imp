import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input'; // Import your input component
import { Picker } from '@react-native-picker/picker'; // Import your Picker component

const ActionPickerModal = ({ label, onSelectAction, selectedValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <FloatingLabelInput
                label={label}
                value={selectedValue}
                onFocus={() => setModalVisible(true)}
                containerStyles={[styles.input]}
                staticLabel
                labelStyles={styles.labelStyles}
                inputStyles={{
                    color: 'black',
                    paddingHorizontal: 10,
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Picker
                            mode="dropdown"
                            style={{ color: 'black' }}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => {
                                onSelectAction(itemValue);
                                setModalVisible(false);
                            }}
                        >
                            <Picker.Item label="Select Action" value="" />
                            <Picker.Item label="Select Photo from gallery" value="Open Image picker" />
                            <Picker.Item label="Capture Photo from camera" value="Open camera" />
                        </Picker>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        // Your input styles
    },
    labelStyles: {
        // Your label styles
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    closeButton: {
        color: 'blue',
        marginTop: 10,
    },
});

export default ActionPickerModal;
