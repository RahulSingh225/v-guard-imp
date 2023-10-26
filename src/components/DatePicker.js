import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../colors';

const DatePicker = ({ date, onDateChange, showDatePicker, onShowDatePicker }) => {
    return (
        <View>
            <TextInput
            style={styles.input}
                placeholder="Select date"
                value={date.toLocaleDateString()}
                onFocus={onShowDatePicker}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={onDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: colors.lightGrey,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        color: colors.black,
        marginBottom: 10,
    },
})

export default DatePicker;
