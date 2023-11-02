import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Controller } from 'react-hook-form';

const FormImage = (
    { toggleSheet, control, watch, setImageUrlValue, errors },
    ref
) => {
    const [image, setImage] = useState<string>(null);
    // const { register, setValue } = useFormContext();
    // const { setValue } = useForm();

    useEffect(() => {
        console.log('image', image);
        setImageUrlValue(image);
    }, [image]);

    const imageChoice = () => {
        toggleSheet();
    };

    useImperativeHandle(ref, () => ({
        imageSelect: (type) => {
            imageSelect(type);
        },
    }));

    const imageSelect = async (type) => {
        let result;
        if (type == 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        toggleSheet();
    };

    return (
        <View>
            <Text className="font-bold text-xl">Image</Text>
            <View className="flex-row justify-around pt-3 pb-3">
                <TouchableOpacity
                    onPress={imageChoice}
                    className="bg-green-300 h-8 w-28 justify-center"
                >
                    <Text className="text-center">Select</Text>
                </TouchableOpacity>
                {image && (
                    <TouchableOpacity
                        onPress={() => setImage(null)}
                        className="bg-red-300 h-8 w-28 justify-center"
                    >
                        <Text className="text-center">Remove</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View className="justify-center flex-row">
                {image && (
                    <Image
                        source={image}
                        contentFit="cover"
                        transition={1000}
                        style={{ width: 300, height: 400 }}
                    />
                )}
            </View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            className="h-0 w-0"
                            autoFocus={true}
                            multiline
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                        {errors.imageUrl && (
                            <Text className={`${styles.red}`}>
                                {errors.imageUrl.message}
                            </Text>
                        )}
                    </View>
                )}
                name="imageUrl"
            />
        </View>
    );
};

export default forwardRef(FormImage);

const styles = {
    red: 'text-red-600',
};
