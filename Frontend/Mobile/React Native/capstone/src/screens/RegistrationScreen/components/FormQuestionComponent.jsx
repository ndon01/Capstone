import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CustomButtonComponent } from "components/CustomButtonComponent";
import { CustomInput } from "components/CustomDateInput";
import { CustomTextInput } from "components/CustomTextInput";
import React, { useContext, useEffect, useState } from "react";
import { View,Text, Button, Platform, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemeContext } from "src/contexts/ThemeContext";



export const FormQuestionComponent = ({ title = "", children }) => {
    const theme = useContext(ThemeContext);
    
  return (
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
        {title}
      </Text>
        {children}
    </View>
  );
};
