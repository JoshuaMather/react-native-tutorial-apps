import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormContext, Controller } from 'react-hook-form';

const FormPicker = ({ control, errors }) => {
    return (
        <View>
            <Text className="font-bold text-xl">Select Colour</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Picker selectedValue={value} onValueChange={onChange}>
                            <Picker.Item label="Red" value="red" />
                            <Picker.Item label="Green" value="green" />
                            <Picker.Item label="Blue" value="blue" />
                            <Picker.Item label="Yellow" value="yellow" />
                            <Picker.Item label="Purple" value="purple" />
                            <Picker.Item label="Orange" value="orange" />
                        </Picker>
                        {errors.colour && (
                            <Text className={`${styles.red}`}>
                                {errors.colour.message}
                            </Text>
                        )}
                    </View>
                )}
                name="colour"
            />
        </View>
    );
};

export default FormPicker;

const styles = {
    red: 'text-red-600',
};
