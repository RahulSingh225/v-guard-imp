import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../colors';

const Buttons = ({ label, onPress, disabled, variant, width, icon, iconWidth, iconHeight, iconGap }) => {
    const getButtonStyle = () => {
        if (variant === 'outlined') {
            return [styles.outlinedButton, { width }];
        } else if (variant === 'filled') {
            return [styles.filledButton, { width }];
        } else if (variant === 'disabled') {
            return [styles.disabledButton, { width }];
        } else if (variant === 'blackButton') {
            return [styles.blackButton, { width }];
        } else {
            return [styles.defaultButton, { width }];
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle()]}
            onPress={onPress}
            disabled={variant === 'disabled' || disabled}
        >
            <View style={[styles.buttonContent, { gap: iconGap }]}>
                <Text style={[styles.buttonText, variant === 'blackButton' && styles.whiteText]}>
                    {label}
                </Text>
                <Image
                    source={icon}
                    style={[styles.icon, { width: iconWidth, height: iconHeight }]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: colors.black,
        fontWeight: 'bold',
    },
    whiteText: {
        color: 'white',
    },
    outlinedButton: {
        backgroundColor: 'transparent',
        borderColor: colors.black,
        borderWidth: 2,
    },
    filledButton: {
        backgroundColor: colors.yellow,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    blackButton: {
        backgroundColor: 'black',
        borderRadius: 5,
    },
    defaultButton: {
        backgroundColor: colors.yellow,
    },
    icon: {
        marginLeft: 5, // Add spacing between text and icon
    },
});

export default Buttons;
