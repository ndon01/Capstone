import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "src/components/BasicButton/BasicButton";
import BasicSelectable from "src/components/BasicSelectable/BasicSelectable";
import Divider from "src/components/Divider/Divider";

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

});


export default function RegistrationScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <SafeAreaView>
            <View style={styles.screenContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleText}>Registration</Text>
                </View>
                <View style={styles.ContentContainer}>

                    <Divider />
                    <View style={{
                        flex: 1,
                        width: "100%",
                    }}>
                    
                    <TextInput style={{
                        minHeight: 44,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                    }} placeholder="Username" value={username} onChangeText={(text) => { setUsername(text); }}/>
                    
                    <Divider />

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
                    
                    <Divider />
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
                    <Divider />



                    </View>
                    <Divider />
                </View>
                
                {/* Bottom of Screen */}
                <View style={styles.buttonContainer}>
                    <View style={{ flex: 1 }}>
                        <BasicButton title="Back" onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            }
                        }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{
                            borderRadius: 10,

                            minHeight: 44,
                            minWidth: "100%",
                            justifyContent: "center",
                            alignItems: "center",

                            backgroundColor: "#3D81E7",
                        }} onPress={() => { }}>
                            <Text style={{
                                color: "#FFFFFF",
                            }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}