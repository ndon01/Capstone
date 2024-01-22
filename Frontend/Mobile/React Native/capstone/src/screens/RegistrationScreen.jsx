import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomButtonComponent } from "components/CustomButtonComponent";
import { CustomInput } from "components/CustomInput";
import { CustomTextInput } from "components/CustomTextInput";
import React, { useContext, useEffect, useState } from "react";
import { View, Button, Platform, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [password, setPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });
  const [passwordValidity, setPasswordValidity] = useState(false);
  const [showPasswordValidity, setShowPasswordValidity] = useState(false);
  const [showPasswordProcessing, setShowPasswordProcessing] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMatches, setConfirmPasswordMatches] = useState(false);
  const [showConfirmPasswordValidity, setShowConfirmPasswordValidity] =
    useState(false);
  const [showConfirmPasswordProcessing, setShowConfirmPasswordProcessing] =
    useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  // handlers

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handlePasswordChange = (text) => {
    // check if password meets requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(text);
    setPassword(text);
    setPasswordRequirements({
      length: text.length >= 8,
      uppercase: /[A-Z]/.test(text),
      lowercase: /[a-z]/.test(text),
      number: /\d/.test(text),
      specialCharacter: /[@$#!%*?&]/.test(text),
    });
  };

  const handlePasswordEditingEnd = () => {
    setShowPasswordProcessing(false);
    if (password === "") {
      setPasswordRequirements({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacter: false,
      });
      setShowPasswordValidity(false);
      return;
    }
    for (const [key, value] of Object.entries(passwordRequirements)) {
      if (!value) {
        setPasswordValidity(false);
        setShowPasswordValidity(true);
        return;
      }
    }
    setPasswordValidity(true);
    setShowPasswordValidity(true);
  
  };


  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleConfirmPasswordEndEditing = () => {
    if (confirmPassword === "") {
      setShowConfirmPasswordValidity(false);
      setShowConfirmPasswordProcessing(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordMatches(false);
      setShowConfirmPasswordValidity(true);
    } else {
      setConfirmPasswordMatches(true);
      setShowConfirmPasswordValidity(true);
    }
    setShowConfirmPasswordProcessing(false);
  }

  // effects
  
  // validate password 1.5 second after user stops typing
  const [lastPasswordChange, setLastPasswordChange] = useState(Date.now());
  useEffect(() => {
    setLastPasswordChange(Date.now());
    setShowPasswordProcessing(true);
    const timer = setTimeout(() => {
      if (Date.now() - lastPasswordChange > 1000) {
        handlePasswordEditingEnd();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [password])

  // validate confirm password 1.5 second after user stops typing
  const [lastConfirmPasswordChange, setLastConfirmPasswordChange] = useState(Date.now());
  useEffect(() => {
    setLastConfirmPasswordChange(Date.now());
    setShowConfirmPasswordProcessing(true);
    const timer = setTimeout(() => {
      if (Date.now() - lastConfirmPasswordChange > 1000) {
        handleConfirmPasswordEndEditing();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [confirmPassword]);

  return (
    <SafeAreaView
      style={{
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
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Registration
          </Text>
        </View>

        <KeyboardAwareScrollView style={{ paddingHorizontal: 25 }}>
          {/* Username */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 200,
                marginBottom: 10,
                fontFamily: "Inter_200ExtraLight",
              }}
            >
              Pick a Username
            </Text>
            <CustomTextInput
              defaultValue={"Username"}
              value={username}
              onChangeText={handleUsernameChange}
              onFocus={handleFocus}
            />
          </View>
          {/* Email Address */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 200,
                marginBottom: 10,
                fontFamily: "Inter_200ExtraLight",
              }}
            >
              Enter your Email Address
            </Text>
            <CustomTextInput
              defaultValue={"Email Address"}
              value={email}
              onChangeText={handleEmailChange}
              onFocus={handleFocus}
            />
          </View>
          {/* Date of Birth*/}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 200,
                marginBottom: 10,
                fontFamily: "Inter_200ExtraLight",
              }}
            >
              Enter your Date of Birth
            </Text>

            <CustomInput type="date" value={dateOfBirth} />
          </View>
          {/* Password */}
          <View style={{ marginBottom: 5 }}>
            <Text
              style={{
                color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 200,
                marginBottom: 10,
                fontFamily: "Inter_200ExtraLight",
              }}
            >
              Pick a Password
            </Text>
            <CustomTextInput
              defaultValue={"Password"}
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={handleFocus}
              onEndEditing={handlePasswordEditingEnd}
              showValidity={showPasswordValidity}
              isValid={passwordValidity}
              isProcessing={showPasswordProcessing}
              secureTextEntry
            />
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <View style={{ flexDirection: "row" }}>
                {passwordRequirements.length ? (
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color="green"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="closecircle"
                    size={16}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                )}

                <Text>8 characters long</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {passwordRequirements.uppercase ? (
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color="green"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="closecircle"
                    size={16}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text>1 uppercase letter</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {passwordRequirements.lowercase ? (
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color="green"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="closecircle"
                    size={16}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text>1 lowercase letter</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {passwordRequirements.number ? (
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color="green"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="closecircle"
                    size={16}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text>1 number</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {passwordRequirements.specialCharacter ? (
                  <AntDesign
                    name="checkcircle"
                    size={16}
                    color="green"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <AntDesign
                    name="closecircle"
                    size={16}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text>1 special character</Text>
              </View>
            </View>
          </View>
          {/* Confirm Password */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                fontSize: 18,
                fontWeight: 200,
                marginBottom: 10,
                fontFamily: "Inter_200ExtraLight",
              }}
            >
              Confirm your Password
            </Text>
            <CustomTextInput
              defaultValue={"Confirm Password"}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onFocus={handleFocus}
              secureTextEntry
              onEndEditing={handleConfirmPasswordEndEditing}
              showValidity={showConfirmPasswordValidity}
              isValid={confirmPasswordMatches}
              isProcessing={showConfirmPasswordProcessing}
            />
          </View>

          {isFocused && <View style={{ height: 200 }} />}
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25,
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
          <CustomButtonComponent
            title="Continue"
            onTouchEnd={() => {}}
            disabled
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
