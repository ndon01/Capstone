import { router, useNavigation, useNavigationContainerRef, useRootNavigationState, useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "components/BasicButton/BasicButton";
import BasicSelectable from "components/BasicSelectable/BasicSelectable";
import Divider from "components/Divider/Divider";
import * as SecureStore from 'expo-secure-store';
import { useAPIClient } from "contexts/APIClient";
import useConfig from "contexts/Config";

const styles = StyleSheet.create({
    screenContainer: {
        width: "100%",
        height: "100%",
    },

    ContentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    TitleContainer: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    TitleText: {
        fontSize: 20,
        fontWeight: "bold",
    },

    buttonContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: Platform.OS === "android" ? 20 : 0,
    
        gap: 10,
      },

      buttonBlue: {
        borderRadius: 10,
        minHeight: 44,
        minWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3D81E7",
    },

    buttonBlueText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    buttonHollow: {
        borderRadius: 10,
        minHeight: 44,
        minWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#000000",
    },

    buttonHollowText: {
        color: "#000000",
        fontWeight: "bold",
    }
});


export default function LoginScreen() {

    const APIClient = useAPIClient();
    const Config = useConfig();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        console.log("Logging in with username", username, "and password", password);
        console.log("POST", `http://${Config.apiBaseUrl}:8080/api/auth/login`);
        fetch(`http://${Config.apiBaseUrl}:8080/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((response) => {
            if (response.status === 200) {
                console.log("Login successful");
                return response.json();
            } else {
                console.log("Login failed");
                throw new Error("Login failed");
            }
        }).then((data) => {
            console.log("Data", data);

                APIClient.login(data.token);
                // 1 way to clear the navigation stack until they implement a better way
                while(router.canGoBack()) {
                    router.back();
                }
                router.replace("/home");
            
        }).catch((error) => {
            console.error("Error", error);
            alert("Login failed");
        });
    }

    const handleBack = () => {
        if (router.canGoBack()) {
            console.log("Going back");
            router.back();
        } else {
            console.log("Can't go back, navigating to /");
            router.replace("/landing");
        }

    }

    return (
        <SafeAreaView>
            <View style={styles.screenContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>Login</Text>
                </View>
                <View style={styles.ContentContainer}>

                    <Divider width={1}/>
                    <View style={{
                        flex: 1,
                        width: "100%",
                    }}>
                    
                    <TextInput style={{
                        minHeight: 44,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                    }} placeholder="Username" value={username} onChangeText={(text) => { setUsername(text); }}/>
                    
                    <Divider width={1}/>

                    <TextInput style={{
                        minHeight: 44,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                    }} placeholder="Password" value={password} secureTextEntry={true} onChangeText={(text) => { setPassword(text); }}/>
                    
                    <Divider width={1}/>



                    </View>
                </View>
                
                {/* Bottom of Screen */}
                <View style={styles.buttonContainer}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.buttonHollow} onPress={handleBack}>
                            <Text style={styles.buttonHollowText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.buttonBlue} onPress={handleLogin}>
                            <Text style={styles.buttonBlueText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}