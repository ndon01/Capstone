import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
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
import { router, useFocusEffect, useNavigation, useNavigationContainerRef } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default function MoreScreen() {
    const APIClient = useAPIClient();

    const SafeAreaInsets = useSafeAreaInsets();

    const [selectedIndex, setSelectedIndex] = useState(0);


    const rightPosition = useRef(new Animated.Value(-200)).current;

    const slideInFromRight = () => {
        rightPosition.setValue(-200);
        Animated.timing(rightPosition, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const slideOutToRight = () => {
        rightPosition.setValue(0);
        Animated.timing(rightPosition, {
            toValue: -200,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }


    useFocusEffect(useCallback(() => {
        console.log('MoreScreen focused');
        slideInFromRight();

        return () => {
            slideOutToRight();
        };
    }, []))



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

                    <TouchableOpacity style={{
                        minWidth: 44,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <AntDesign name="leftcircle" size={24} color="#113950" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: "#113950"
                        }}>3/1/2024</Text>
                        <Entypo name="calendar" size={24} color="#113950" />

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        minWidth: 44,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <AntDesign name="rightcircle" size={24} color="#113950" />
                    </TouchableOpacity>

                </View>
                <SegmentedControl
                    values={['All', 'Nutrition', 'Activity', 'Other']}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}

                    tintColor='white'
                    activeFontStyle={{
                        color: '#113950',
                    }}
                    backgroundColor='#113950'
                />
            </View>

            <View style={{
                flex: 1,
            }}>

            </View>


            <Animated.View style={{
                position: "absolute",
                bottom: 0,
                right: rightPosition,
                backgroundColor: '#65ccc1',
                padding: 10,
                borderTopLeftRadius: 20,
            }}>
                {/* Add */}
                <TouchableOpacity style={{

                    backgroundColor: "white",
                    borderRadius: 100,
                    minWidth: 44,
                    minHeight: 44,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                    onPress={() => {
                        console.log(selectedIndex);
                        router.push({
                            pathname: "/track",
                            params: {
                                category: selectedIndex === 1 ? "0" : selectedIndex === 2 ? "1" : -1
                            }
                        });
                    }}
                >

                    <Entypo name="plus" size={24} color="#113950" />
                </TouchableOpacity>
            </Animated.View>
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