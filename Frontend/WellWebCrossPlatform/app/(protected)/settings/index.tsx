import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Divider from 'components/Divider/Divider';

export default function SettingsPage() {
    const SafeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: SafeAreaInsets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.navigate('/more')
                        }
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.placeholderView}></View>
            </View>
            <ScrollView style={{
                flex: 1
            }}>
                <Divider width={1} />
                <TouchableOpacity
                    onPress={() => {
                        console.log('Navigating to settings');
                        router.navigate('/settings');
                    }}
                    style={styles.settingsButton}
                >
                    <Text>Account</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <Divider width={1} />


            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(200, 200, 200)',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 44,
        minHeight: 44,

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    placeholderView: {
        width: 30,
    },

    settingsButton: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(200, 200, 200)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 44,
        backgroundColor: 'white',
        width: '100%',
    },
});
