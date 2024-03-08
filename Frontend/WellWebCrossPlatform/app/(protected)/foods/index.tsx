import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import PageLayoutComponent from 'components/PageLayoutComponent';

export default function NutritionTrackingScreen() {
    const SafeAreaInsets = useSafeAreaInsets();

    return (
        <PageLayoutComponent title="Foods">

            {/* Content */}
            <View style={{ flex: 1 }}>

                    {/* Search Bar */}
                    <View style={{
                        minHeight: 44,
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                        <View style={{
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'black',
                        }}>
                            <TextInput
                                placeholder="Search for a food"
                                style={{
                                    padding: 10,
                                }} />
                        </View>
                    </View>
                    <ScrollView  style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        paddingHorizontal: 10,
                        maxHeight: 75,
                    }}
                        horizontal={true}
                    >

                        <Link
                            href={"/foods/create"}
                            asChild
                        >
                            <TouchableOpacity style={{
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'black',
                                padding: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",

                            }}>
                            <Ionicons name="add-circle-sharp" size={24} color="black" /> 
                            <Text>
                                Create Food
                            </Text>
                            </TouchableOpacity>
                        </Link>

                        

                    </ScrollView>
                    <View style={{
                        marginVertical: 10,
                        borderBottomWidth: .5,
                    }} />

            </View>

        </PageLayoutComponent>
    );
}
