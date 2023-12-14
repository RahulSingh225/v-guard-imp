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
                value={date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                onFocus={onShowDatePicker}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()}
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
        borderColor: "transaparent",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        color: colors.black,
    },
});

export default DatePicker;
