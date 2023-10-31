import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';

const FormDateTimePicker = ({ control }) => {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    return (
        <View>
            <Text className="font-bold text-xl">Date & Time</Text>
            <View className="flex-row justify-around pt-3 pb-3">
                <TouchableOpacity
                    onPress={() => {
                        setShowDate(true);
                    }}
                    className="bg-purple-400 h-8 w-28 justify-center"
                >
                    <Text className="text-center">Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setShowTime(true);
                    }}
                    className="bg-purple-400 h-8 w-28 justify-center"
                >
                    <Text className="text-center">Time</Text>
                </TouchableOpacity>
            </View>

            <Controller
                control={control}
                defaultValue={new Date(Date.now())}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        {showDate && (
                            <DateTimePicker
                                value={value}
                                mode={'date'}
                                is24Hour={true}
                                onChange={(event, date) => {
                                    onChange(date);
                                    setShowDate(false);
                                }}
                            />
                        )}
                        <Text className="text-center text-xl">
                            Date: {value.toLocaleDateString()}
                        </Text>
                    </View>
                )}
                name="date"
            />
            <Controller
                control={control}
                defaultValue={new Date(Date.now())}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        {showTime && (
                            <DateTimePicker
                                value={value}
                                mode={'time'}
                                is24Hour={true}
                                onChange={(event, date) => {
                                    onChange(date);
                                    setShowTime(false);
                                }}
                            />
                        )}
                        <Text className="text-center text-xl">
                            Time: {value.toLocaleTimeString()}
                        </Text>
                    </View>
                )}
                name="time"
            />
        </View>
    );
};

export default FormDateTimePicker;
