import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList } from 'react-native-gesture-handler';
import PageLayoutComponent from 'components/PageLayoutComponent';


export default function SelectTrackingOptionPage() {
    const SafeAreaInsets = useSafeAreaInsets();

    const [selectedCategory, setSelectedCategory] = React.useState<number>(-1);

    const { category } = useLocalSearchParams();

    React.useEffect(() => {
        if (category) {
            setSelectedCategory(parseInt(category.toString()));
        }
    }, [category]);

    const handleContinuePress = () => {
        if (selectedCategory === -1) {
            return;
        }

        let route = '';

        switch (selectedCategory) {
            case 0:
                route = "/track/nutrition";
                break;
            case 1:
                route = "/track/activity";
                break;
            default:
                break;
        }

        router.push({
            pathname: route,
        });
    }

    return (
        <PageLayoutComponent title="Tracking">

            {/* Content */}
            <View style={{ flex: 1 }}>


                <Text style={{
                    fontSize: 24,
                    fontWeight: '500',
                    textAlign: 'center',
                    padding: 20,
                }}>
                    Select a Category
                </Text>



                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    gap: 10,
                }}>


                    {
                        ["Nutrition", "Activity"].map((category, index) => {
                            return (
                                <TouchableOpacity
                                    key={category + index}

                                    onPress={() => {
                                        if (selectedCategory === index) {
                                            setSelectedCategory(-1);
                                        } else {
                                            setSelectedCategory(index)
                                        }
                                    }}

                                    style={[{
                                        minHeight: 44,

                                        backgroundColor: selectedCategory === index ? '#113950' : 'rgb(240, 240, 240)',
                                        borderRadius: 10,

                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                        shadowColor: "#000",

                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },

                                        shadowOpacity: selectedCategory === index ? 0.40 : 0,
                                        shadowRadius: 2.22,
                                    }]}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: selectedCategory === index ? 'bold' : 'normal',
                                        color: selectedCategory === index ? 'white' : 'black',
                                    }}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })

                    }






                </View>

                {/* Continue Button stuck to the bottom */}

            </View>

            <View style={{
                paddingVertical: Platform.OS === "ios" ? 0 : 10,
                paddingHorizontal: 10,
            }}>
                <TouchableOpacity
                    style={[{
                        backgroundColor: selectedCategory === -1 ? 'rgb(200, 200, 200)' : '#113950',
                        borderRadius: 10,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}
                    onPress={handleContinuePress}
                    disabled={selectedCategory === -1}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>
                        {selectedCategory === -1 ? "Please select a Category" : "Continue"}
                    </Text>
                </TouchableOpacity>
            </View>

        </PageLayoutComponent>
    );
}

