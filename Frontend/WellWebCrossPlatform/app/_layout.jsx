import {
  SplashScreen,
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "src/config/Theme/Context";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  /*
    const [fontsLoaded, fontError] = useFonts({
    });
  
    useEffect(() => {
      if (fontsLoaded || fontError) {
        // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError]);
  
    // Prevent rendering until the font has loaded or an error was returned
    if (!fontsLoaded && !fontError) {
      return null;
    } */

  SplashScreen.hideAsync();

  // Render the children routes now that all the assets are loaded.
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Slot />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}
