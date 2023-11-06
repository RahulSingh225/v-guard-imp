import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

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
                <Text style={[styles.buttonText, variant === 'blackButton' && styles.yellowText]}>
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
        textAlignVertical:'top',
        fontSize: responsiveFontSize(1.8),
        color: colors.yellow,
        fontWeight: 'bold',
    },
    whiteText: {
        color: 'white',
    },
    yellowText: {
        color: colors.yellow
    },
    outlinedButton: {
        backgroundColor: 'transparent',
        borderColor: colors.black,
        borderWidth: 2,
    },
    filledButton: {
        backgroundColor: colors.yellow,
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        shadowOffset: { width: 1, height: 13 }
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    blackButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        flex:1,
        
    },
    defaultButton: {
        backgroundColor: colors.yellow,
    },
    icon: {
        marginLeft: 5,
    },
});

export default Buttons;
