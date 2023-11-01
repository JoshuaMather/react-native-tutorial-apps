import React, { useRef, useMemo, useCallback, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    useForm,
    SubmitHandler,
    Controller,
    FieldErrors,
    FormProvider,
} from 'react-hook-form';
import Spacer from '../components/Spacer';
import { TextInput as TextInputPaper, RadioButton } from 'react-native-paper';
import { Input } from 'react-native-elements';
import FormImage from '../components/form/FormImage';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as FileSystem from 'expo-file-system';
import FormPicker from '../components/form/FormPicker';
import Checkbox from 'expo-checkbox';
import FormSignature from '../components/form/FormSignature';
import FormBarcodeScanner from '../components/form/FormBarcodeScanner';
import FormDateTimePicker from '../components/form/FormDateTimePicker';
import FormMultiSelect from '../components/form/FormMultiSelect';

type Fields = {
    test: string;
    requiredTest: string;
    imageUrl: string;
    colour: string;
    checked: boolean;
    signature: string;
    barcode: {
        type: string;
        data: string;
    };
    date: string;
    time: string;
    radio: string;
    multiSelect: string[];
};

const TestFormScreen = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        formState: { errors, isLoading },
    } = useForm<Fields>();

    const onSubmit = async (data) => {
        console.log('data', data);
        if (data.imageUrl) {
            const fileBase64 = await FileSystem.readAsStringAsync(
                data.imageUrl,
                {
                    encoding: 'base64',
                }
            );
            console.log('base64', fileBase64);
        }
    };

    const onError = (errors: FieldErrors<Fields>) =>
        console.log('Errors: ', errors);
    const methods = useForm();

    const setImageUrlValue = (url) => {
        console.log('url', url);
        setValue('imageUrl', url);
    };

    const checkBox = () => {
        setValue('checked', !getValues('checked'));
    };

    const childImageRef = useRef(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const sheetHandle = () => {
        setSheetOpen((prevSheetOpen) => !prevSheetOpen);
    };
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    const backdropComponent = (props) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            onPress={sheetHandle}
        />
    );

    // console.log(watch('test'));
    // console.log(watch('requiredTest'));

    if (isLoading) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    return (
        <View className="flex-1">
            <Text className="text-center text-4xl pt-5 font-bold border-b-2 border-[#03fcf4]">
                Test Form
            </Text>
            <ScrollView>
                <FormProvider {...methods}>
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
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View className="pb-5">
                                    <Text className="font-bold text-xl">
                                        Text Test
                                    </Text>
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
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
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
                        <View className="pb-5">
                            <FormImage
                                ref={childImageRef}
                                toggleSheet={sheetHandle}
                                control={control}
                                watch={watch}
                                setImageUrlValue={setImageUrlValue}
                            />
                        </View>
                        <View className="pb-5">
                            <FormPicker control={control} />
                        </View>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View className="pb-5">
                                    <Text className="font-bold text-xl pb-2">
                                        Required Checked
                                        <Text
                                            className={`${styles.red} font-extrabold`}
                                        >
                                            *
                                        </Text>
                                    </Text>
                                    <TouchableOpacity
                                        className="flex-row justify-between px-3"
                                        activeOpacity={1}
                                        onPress={checkBox}
                                    >
                                        <Text className="text-lg">Agree</Text>
                                        <Checkbox
                                            value={value}
                                            onValueChange={onChange}
                                        />
                                    </TouchableOpacity>
                                    {errors.checked && (
                                        <Text className={`${styles.red}`}>
                                            Required
                                        </Text>
                                    )}
                                </View>
                            )}
                            name="checked"
                        />
                        <View className="pb-5">
                            <FormSignature
                                control={control}
                                getValues={getValues}
                                errors={errors}
                            />
                        </View>
                        <View className="pb-5">
                            <FormBarcodeScanner control={control} />
                        </View>
                        <View className="pb-5">
                            <FormDateTimePicker control={control} />
                        </View>

                        <Controller
                            control={control}
                            rules={{ maxLength: 20, minLength: 3 }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <View className="pb-5">
                                    <Text className="font-bold text-xl">
                                        Radio Buttons
                                    </Text>
                                    <RadioButton.Group
                                        onValueChange={(value) =>
                                            onChange(value)
                                        }
                                        value={value}
                                    >
                                        <View>
                                            <RadioButton.Item
                                                value="One"
                                                status={
                                                    value === 'One'
                                                        ? 'checked'
                                                        : 'unchecked'
                                                }
                                                color="red"
                                                label="One"
                                            />
                                        </View>
                                        <RadioButton.Item
                                            value="Two"
                                            status={
                                                value === 'Two'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            color="blue"
                                            label="Two"
                                        />
                                        <RadioButton.Item
                                            value="Three"
                                            status={
                                                value === 'Three'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            color="green"
                                            label="Three"
                                        />
                                    </RadioButton.Group>
                                </View>
                            )}
                            name="radio"
                        />

                        <View className="pb-5">
                            <FormMultiSelect control={control} />
                        </View>

                        <Button
                            title="Submit"
                            color="#1bc900"
                            onPress={handleSubmit(onSubmit, onError)}
                        />
                    </Spacer>
                </FormProvider>
            </ScrollView>

            {/* BOTTOM SHEET FOR IMAGE SELECT */}
            {sheetOpen && (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enableHandlePanningGesture={false}
                    backdropComponent={backdropComponent}
                >
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                childImageRef.current.imageSelect('camera')
                            }
                        >
                            <Text className="text-lg pb-4 px-1">
                                Take Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                childImageRef.current.imageSelect('gallery')
                            }
                        >
                            <Text className="text-lg pb-4 px-1">
                                Select Image
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sheetHandle}>
                            <Text className="text-lg px-1">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            )}
        </View>
    );
};

const styles = {
    red: 'text-red-600',
};

export default TestFormScreen;
