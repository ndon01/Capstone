import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "components/BasicButton/BasicButton";
import Divider from "components/Divider/Divider";

export default function LandingScreen() {
  const handleClickLogin = () => {
    console.log("Login button clicked");
    router.navigate({
      pathname: "/sign-in",
    })
  };

  const navigation = useNavigation();

  const handleClickRegister = () => {
    console.log("Register button clicked");
    router.navigate({
      pathname: "/sign-up",
    })
  };

  useEffect(() => {

    console.log("Landing screen mounted")

    router.setParams


    return () => {
      console.log("Landing screen unmounted")
    }
  })

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <View style={styles.ContentContainer}>
          <Text>Welcome to WellWeb!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={handleClickLogin}
          >
            <Text style={styles.buttonBlueText}>
              Sign in to an Existing Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonHollow}
            onPress={handleClickRegister}
          >
            <Text style={styles.buttonHollowText}>Register a New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    
  );
}

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

  buttonContainer: {
    flexDirection: "column",
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
  },
});