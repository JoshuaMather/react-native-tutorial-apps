import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {
    useForm,
    SubmitHandler,
    Controller,
    FieldErrors,
} from 'react-hook-form';
import Spacer from '../components/Spacer';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Input } from 'react-native-elements';

type Fields = {
    test: string;
    requiredTest: string;
};

const TestFormScreen = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isLoading },
    } = useForm<Fields>();
    const onSubmit = (data) => console.log(data);
    const onError = (errors: FieldErrors<Fields>) =>
        console.log('Errors: ', errors);

    // console.log(watch('test'));
    // console.log(watch('requiredTest'));

    if (isLoading) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    return (
        <View>
            <Text className="text-center text-4xl pt-5 font-bold">
                Test Form
            </Text>
            {/* <TextInputPaper
                label="Email"
                value={''}
                onChangeText={(text) => console.log(text)}
                accessibilityStates={undefined}
                accessibilityComponentType={undefined}
                accessibilityTraits={undefined}
                autoCompleteType={undefined}
            /> */}

            {/* <Input placeholder="BASIC INPUT" /> */}
            <Spacer>
                <Controller
                    control={control}
                    rules={{ maxLength: 20, minLength: 3 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="pb-5">
                            <Text className="font-bold text-xl">Text Test</Text>
                            <TextInput
                                placeholder="Test..."
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                className="text-lg"
                            />
                            {errors.test && (
                                <Text className={`${styles.red}`}>
                                    Must be at least 3 and less than 20
                                    characters
                                </Text>
                            )}
                        </View>
                    )}
                    name="test"
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="pb-5">
                            <Text className="font-bold text-xl">
                                Required Text Test
                                <Text
                                    className={`${styles.red} font-extrabold`}
                                >
                                    *
                                </Text>
                            </Text>
                            <TextInput
                                placeholder="requiredTest"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                // secureTextEntry={true}
                                className="text-lg"
                            />
                            {errors.requiredTest && (
                                <Text className={`${styles.red}`}>
                                    Required
                                </Text>
                            )}
                        </View>
                    )}
                    name="requiredTest"
                />

                <Button
                    title="Submit"
                    onPress={handleSubmit(onSubmit, onError)}
                />
            </Spacer>
        </View>
    );
};

const styles = {
    red: 'text-red-600',
};

export default TestFormScreen;
