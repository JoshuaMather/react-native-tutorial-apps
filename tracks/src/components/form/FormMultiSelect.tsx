import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';

const FormMultiSelect = ({ control }) => {
    const [isVisible, setIsVisible] = useState(false);
    let multiSelect;

    const items = [
        {
            id: 'apple',
            name: 'Apple',
        },
        {
            id: 'banana',
            name: 'Banana',
        },
        {
            id: 'orange',
            name: 'Orange',
        },
        {
            id: 'grapes',
            name: 'Grapes',
        },
        {
            id: 'strawberry',
            name: 'Strawberry',
        },
        {
            id: 'plum',
            name: 'Plum',
        },
        {
            id: 'kiwi',
            name: 'Kiwi',
        },
        {
            id: 'dragonfruit',
            name: 'Dragonfruit',
        },
        {
            id: 'lychee',
            name: 'Lychee',
        },
        {
            id: 'pear',
            name: 'Pear',
        },
    ];

    const showModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    return (
        <Controller
            control={control}
            defaultValue={[]}
            // rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <Text className="font-bold text-xl pb-2">Multi Select</Text>
                    <View>
                        {value.map((fruit) => {
                            return (
                                <Text
                                    className="text-lg text-gray-600 pl-3 pb-2"
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {fruit}
                                </Text>
                            );
                        })}
                    </View>
                    <Button
                        title={'Select'}
                        type="clear"
                        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                        onPress={showModal}
                    />
                    <Modal
                        animationType="slide"
                        visible={isVisible}
                        onDismiss={closeModal}
                    >
                        <View className="flex-1">
                            <View className="h-12 bg-slate-300 items-center flex-row justify-between">
                                <Text className="font-bold text-xl pl-2">
                                    Multi Select
                                </Text>
                                <TouchableOpacity
                                    onPress={closeModal}
                                    className="pr-2"
                                >
                                    <Icon name="close" size={30} />
                                </TouchableOpacity>
                            </View>
                            <MultiSelect
                                items={items}
                                uniqueKey="id"
                                ref={(component) => {
                                    multiSelect = component;
                                    if (multiSelect) {
                                        multiSelect._submitSelection = () => {
                                            setIsVisible(false);
                                            multiSelect._toggleSelector();
                                            // reset searchTerm
                                            multiSelect._clearSearchTerm();
                                        };
                                    }
                                }}
                                onSelectedItemsChange={onChange}
                                selectedItems={value}
                                selectText=" Choose Fruit"
                                searchInputPlaceholderText="Search Fruit..."
                                fontSize={16}
                                itemFontSize={20}
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#3211d6"
                                selectedItemIconColor="#3211d6"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#CCC' }}
                                submitButtonColor="#11d66a"
                                submitButtonText="Submit"
                                single={false}
                            />
                        </View>
                    </Modal>
                </View>
            )}
            name="multiSelect"
        />
    );
};

export default FormMultiSelect;
