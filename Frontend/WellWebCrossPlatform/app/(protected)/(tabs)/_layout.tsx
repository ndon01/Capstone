import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  useEffect(() => {
    console.log("TabLayout");
  }, []);

  return (
    <Tabs
    
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#65ccc1",
          borderTopColor: "#65ccc1",

    
        },
      
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#113950",

      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="home"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="book"
              size={24}
              color={color}
            />
          ),
        }}
      />
    
        


      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="more-horizontal"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
