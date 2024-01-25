import { CustomButtonComponent } from "components/CustomButtonComponent";
import React, { useContext, useState } from "react";
import { View, Button, Platform, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "src/contexts/ThemeContext";

import { CustomInput } from "components/CustomDateInput";
import { CustomTextInput } from "components/CustomTextInput";

const LoginScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  // Input States
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Other States
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  // Handlers
  
  const handleIdentifierChange = (text) => {
    setIdentifier(text);
    if (identifier.length >= 1 && password.length >= 1) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (identifier.length >= 1 && password.length >= 1) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };


  
  const handleLogin = () => {
    if (identifier.length >= 1 && password.length >= 1) {
      alert("Username: " + identifier + "\nPassword: " + password)
    } else {
      setIsLoginDisabled(true);
    }

  };



  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: theme.theme === "light" ? "#FEFDFB" : "#07293D",
        paddingBottom: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: theme.theme === "light" ? "#000000" : "#FFFFFF",
              fontSize: 24,
              fontFamily: "Inter-SemiBold",
            }}
          >
            Authentication
          </Text>
        </View>
        <View>
          <View>
            {/* Username */}
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 200,
                  marginBottom: 10,
                  fontFamily: "Inter-ExtraLight",
                }}
              >
                Username or Email Address
              </Text>

              <CustomTextInput
                defaultValue={"Username / Email Address"}
                value={identifier}
                onChangeText={handleIdentifierChange}
          
              />

            </View>
            {/* Password */}
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 200,
                  marginBottom: 10,
                  fontFamily: "Inter-ExtraLight",
                }}
              >
                Password
              </Text>
              <CustomTextInput
                defaultValue={"Password"}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "48%",
          }}
        >
          <CustomButtonComponent
            title="Back"
            onTouchEnd={() => {
              navigation.goBack();
            }}
            flipped
          />
        </View>
        <View
          style={{
            width: "48%",
          }}
        >
          <CustomButtonComponent title="Login" onTouchEnd={handleLogin} disabled={isLoginDisabled} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
