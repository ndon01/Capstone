import React from 'react';
import { Alert, Button, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAPIClient } from 'contexts/APIClient';
import { router, useNavigation, useNavigationContainerRef } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Divider from 'components/Divider/Divider';
import { AntDesign } from '@expo/vector-icons';

export default function MoreScreen() {
    const APIClient = useAPIClient();
    const SafeAreaInsets = useSafeAreaInsets();
    const nav = useNavigationContainerRef();
    const handleLogout = () => {
        console.log('Can go back?', nav.canGoBack());

        Alert.alert(
            '',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed');
                    },
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Call your logout function here
                        APIClient.logout();

                        // 1 way to clear the navigation stack until they implement a better way
                        while (router.canGoBack()) {
                            router.back();
                        }
                        router.navigate('/landing');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={[styles.container, { paddingTop: SafeAreaInsets.top }]}>
            <ScrollView style={styles.scrollView}>
                <Divider width={1} />
                <TouchableOpacity
                    onPress={() => {
                        console.log('Navigating to settings');
                        router.navigate('/settings');
                    }}
                    style={styles.settingsButton}
                >
                    <Text>Settings</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <Divider width={1} />
            </ScrollView>

            <View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
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
    logoutButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 44,
        backgroundColor: 'rgb(61, 129, 231)',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
