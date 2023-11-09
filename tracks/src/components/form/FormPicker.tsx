import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormContext, Controller } from 'react-hook-form';
import Styles from '../../../customStyles';

const FormPicker = ({ control, errors }) => {
    return (
        <View>
            <Text className="font-bold text-xl">Select Colour</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Picker selectedValue={value} onValueChange={onChange}>
                            <Picker.Item label="Red" value="Red" />
                            <Picker.Item label="Green" value="Green" />
                            <Picker.Item label="Blue" value="Blue" />
                            <Picker.Item label="Yellow" value="Yellow" />
                            <Picker.Item label="Purple" value="Purple" />
                            <Picker.Item label="Orange" value="Orange" />
                        </Picker>
                        {errors.colour && (
                            <Text className={`${Styles.red}`}>
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
