import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomButtonComponent } from "components/CustomButtonComponent";
import { CustomInput } from "components/CustomDateInput";
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
import { RegistrationForm, RegistrationFormComponent } from "./components/RegistrationFormComponent";

const RegistrationScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);

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
              fontFamily: "Inter-SemiBold",
            }}
          >
            Registration
          </Text>
        </View>

        <RegistrationFormComponent />
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
