import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useAPIClient } from 'contexts/APIClient';
import useConfig from 'contexts/Config';
import PageLayoutComponent from 'components/PageLayoutComponent';

export default function FoodCreationScreen() {
    const SafeAreaInsets = useSafeAreaInsets();

    const [brandName, setBrandName] = React.useState<string>('');

    const apiClient = useAPIClient();

    const config = useConfig();

    const handleCreateFood = () => {
        if (brandName.length === 0) {
            return;
        }
        console.log('Creating Food with Name: ', brandName);
        apiClient.post('/api/brands/create', {
            name: brandName,
            })
            .then((response) => {
                console.log('Response: ', response);
                if (response.status === 200) {
                    setBrandName('brand Created');
                    setTimeout(() => {
                        router.back();
                    }, 1500);
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    return (
        <PageLayoutComponent title='Create a Brand'>

            {/* Content */}
            <View style={{ flex: 1 }}>

                <ScrollView style={{
                    padding: 10,
                }}>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Brand Name</Text>

                        <TextInput
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                            }}
                            placeholder='Enter the Brand Name'
                            value={brandName}
                            onChangeText={(text) => {
                                setBrandName(text);
                            }}
                        />
                    </View>

                </ScrollView>

                <View style={{
                    paddingHorizontal: 10,
                    paddingVertical: Platform.OS === 'android' ? 15 : 0,
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: brandName.length === 0 ? '#CDCDCD' : '#113950',
                            borderRadius: 10,
                            minHeight: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                        }}
                        onPress={handleCreateFood}
                        disabled={brandName.length === 0}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                            Create Brand
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </PageLayoutComponent>
    );
}

