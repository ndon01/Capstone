import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomButtonComponent } from "components/CustomButtonComponent";
import { CustomDateInput, CustomInput } from "components/CustomDateInput";
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
import { ValidityItemComponent } from "./ValidityItemComponent";
import { FormQuestionComponent } from "./FormQuestionComponent";
import * as AuthenticationAPI from "api/authentication";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export const RegistrationFormComponent = () => {
  const theme = useContext(ThemeContext);

  const [displayName, setDisplayName] = useState("");
  const [displayNameProps, setDisplayNameProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
  });

  function validateDisplayName(displayName) {
    return displayName.length >= 1;
  }

  const handleDisplayNameChange = (text) => {
    setDisplayName(text);
    setDisplayNameProps({
      ...displayNameProps,
      isValid: text.length >= 1,
      isProcessing: true,
    });
  };

  function handleDisplayNameEditingEnd() {
    setDisplayNameProps({
      ...displayNameProps,
      isValid: displayName.length >= 1,
      isProcessing: false,
    });
  }

  const [username, setUsername] = useState("");
  const [usernameProps, setUsernameProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
  });

  function validateUsername(username) {
    return username.length >= 1;
  }

  function handleUsernameChange(text) {
    if (text[text.length - 1] === " ") {
      return;
    }
    setUsername(text);
    setUsernameProps({
      ...usernameProps,
      isValid: text.length >= 1,
      isProcessing: true,
    });
  }

  function handleUsernameEditingEnd() {
    setUsernameProps({
      ...usernameProps,
      isValid: username.length >= 1,
      isProcessing: false,
    });
  }

  const [email, setEmail] = useState("");
  const [emailProps, setEmailProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
  });

  function handleEmailChange(text) {
    setEmail(text);
    setEmailProps({
      ...emailProps,
      isProcessing: true,
    });
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function handleEmailEditingEnd() {
    setEmailProps({
      ...emailProps,
      isValid: email.length >= 1 && validateEmail(email),
      isProcessing: false,
    });
  }

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthProps, setDateOfBirthProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
  });
  function validateDateOfBirth(dateOfBirth) {
    const inFuture = dateOfBirth - new Date() > 0;
    const youngerThan13 =
      new Date().getFullYear() - dateOfBirth.getFullYear() < 13;

    return !inFuture && !youngerThan13;
  }

  function handleDateOfBirthChange(event, selectedDate) {
    setDateOfBirth(selectedDate);

    if (selectedDate === undefined) {
      return;
    }

    // 13 years old and older
    if (new Date().getFullYear() - selectedDate.getFullYear() >= 13) {
      setDateOfBirthProps({
        ...dateOfBirthProps,
        isValid: true,
        isProcessing: false,
        showValidity: true,
      });
    } else {
      setDateOfBirthProps({
        ...dateOfBirthProps,
        isValid: false,
        isProcessing: false,
        showValidity: true,
      });
    }
  }

  const [password, setPassword] = useState("");
  const [passwordProps, setPasswordProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
    showValidity: false,
    passwordRequirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false,
    },
  });

  function validatePassword(password) {
    return (
      passwordProps.passwordRequirements.length &&
      passwordProps.passwordRequirements.uppercase &&
      passwordProps.passwordRequirements.lowercase &&
      passwordProps.passwordRequirements.number &&
      passwordProps.passwordRequirements.specialCharacter
    );
  }

  function checkPasswordRequirements(password) {
    let passwordRequirements = {
      length: password.length >= 8,
      uppercase: password.match(/[A-Z]/),
      lowercase: password.match(/[a-z]/),
      number: password.match(/[0-9]/),
      specialCharacter: password.match(/[^a-zA-Z\d]/),
    };

    return passwordRequirements;
  }

  function passwordContainsIllegalCharacter(password) {}

  function handlePasswordChange(text) {
    // No spaces
    if (text[text.length - 1] === " ") {
      return;
    }

    setPassword(text);

    const updatePasswordRequirements = checkPasswordRequirements(text);

    setPasswordProps({
      ...passwordProps,
      passwordRequirements: updatePasswordRequirements,
      isProcessing: true,
    });
  }

  function handlePasswordEditingEnd() {
    const updatePasswordRequirements = checkPasswordRequirements(password);

    setPasswordProps({
      ...passwordProps,
      isProcessing: false,
    });
  }

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordProps, setConfirmPasswordProps] = useState({
    isFocused: false,
    isProcessing: false,
    isValid: false,
    showValidity: false,
  });

  function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  function handleConfirmPasswordChange(text) {
    setConfirmPassword(text);
    setConfirmPasswordProps({
      ...confirmPasswordProps,
      isProcessing: true,
    });
  }

  function handleConfirmPasswordEndEditing() {
    setConfirmPasswordProps({
      ...confirmPasswordProps,
      isValid: password === confirmPassword,
      showValidity: true,
      isProcessing: false,
    });
  }

  const [isFocused, setIsFocused] = useState(false);
  function handleFocus() {
    setIsFocused(true);
  }

  const [areAllFieldsValid, setAreAllFieldsValid] = useState(false);

  const sendRegistrationData = (
    displayName,
    username,
    email,
    dateOfBirth,
    password
  ) => {
    fetch();
  };

  const postRegistration = () => {

  };

  const handleRegistrationSubmission = () => {
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/authentication/register`, {
      displayName: displayName,
      username: username,
      emailAddress: email,
      dateOfBirth: dateOfBirth,
      password: password,
    }).then((response) => {
        if (response.status === 200) {
          console.log("Registration Successful"); 
        }
      }).catch((error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    // check if all fields are valid
    const displayNameIsValid = validateDisplayName(displayName);
    const usernameIsValid = validateUsername(username);
    const emailIsValid = validateEmail(email);
    const dateOfBirthIsValid = validateDateOfBirth(dateOfBirth);
    const passwordIsValid = validatePassword(password);
    const confirmPasswordIsValid = validateConfirmPassword(
      password,
      confirmPassword
    );

    setAreAllFieldsValid(
      displayNameIsValid &&
        usernameIsValid &&
        emailIsValid &&
        dateOfBirthIsValid &&
        passwordIsValid &&
        confirmPasswordIsValid
    );
  }, [displayName, username, email, dateOfBirth, password, confirmPassword]);

  const [response, setResponse] = useState("");

  const navigation = useNavigation();

  return (
    <>
    <Text>{response}</Text>
      <KeyboardAwareScrollView style={{ paddingHorizontal: 25 }}>
        {/* Dispaly Name */}
        <FormQuestionComponent title="What should we call you?">
          <CustomTextInput
            defaultValue={"Display Name"}
            value={displayName}
            onChangeText={handleDisplayNameChange}
            onEndEditing={handleDisplayNameEditingEnd}
            isProcessing={displayNameProps.isProcessing}
            showValidity={displayName != "" && !displayNameProps.isProcessing}
            isValid={displayNameProps.isValid}
            onFocus={handleFocus}
            type="text"
          />
        </FormQuestionComponent>
        {/* Username */}
        <FormQuestionComponent title="Pick a Username">
          <CustomTextInput
            defaultValue={"Username"}
            value={username}
            onChangeText={handleUsernameChange}
            onEndEditing={handleUsernameEditingEnd}
            isProcessing={usernameProps.isProcessing}
            showValidity={username != "" && !usernameProps.isProcessing}
            isValid={usernameProps.isValid}
            onFocus={handleFocus}
            type="username"
          />
        </FormQuestionComponent>
        {/* Email Address */}
        <FormQuestionComponent title="Enter your Email Address">
          <CustomTextInput
            defaultValue={"Email Address"}
            value={email}
            onChangeText={handleEmailChange}
            onEndEditing={handleEmailEditingEnd}
            isProcessing={email != "" && emailProps.isProcessing}
            showValidity={email != "" && !emailProps.isProcessing}
            isValid={emailProps.isValid}
            onFocus={handleFocus}
            type="email"
          />
        </FormQuestionComponent>
        {/* Date of Birth*/}
        <FormQuestionComponent title="Enter your Date of Birth">
          <CustomDateInput
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            isProcessing={dateOfBirthProps.isProcessing}
            isValid={dateOfBirthProps.isValid}
            showValidity={
              !dateOfBirthProps.isProcessing && dateOfBirthProps.showValidity
            }
          />
        </FormQuestionComponent>
        {/* Password */}
        <FormQuestionComponent title="Pick a Password">
          <CustomTextInput
            defaultValue={"Password"}
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={handleFocus}
            onEndEditing={handlePasswordEditingEnd}
            showValidity={password != "" && !passwordProps.isProcessing}
            isValid={
              passwordProps.passwordRequirements.length &&
              passwordProps.passwordRequirements.uppercase &&
              passwordProps.passwordRequirements.lowercase &&
              passwordProps.passwordRequirements.number &&
              passwordProps.passwordRequirements.specialCharacter
            }
            isProcessing={passwordProps.isProcessing}
            secureTextEntry
          />
          <View style={{ marginTop: 15, marginLeft: 10 }}>
            <ValidityItemComponent
              title="8 characters long"
              isValid={passwordProps.passwordRequirements.length}
            />
            <ValidityItemComponent
              title="1 uppercase letter"
              isValid={passwordProps.passwordRequirements.uppercase}
            />
            <ValidityItemComponent
              title="1 lowercase letter"
              isValid={passwordProps.passwordRequirements.lowercase}
            />
            <ValidityItemComponent
              title="1 number"
              isValid={passwordProps.passwordRequirements.number}
            />
            <ValidityItemComponent
              title="1 special character"
              isValid={passwordProps.passwordRequirements.specialCharacter}
            />
          </View>
        </FormQuestionComponent>
        {/* Confirm Password */}
        <FormQuestionComponent title="Confirm your Password">
          <CustomTextInput
            defaultValue={"Confirm Password"}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            onFocus={handleFocus}
            secureTextEntry
            onEndEditing={handleConfirmPasswordEndEditing}
            showValidity={
              password != "" &&
              confirmPassword != "" &&
              !confirmPasswordProps.isProcessing
            }
            isValid={confirmPasswordProps.isValid}
            isProcessing={confirmPasswordProps.isProcessing}
          />
        </FormQuestionComponent>

        {/* When a FormQuestion is focused, this view is rendered
              and gives extra room to adjust for the keyboard */}
        {isFocused && <View style={{ height: 300 }} />}
      </KeyboardAwareScrollView>
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
            title="Register"
            disabled={areAllFieldsValid ? false : true}
            onTouchEnd={handleRegistrationSubmission}
          />
        </View>
      </View>
    </>
  );
};
