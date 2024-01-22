import React, { useCallback } from "react";
import Routes from "./routes";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "./contexts/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();

function MainComponent() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

  }, [fontsLoaded, fontError]);

  SplashScreen.hideAsync();


  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default MainComponent;
