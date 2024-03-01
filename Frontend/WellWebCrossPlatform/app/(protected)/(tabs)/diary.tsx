import React, { RefObject, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    GestureResponderEvent,
    NativeMethods,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAPIClient } from 'contexts/APIClient';
import { router, useNavigation, useNavigationContainerRef } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function MoreScreen() {
    const APIClient = useAPIClient();

    const SafeAreaInsets = useSafeAreaInsets();

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <View style={[styles.container, { paddingTop: SafeAreaInsets.top }]}>
            
            <View style={styles.topBarArea}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    width: '100%',
                    paddingVertical: 10,
                }}>
                    <Text>{"<"}</Text>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>3/1/2024</Text>
                                        <Text>{">"}</Text>

                </View>
                <SegmentedControl
                    values={['All', 'Nutrition', 'Fitness', 'Other']}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
        
                    tintColor='black'
                    activeFontStyle={{
                        color: 'white',
                    }}
                    backgroundColor='white'
                />
            </View>

            <View style={{
                flex: 1,
            }}>
                
            </View>

            

            {/* Add */}
            <TouchableOpacity style={{
                position: "absolute",
                bottom: 15,
                right: 15,
                backgroundColor: "#3D81E7",
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
            }}
                onPress={() => {
                    router.navigate("/tracking")
                }}
            >

                <Text style={{
                    color: "white",
                    fontSize: 24,
                
                }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topBarArea: {
    
        paddingHorizontal: 16,
    

    },


});
