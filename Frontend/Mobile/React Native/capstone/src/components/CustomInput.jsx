import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ThemeContext } from "src/contexts/ThemeContext";

const CustomInputProps = {
  type: "text" | "date" | "password",
  value: "",
};

export const CustomInput = ({ type = "text", value, onChange }) => {
  const theme = useContext(ThemeContext);
  const [date, setDate] = useState(new Date());

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
          paddingHorizontal: 10,
        }}
      >
        {type === "password" && (
          <TextInput
            secureTextEntry={true}
            style={{
              color: theme.theme === "light" ? "#000000" : "#FFFFFF",
              fontSize: 16,
            }}
            value={value}
            onChangeText={onChange}
          />
        )}

        {type === "text" && (
          <TextInput
            style={{
              color: theme.theme === "light" ? "#000000" : "#FFFFFF",
              fontSize: 16,
            }}
            value={value}
            onChangeText={onChange}
          />
        )}

        {type === "date" && (
          <>
            {Platform.OS === "ios" && (
            <View style={{
                position: 'absolute',
                left: 0,
            }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                onChange={(event, selectedDate) => {
                  setDate(selectedDate);
                }}
                display="default"
                themeVariant={theme.theme === "light" ? "light" : "dark"}
                />
              </View>
            )}

            {Platform.OS === "android" && (
              <Pressable
                onPress={() => {
                  setDatePickerOpen(true);
                }}
              >

                {datePickerOpen && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  onChange={(event, selectedDate) => {
                    setDate(selectedDate);
                      setDatePickerOpen(false);
                    
                  }}
                  display="default"
                />) || (
                <Text
                  style={{
                    color: theme.theme === "light" ? "#000000" : "#FFFFFF",
                    fontSize: 16,
                  }}
                >
                    {date.toLocaleDateString()}
                </Text>
                )}
              </Pressable>
            )}
          </>
        )}
      </View>
    </>
  );
};
