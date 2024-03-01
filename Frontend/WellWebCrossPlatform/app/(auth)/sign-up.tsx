import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "components/BasicButton/BasicButton";
import BasicSelectable from "components/BasicSelectable/BasicSelectable";
import Divider from "components/Divider/Divider";

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


export default function RegistrationScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const api_url = Platform.OS === "web" ? "localhost" : process.env.EXPO_PUBLIC_API_URL;

    const handleReigster = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        console.log(`POST http://${api_url}:8080/api/auth/register`);
        fetch(`http://${api_url}:8080/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(data => data.json()).then(data => {
            console.log(data);
            if (data.error) {
                alert(data.error);
            } else {
                router.navigate("/");
            }
        }).catch(err => {
            alert(err);
        });
    }
    const handleBack = () => {
        if (router.canGoBack()) {
            console.log("Going back");
            router.back();
        } else {
            console.log("Can't go back, navigating to /");
            router.navigate("/landing");
        }

    }

    return (
        <SafeAreaView>
            <View style={styles.screenContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>Registration</Text>
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
                    }} placeholder="Username" value={username} 
                    onChangeText={(text) => { setUsername(text); }}/>
                    
                    <Divider width={1}/>

                    <TextInput style={{
                        minHeight: 44,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                    }} 
                    placeholder="Password" 
                    value={password} 
                    secureTextEntry={true}
                    onChangeText={(text) => { setPassword(text); }}
                    />
                    
                    <Divider width={1}/>
                    <TextInput style={{
                        minHeight: 44,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                    }} 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    secureTextEntry={true}
                    onChangeText={(text) => { setConfirmPassword(text); }}
                    />
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
                        <TouchableOpacity style={styles.buttonBlue} onPress={handleReigster}>
                            <Text style={styles.buttonBlueText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}