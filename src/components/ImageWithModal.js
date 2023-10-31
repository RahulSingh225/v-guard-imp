import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { height, width } from '../utils/dimensions';

const ImageWithModal = ({ imageUri }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View>
            {/* Image with a modal */}
            <TouchableWithoutFeedback onPress={toggleModal}>
                <View>
                    <Image
                        resizeMode="cover"
                        source={{ uri: imageUri }}
                        style={{
                            width: width / 8,
                            height: height / 18,
                            backgroundColor: 'red',
                            borderRadius: 5,
                            margin: 5,
                        }}
                    />
                    {/* <Text style={{ color: 'black' }}>
                        {imageUri.name.substring(0, 30)}
                    </Text> */}
                </View>
            </TouchableWithoutFeedback>

            {/* The Modal */}
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: imageUri }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={toggleModal}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default ImageWithModal;
