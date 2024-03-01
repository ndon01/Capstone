import {
  SplashScreen,
  // This example uses a basic Layout component, but you can use any Layout.
  Stack,
  useSegments,
  useNavigationContainerRef,
  useRouter,
  router
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APIClientProvider, useAPIClient } from "contexts/APIClient";
import { ConfigProvider } from "../contexts/Config";

export {ErrorBoundary} from "expo-router";



SplashScreen.preventAutoHideAsync()

export default function RootLayout(): React.JSX.Element {
  // Load Fonts

  const APIClient = useAPIClient();
  const routeSegments = useSegments();
  const rootNavigation = useNavigationContainerRef();
  const [isNavigationReady, setNavigationReady] = React.useState(false);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      console.log(event.data.state?.routes)
      setNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);



  // Route Protection
  useEffect(() => {
    if (!isNavigationReady) {
      console.log("Navigation not ready");
      return ;
    }

    console.log("Navigation is ready");

    if (APIClient.isLoading) {
      console.log("APIClient is loading");
      return;
    }

    console.log("APIClient is ready");



    const isProtected = routeSegments[0] === "(protected)";

    if (isProtected) {
      if (APIClient.isAuthenticated) {
        console.log("APIClient is authenticated");
        return;
      } else {
        console.log("APIClient is not authenticated");
        router.navigate("/landing");
        return;
      }
    }



  }, [isNavigationReady, routeSegments, APIClient.isAuthenticated, APIClient.isLoading]);
  

  SplashScreen.hideAsync()

  return (
    <>
      <StatusBar />
      <GestureHandlerRootView style={{ flex: 1}}>
        <ConfigProvider apiBaseUrl="PUT API URL HERE"> {/* Was changing between wifi ips in dev, in production this would be one url and really only needs to be in .env, config can be used for this use and also local user configs when needed later*/}
          <APIClientProvider>
            <Stack screenOptions={{headerShown: false}} />
          </APIClientProvider>
        </ConfigProvider>
      </GestureHandlerRootView>
    </>
  );
}

