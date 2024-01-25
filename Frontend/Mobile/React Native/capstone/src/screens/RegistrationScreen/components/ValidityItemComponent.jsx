import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Platform, ScrollView } from "react-native";
import { ThemeContext } from "src/contexts/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

export const ValidityItemComponent = ({ title = "", isValid = true }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        {isValid ? (
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

        <Text          style={{
            color: theme.theme == "light" ? "#000000" : "#FFFFFF",
          }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};
