import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import PageLayoutComponent from 'components/PageLayoutComponent';

export default function SettingsPage() {
    const SafeAreaInsets = useSafeAreaInsets();

    return (
        <PageLayoutComponent title='Settings'>
            <ScrollView style={{
                flex: 1
            }}>
                <Divider width={1} />
                <TouchableOpacity
                    onPress={() => {
                        console.log('Navigating to settings');
                        router.push('/settings');
                    }}
                    style={styles.settingsButton}
                >
                    <Text>Account</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <Divider width={1} />


            </ScrollView>

        </PageLayoutComponent>
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
