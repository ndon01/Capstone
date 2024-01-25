import React, { useCallback, useEffect } from "react";
import Routes from "./routes";
import { View, Button, Platform, TextInput, Text } from "react-native";

import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "./contexts/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

function MainComponent() {
  useEffect(() => {
    Font.loadAsync({
      "Inter-Black": require("assets/fonts/Inter-Black.ttf"),
      "Inter-BlackItalic": require("assets/fonts/Inter-BlackItalic.ttf"),
      "Inter-Bold": require("assets/fonts/Inter-Bold.ttf"),
      "Inter-BoldItalic": require("assets/fonts/Inter-BoldItalic.ttf"),
      "Inter-ExtraBold": require("assets/fonts/Inter-ExtraBold.ttf"),
      "Inter-ExtraBoldItalic": require("assets/fonts/Inter-ExtraBoldItalic.ttf"),
      "Inter-ExtraLight": require("assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-ExtraLightItalic": require("assets/fonts/Inter-ExtraLightItalic.ttf"),
      "Inter-Italic": require("assets/fonts/Inter-Italic.ttf"),
      "Inter-Light": require("assets/fonts/Inter-Light.ttf"),
      "Inter-LightItalic": require("assets/fonts/Inter-LightItalic.ttf"),
      "Inter-Medium": require("assets/fonts/Inter-Medium.ttf"),
      "Inter-MediumItalic": require("assets/fonts/Inter-MediumItalic.ttf"),
      "Inter-Regular": require("assets/fonts/Inter-Regular.ttf"),
      "Inter-SemiBold": require("assets/fonts/Inter-SemiBold.ttf"),
      "Inter-SemiBoldItalic": require("assets/fonts/Inter-SemiBoldItalic.ttf"),
      "Inter-Thin": require("assets/fonts/Inter-Thin.ttf"),
      "Inter-ThinItalic": require("assets/fonts/Inter-ThinItalic.ttf"),
      "InterDisplay-Black": require("assets/fonts/InterDisplay-Black.ttf"),
      "InterDisplay-BlackItalic": require("assets/fonts/InterDisplay-BlackItalic.ttf"),
      "InterDisplay-Bold": require("assets/fonts/InterDisplay-Bold.ttf"),
      "InterDisplay-BoldItalic": require("assets/fonts/InterDisplay-BoldItalic.ttf"),
      "InterDisplay-ExtraBold": require("assets/fonts/InterDisplay-ExtraBold.ttf"),
      "InterDisplay-ExtraBoldItalic":
        require("assets/fonts/InterDisplay-ExtraBoldItalic.ttf"),
      "InterDisplay-ExtraLight": require("assets/fonts/InterDisplay-ExtraLight.ttf"),
      "InterDisplay-ExtraLightItalic":
        require("assets/fonts/InterDisplay-ExtraLightItalic.ttf"),
      "InterDisplay-Italic": require("assets/fonts/InterDisplay-Italic.ttf"),
      "InterDisplay-Light": require("assets/fonts/InterDisplay-Light.ttf"),
      "InterDisplay-LightItalic": require("assets/fonts/InterDisplay-LightItalic.ttf"),
      "InterDisplay-Medium": require("assets/fonts/InterDisplay-Medium.ttf"),
      "InterDisplay-MediumItalic": require("assets/fonts/InterDisplay-MediumItalic.ttf"),
      "InterDisplay-Regular": require("assets/fonts/InterDisplay-Regular.ttf"),
      "InterDisplay-SemiBold": require("assets/fonts/InterDisplay-SemiBold.ttf"),
      "InterDisplay-SemiBoldItalic":
        require("assets/fonts/InterDisplay-SemiBoldItalic.ttf"),
      "InterDisplay-Thin": require("assets/fonts/InterDisplay-Thin.ttf"),
      "InterDisplay-ThinItalic": require("assets/fonts/InterDisplay-ThinItalic.ttf"),
    }).then(() => {
      SplashScreen.hideAsync();
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default MainComponent;
