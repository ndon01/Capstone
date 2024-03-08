import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList } from 'react-native-gesture-handler';
import PageLayoutComponent from 'components/PageLayoutComponent';


export default function NutritionTrackingScreen() {
    const SafeAreaInsets = useSafeAreaInsets();

    return (
        <PageLayoutComponent title='Activity'>

            {/* Content */}
            <ScrollView style={{ flex: 1, padding: 10 }}>

                <View>
                    <Text>Activity Name</Text>

                    <Text>Activity Time</Text>

                    <Text>Activity Date</Text>

                    <Text>Activity Contents</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#113950',
                            borderRadius: 10,
                            minHeight: 44,
                            justifyContent: 'center',
                            alignItems: 'center',

                            padding: 10,
                            maxWidth: 150,
                        }}
                        onPress={() => {
                            router.dismiss()
                            router.push("/activity/find")
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                            Add Activity  
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={{
                paddingVertical: Platform.OS === "ios" ? 0 : 10,
                paddingHorizontal: 10,
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor:'#113950',
                        borderRadius: 10,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        router.dismiss()
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

