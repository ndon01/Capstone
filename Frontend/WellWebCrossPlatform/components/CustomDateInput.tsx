import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AntDesign } from "@expo/vector-icons";

export type CustomDateInputProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  onFocus?: () => void;
  showValidity?: boolean;
};


export const CustomDateInput = ({
  
}: CustomDateInputProps) => {
  let [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <>
      
    </>
  );
};