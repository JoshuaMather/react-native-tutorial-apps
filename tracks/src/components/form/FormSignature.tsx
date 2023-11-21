import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
    View,
    Text,
    TextInput,
    Modal,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import { Icon } from '@rneui/themed';
import Styles from '../../../customStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FormSignature = ({ control, getValues, errors }) => {
    const sigRef = useRef<SignatureViewRef>();
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(null);
    const insets = useSafeAreaInsets();

    const showSignatureModal = () => {
        setError(null);
        setIsVisible(true);
    };

    const onModalClose = () => {
        setIsVisible(false);
    };

    return (
        <Controller
            control={control}
            // rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <Text className="font-bold text-xl pb-2">
                        Signature
                        <Text className={`${Styles.red} font-extrabold`}>
                            *
                        </Text>
                    </Text>
                    {getValues('signature') && (
                        <Image
                            className="h-48 w-full"
                            source={{ uri: getValues('signature') }}
                        />
                    )}
                    <Button
                        title={'Sign'}
                        type="clear"
                        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                        onPress={showSignatureModal}
                    />
                    {errors.signature && (
                        <Text className={`${Styles.red}`}>
                            {errors.signature.message}
                        </Text>
                    )}
                    <Modal
                        animationType="slide"
                        visible={isVisible}
                        onDismiss={onModalClose}
                    >
                        <View
                            className="flex-1"
                            style={{
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right,
                            }}
                        >
                            <View className="h-12 bg-slate-300 items-center flex-row justify-between">
                                <Text className="text-2xl font-bold pl-2">
                                    Signature
                                    <Text
                                        className={`${Styles.red} font-extrabold`}
                                    >
                                        *
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={onModalClose}
                                    className="pr-2"
                                >
                                    <Icon name="close" size={30} />
                                </TouchableOpacity>
                            </View>
                            <Signature
                                androidHardwareAccelerationDisabled={true}
                                ref={sigRef}
                                webStyle={style}
                                onEmpty={() => {
                                    // setError('Signature must not be empty')
                                    onChange(undefined);
                                    onModalClose();
                                }}
                                onOK={(sig) => {
                                    onChange(sig);
                                    onModalClose();
                                }}
                                dataURL={value}
                            />
                            {error && <Text>{error}</Text>}
                        </View>
                    </Modal>
                </View>
            )}
            name="signature"
        />
    );
};

const style = 'body { opacity: 0.99; }';

export default FormSignature;
