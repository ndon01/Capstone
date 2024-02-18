import { router } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicButton from "src/components/BasicButton/BasicButton";
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

  buttonContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "android" ? 20 : 0,

    gap: 10,
  },

  button: {
    borderRadius: 10,
    minHeight: 44,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D81E7",
  },
  

});

export default function LandingScreen() {

  const handleClickLogin = () => {
    router.navigate("/auth/login/");
  }

  const handleClickRegister = () => {
    router.navigate("/auth/register/");
  }

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <View style={styles.ContentContainer}>
          <Text>Welcome to WellWeb!</Text>
        </View>

        <Divider />

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.button} onPress={handleClickLogin}>
              <Text style={{ color : "white"}}>Sign in to an Existing Account</Text>
          </TouchableOpacity>
          <BasicButton title="Register an Account" onPress={handleClickRegister} />

        </View>
      </View>
    </SafeAreaView>
  );
}
