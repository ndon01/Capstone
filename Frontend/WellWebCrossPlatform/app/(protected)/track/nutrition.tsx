import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import PageLayoutComponent from 'components/PageLayoutComponent';


export default function NutritionTrackingScreen() {
    const SafeAreaInsets = useSafeAreaInsets();

    const [mealName, setMealName] = React.useState<string>('');
    const [mealDate, setMealDate] = React.useState<Date>(new Date());
    const [mealContents, setMealContents] = React.useState<string>('');

    return (
        <PageLayoutComponent title='Nutrition'>
            {/* Content */}
            <ScrollView style={{ flex: 1, padding: 10 }}>

                <View>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Meal Name</Text>

                        <TextInput
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                            }}
                            placeholder='Enter Meal Name'
                        />
                    </View>

                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Meal Contents</Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#113950',
                                borderRadius: 10,
                                minHeight: 44,
                                justifyContent: 'center',
                                alignItems: 'center',

                                padding: 10,
                                maxWidth: 150,
                                marginVertical: 10,
                            }}
                            onPress={() => {
                                router.push("/foods/")
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                                Add Food
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>

            <View style={{
                paddingVertical: Platform.OS === "ios" ? 0 : 10,
                paddingHorizontal: 10,
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#113950',
                        borderRadius: 10,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        router.push("/tracking/track")
                    }}

                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>
                        Track
                    </Text>
                </TouchableOpacity>
            </View>

        </PageLayoutComponent>

    );
}

