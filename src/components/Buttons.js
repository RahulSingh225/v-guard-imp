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
            <View style={[styles.buttonContent, {gap: iconGap}]}>
                <Text style={styles.buttonText}>{label}</Text>
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
    outlinedButton: {
        backgroundColor: 'transparent',
        borderColor: colors.black,
        borderWidth: 2,
    },
    filledButton: {
        backgroundColor: colors.yellow,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    defaultButton: {
        backgroundColor: colors.yellow,
    },
});

export default Buttons;
