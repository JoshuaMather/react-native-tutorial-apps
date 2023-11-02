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
import FormDocumentPicker from '../components/form/FormDocumentPicker';
import { DocumentPickerResult } from 'expo-document-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    // document: {
    //     assets: {
    //         mimeType: string;
    //         name: string;
    //         size: number;
    //         uri: string;
    //     };
    //     canceled: boolean;
    // };
    document: DocumentPickerResult;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = Yup.object().shape({
    test: Yup.string().label('test').trim().min(3).max(20),
    requiredTest: Yup.string()
        .label('requiredTest')
        .trim()
        .required('Required'),
    imageUrl: Yup.string().label('imageUrl').nullable(),
    colour: Yup.string()
        .label('colour')
        .trim()
        .oneOf(['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange']),
    checked: Yup.boolean().label('checked').required('Required'),
    signature: Yup.string().label('signature'),
    barcode: Yup.object().shape({
        type: Yup.string().label('type'),
        data: Yup.string().label('data'),
    }),
    date: Yup.date().label('date').min(today, 'Date cannot be in the past'),
    time: Yup.date()
        .label('time')
        .min(new Date(), 'Time cannot be in the past'),
    radio: Yup.string()
        .label('radio')
        .trim()
        .oneOf(['One', 'Two', 'Three'], 'Must be one of: One, Two, Three'),
    multiSelect: Yup.array().of(Yup.string()).label('multiSelect'),
    document: Yup.mixed<DocumentPickerResult>().test(
        'type',
        'Invalid type for document result',
        (value) => isDocumentPickerResult(value)
    ),
    // document: Yup.object().shape({
    //     assets: Yup.array().of(
    //         Yup.object({
    //             mimeType: Yup.string(),
    //             name: Yup.string(),
    //             size: Yup.number(),
    //             uri: Yup.string(),
    //         })
    //     ),
    //     canceled: Yup.boolean(),
    // }),
});

const isDocumentPickerResult = (val: any): val is DocumentPickerResult => {
    if (Object.keys(val).length == 0) {
        return true;
    }
    return (
        val.assets &&
        typeof val?.assets[0] === 'object' &&
        (val.canceled === false || val.canceled === true)
    );
};

const useYupValidationResolver = (validationSchema) =>
    useCallback(
        async (data) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors, currentError) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? 'validation',
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );

const TestFormScreen = () => {
    const resolver = useYupValidationResolver(schema);
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        formState: { errors, isLoading },
    } = useForm<Fields>({ resolver });

    const onSubmit: SubmitHandler<Fields> = async (data: Fields) => {
        console.log('data', data);
        if (data.imageUrl) {
            const fileBase64 = await FileSystem.readAsStringAsync(
                data.imageUrl,
                {
                    encoding: 'base64',
                }
            );
            // console.log('base64', fileBase64);
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
                                            {errors.test.message}
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
                                            {errors.requiredTest.message}
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
                                errors={errors}
                            />
                        </View>
                        <View className="pb-5">
                            <FormPicker control={control} errors={errors} />
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
                                            {errors.checked.message}
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
                            <FormBarcodeScanner
                                control={control}
                                errors={errors}
                            />
                        </View>
                        <View className="pb-5">
                            <FormDateTimePicker
                                control={control}
                                errors={errors}
                            />
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
                                    {errors.radio && (
                                        <Text className={`${styles.red}`}>
                                            {errors.radio.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                            name="radio"
                        />

                        <View className="pb-5">
                            <FormMultiSelect
                                control={control}
                                errors={errors}
                            />
                        </View>

                        <View className="pb-5">
                            <FormDocumentPicker
                                control={control}
                                setValue={setValue}
                                errors={errors}
                            />
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
