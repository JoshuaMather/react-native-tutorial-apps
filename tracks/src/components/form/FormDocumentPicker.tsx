import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native-elements';

const FormDocumentPicker = ({ control, setValue, errors }) => {
    const pickDocument = async (onChange) => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        onChange(result);
    };

    return (
        <Controller
            control={control}
            defaultValue={{}}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <Text className="font-bold text-xl pb-2">Document</Text>
                    {value?.assets && (
                        <>
                            <Text
                                className="text-lg text-gray-600 pl-3 pb-2"
                                style={{ textTransform: 'capitalize' }}
                            >
                                {value?.assets[0].name}
                            </Text>
                            <Text
                                className="text-lg text-gray-600 pl-3 pb-2"
                                style={{ textTransform: 'capitalize' }}
                            >
                                {value?.assets[0].mimeType}
                            </Text>
                        </>
                    )}
                    <Button
                        title={'Choose'}
                        type="clear"
                        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                        onPress={() => pickDocument(onChange)}
                    />
                    {value?.assets && (
                        <Button
                            title={'Remove'}
                            type="clear"
                            titleStyle={{ color: 'rgba(245, 0, 0, 0.8)' }}
                            onPress={() => setValue('document', {})}
                        />
                    )}
                    {errors.document && (
                        <Text className={`${styles.red}`}>
                            {errors.document.message}
                        </Text>
                    )}
                </View>
            )}
            name="document"
        />
    );
};

export default FormDocumentPicker;

const styles = {
    red: 'text-red-600',
};
