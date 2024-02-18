import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
        width: "100%",
        gap: 10,
    },

});

export default function RegistrationScreen() {

    const [selectedMethod, setSelectedMethod] = useState("")

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    }

    const handleNextClick = () => {
        if (selectedMethod === "") {
            return;
        }

        
    }

    return (
        <SafeAreaView>
            <View style={styles.screenContainer}>
                <View style={styles.ContentContainer}>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.TitleText}>Select a Method</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        width: "100%",
                    }}>

                        <Divider />

                        <BasicSelectable
                            title="Phone Number"
                            selected={selectedMethod === "phone"}
                            onPress={() => {
                                setSelectedMethod("phone");
                            }}
                        />


                        <Divider />


                        <BasicSelectable
                            title="Email Address"
                            selected={selectedMethod === "email"}
                            onPress={() => {
                                setSelectedMethod("email");
                            }}
                        />
                        <Divider />


                    </View>
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

                        backgroundColor: selectedMethod === "" ? "#CCCCCC" : "#3D81E7",
                    }} onPress={handleNextClick} disabled={selectedMethod === ""}>
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