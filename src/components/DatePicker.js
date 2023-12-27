import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../colors';

const DatePicker = ({label, date, onDateChange, showDatePicker, onShowDatePicker,maximum_date }) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={label?label:"Select date"}
                value={date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                onFocus={onShowDatePicker}
            />
            {showDatePicker && (
                <DateTimePicker
                    maximumDate={maximum_date}
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
