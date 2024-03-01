import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function TabLayout() {
  useEffect(() => {
    console.log("TabLayout");
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? "#3D81E7" : "black"}
            />
          ),
          tabBarActiveTintColor: "#3D81E7",
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="book"
              size={24}
              color={focused ? "#3D81E7" : "black"}
            />
          ),
          tabBarActiveTintColor: "#3D81E7",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="more-horizontal"
              size={24}
              color={focused ? "#3D81E7" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
