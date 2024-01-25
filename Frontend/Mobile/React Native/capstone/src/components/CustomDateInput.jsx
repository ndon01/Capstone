import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ThemeContext } from "src/contexts/ThemeContext";
import { AntDesign } from "@expo/vector-icons";


export const CustomDateInput = ({
  value = Date.now(),
  onChange = () => {},
  onFocus = () => {},
  showValidity = false,
  isValid = false,
  isProcessing = false,
}) => {
  const theme = useContext(ThemeContext);

  let [datePickerOpen, setDatePickerOpen] = useState(false);

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
          alignItems: "center",
        }}
      >
        {Platform.OS === "ios" && (
          <View
            style={{
              position: "absolute",
              left: 0,
            }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={value}
              mode={"date"}
              onChange={onChange}
            
              display="default"
              themeVariant={theme.theme === "light" ? "light" : "dark"}
              onFocus={onFocus}
            />
          </View>
        )}

        {Platform.OS === "android" && (
          <Pressable style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            paddingLeft: 10,
          }}

            onPress={() => {
              setDatePickerOpen(true);
            }}
          >
            {(datePickerOpen && (
              <DateTimePicker
                testID="dateTimePicker"
                value={value}
                mode={"date"}
                onChange={(event, selectedDate) => {
                  setDatePickerOpen(false);
                  onChange(event, selectedDate);
                }}
                display="default"
              />
            )) || (
              <Text
                style={{
                  color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                  fontSize: 16,
                }}
              >
                {value.toLocaleDateString()}
              </Text>
            )}
          </Pressable>
        )}
        {isProcessing && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: 10,
            }}
          />
        )}

        {!isProcessing &&
          showValidity &&
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
