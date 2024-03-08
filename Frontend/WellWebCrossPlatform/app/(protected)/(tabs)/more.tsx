import React from 'react';
import { Alert, Button, Text, View, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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

        if (Platform.OS === 'web') {
            var answer = confirm('Are you sure you want to logout?');

            if (answer) {
                // Call your logout function here
                APIClient.logout();
                if (router.canDismiss()) {
                    router.dismissAll();
                }
                router.replace('/');
            }

            return;
        }


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
                        if (router.canDismiss()) {
                            router.dismissAll();
                        }
                        router.replace('/');
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
                        router.push('/settings');
                    }}
                    style={styles.settingsButton}
                >
                    <Text>Settings</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <Divider width={1} />
            </ScrollView>

            
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            
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
        backgroundColor: 'rgb(250, 50, 50)',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
