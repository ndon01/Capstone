import { useNavigation, useTheme } from "@react-navigation/native";
import { CustomButtonComponent } from "components/CustomButtonComponent";
import WellWebComponent from "components/WellWebComponent";
import React, { useContext, useRef, useState } from "react";
import {
    View,
    Button,
    StyleSheet,
    Image,
    Text,
    Pressable,
    TouchableOpacity,
    SafeAreaView,
    Animated,
} from "react-native";
import { Platform } from "react-native";
import { ThemeContext } from "src/contexts/ThemeContext";


const LandingScreen = ({ navigation }) => {
    const theme = useContext(ThemeContext);



    const spinValue = useRef(new Animated.Value(0)).current;
    const [isSpinning, setIsSpinning] = useState(false);

    const startSpinAnimation = () => {
        setIsSpinning(true);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            resetSpinAnimation();
        });
    };

    const resetSpinAnimation = () => {
        Animated.timing(spinValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {
            setIsSpinning(false);

        });
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: theme.theme === 'light' ? "#FEFDFB" : "#07293D",
                    paddingBottom: Platform.OS === "android" ? 25 : 0,
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Pressable onTouchEnd={() => {
                                theme.toggleTheme()
                                startSpinAnimation();
                            }} style={{width: 'max-content', height: 'max-content',}}>
                            <Animated.Image
                                source={require("assets/images/LogoNoBackground.png")}
                                style={{
                                    width: 300,
                                    height: 300,
                                    shadowOpacity: 1,
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowColor: theme.theme === "light" ? "#07293D" : "#ADCDC9",
                                    transform: [{ rotateY: isSpinning ? spin : "0deg" }],
                                }}
                            />
                            </Pressable>
                        </View>
                        <View
                            style={{
                                position: "relative",
                                top: -25,
                                overflow: "visible",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Inter_600SemiBold",
                                    fontSize: 48,
                                    letterSpacing: 10,
                                    color: theme.theme === "light" ? "#07293D": "#FEFDFB",
             

                                    textShadowColor: theme.theme === "light" ? "#07293D" : "#FEFDFB",
                                    textShadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    textShadowRadius: 10,
                                    overflow: "visible",

                                }}
                            >
                                Well
                                <Text
                                    style={{
                                        color: theme.theme === "light" ? "#FEFDFB": "#07293D",
                                        overflow: "visible",

                                    }}
                                >
                                   Web
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 20,
                            width: "100%",
                            justifyContent: "space-between",
                            height: 100,
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <CustomButtonComponent
                                title="Sign in to an Existing Account"
                                onTouchEnd={() => {
                                    navigation.navigate("LoginScreen");
                                }}
                            />
                        </View>
                        <CustomButtonComponent
                            title="Register an Account"
                            flipped={true}
                            onTouchEnd={() => {
                                navigation.navigate("RegistrationScreen");
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default LandingScreen;
