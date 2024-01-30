import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "src/contexts/ThemeContext";

export const BottomBarNavigation = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: 10,
          borderTopWidth: 1,
        }}
      >
        {/* Bottom Navigation */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            borderRightWidth: 1,
          }}
        >
          {/* Dairy Button */}
          <FontAwesome
            name="book"
            size={24}
            color="black"
            style={{ marginBottom: 5 }}
          />
          <Text>Diary</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <FontAwesome
            name="settings"
            size={24}
            color="black"
            style={{ marginBottom: 5 }}
          />
          <Text>Settings</Text>
          {/* Settings Button */}
        </View>
      </View>
    </>
  );
};
