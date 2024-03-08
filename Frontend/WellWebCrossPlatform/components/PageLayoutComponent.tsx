import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Divider from 'components/Divider/Divider';
import BasicButton from 'components/BasicButton/BasicButton';
import BasicSelectable from 'components/BasicSelectable/BasicSelectable';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default function PageLayoutComponent({ children, title}: React.PropsWithChildren<{
    title: string;
}>) {
    const SafeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: SafeAreaInsets.bottom }]}>
            <View style={[styles.header, {paddingTop: SafeAreaInsets.top,}]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        router.back();
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.placeholderView}></View>
            </View>

            {/* Content */}

            {children}

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

        backgroundColor: "#65ccc1"
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
        color: 'white',
    },
    placeholderView: {
        width: 30,
    },

    mainContentContainer: {
        flex: 1,
    }

});
