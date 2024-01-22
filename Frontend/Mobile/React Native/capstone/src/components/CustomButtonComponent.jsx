import { useNavigation, useTheme } from "@react-navigation/native";
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


const CustomButtonComponent = ({ title, flipped = false, onTouchEnd, disabled = false}) => {
    const theme = useContext(ThemeContext);


    if (flipped) {
        return (
            <View
                style={{
                    width: "100%",
                    height: 50,

                    paddingVertical: 10,
                    backgroundColor: theme.theme === "light" ? "#FEFDFB" : "#07293D",
                    borderColor: theme.theme === "light" ? "#07293D" : "#ADCDC9",
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: theme.theme === "light" ? "#07293D" : "#ADCDC9",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.5,
                }}
            >
        
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={onTouchEnd}
                    >
                        <Text
                            style={{
                                color: theme.theme === "light" ? "#07293D" : "#ADCDC9",
                                fontSize: 18,
                                fontFamily: "Inter_500Medium",
                            }}
                        >
                            {title}
                        </Text>
                    </TouchableOpacity>
            </View>
        );
    }

    return (
        <View
            style={{
                width: "100%",
                height: 50,
                paddingVertical: 10,
                backgroundColor: disabled ? "gray" : theme.theme === "light" ? "#07293D" : "#ADCDC9",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: theme.theme === "light" ? "#07293D" : "#ADCDC9",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.5,
            }}
        >
            <TouchableOpacity
                onPress={onTouchEnd}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                disabled={disabled}
            >
        
                    <Text
                        style={{
                            color: theme.theme === "light" ? "white" : "black",
                            fontSize: 18,
                            fontFamily: "Inter_500Medium",
                        }}
                    >
                        {title}
                    </Text>
            </TouchableOpacity>
        </View>
    );
};

export { CustomButtonComponent } ;
