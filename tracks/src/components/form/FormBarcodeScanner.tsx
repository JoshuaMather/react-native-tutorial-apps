import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Controller } from 'react-hook-form';

const FormBarcodeScanner = ({ control, errors }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scannerOpen, setScannerOpen] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScannerOpen(false);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <Text className="font-bold text-xl">Barcode</Text>
                    {value && (
                        <>
                            <Text className="text-center text-xl">
                                Type: {value.type}
                            </Text>
                            <Text className="text-center pb-3 text-xl">
                                Value: {value.data}
                            </Text>
                        </>
                    )}
                    {scannerOpen ? (
                        <View>
                            <BarCodeScanner
                                onBarCodeScanned={(info) => {
                                    onChange({
                                        type: info.type,
                                        data: info.data,
                                    });
                                    handleBarCodeScanned(info);
                                }}
                                className="w-full h-48"
                            />
                            <View className="pt-3">
                                <Button
                                    title={'Cancel'}
                                    color="#cf0c02"
                                    onPress={() => setScannerOpen(false)}
                                />
                            </View>
                        </View>
                    ) : (
                        <Button
                            title={'Scan'}
                            onPress={() => setScannerOpen(true)}
                        />
                    )}
                    {errors['barcode.type'] && (
                        <Text className={`${styles.red}`}>
                            {errors['barcode.type'].message}
                        </Text>
                    )}
                    {errors['barcode.data'] && (
                        <Text className={`${styles.red}`}>
                            {errors['barcode.data'].message}
                        </Text>
                    )}
                </View>
            )}
            name="barcode"
        />
    );
};

export default FormBarcodeScanner;

const styles = {
    red: 'text-red-600',
};
