import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import { ThemeContext } from "src/contexts/ThemeContext";

export const CustomTextInput = ({
  defaultValue = "",
  value = "",
  onChangeText = () => {},
  secureTextEntry = false,
  onFocus = () => {},
  showValidity = false,
  isValid = false,
  isProcessing = false,
  onEndEditing = () => {},
}) => {
  const theme = useContext(ThemeContext);
  const [showDefaultText, setShowDefaultText] = useState(true);
  const inputReference = useRef();

  const defaultValuePressed = () => {
    setShowDefaultText(false);
    inputReference.current?.focus();
    print("Clicked");
  };

  const handleTextInputSubmission = () => {
    if (value === "") {
      setShowDefaultText(true);
    }
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.theme === "light" ? "#000000" : "#FFFFFF",
          backgroundColor: theme.theme === "light" ? "#FFFFFF" : "#FFFFFFF",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        {/*  For some reason TextInput isn't showing the default text */}

        {showDefaultText && (
          <Pressable onPress={defaultValuePressed}>
            <Text
              style={{
                color: theme.theme === "light" ? "grey" : "rgb(200,200,200)",
                fontSize: 16,
              }}
            >
              {defaultValue}
            </Text>
          </Pressable>
        )}

        <TextInput
          style={{
            color: theme.theme === "light" ? "#000000" : "#FFFFFF",
            fontSize: 16,
            display: showDefaultText ? "none" : "flex",
          }}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          ref={inputReference}
          onSubmitEditing={handleTextInputSubmission}
          onFocus={onFocus}
          onEndEditing={(event) => {
            onEndEditing(event);
            handleTextInputSubmission();
          }}
        />
        {isProcessing && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: 10,
            }}
          />
        )}

        {!isProcessing && showValidity &&
          (isValid ? (
            <AntDesign
              name="checkcircle"
              size={24}
              color="green"
              style={{
                position: "absolute",
                right: 10,
              }}
            />
          ) : (
            <AntDesign
              name="closecircle"
              size={24}
              color="red"
              style={{
                position: "absolute",
                right: 10,
              }}
            />
          ))}
      </View>
    </>
  );
};
