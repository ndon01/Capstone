import { Redirect, router, useNavigationContainerRef, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAPIClient } from "../contexts/APIClient";
import React from "react";

export default function SplashScreen() {


    const APIClient = useAPIClient();
    const routeSegments = useSegments();
    const rootNavigation = useNavigationContainerRef();
    const router = useRouter();
    const [isNavigationReady, setNavigationReady] = React.useState(false);
  
    useEffect(() => {
      console.log("RootNav updated")
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
  
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    useEffect(() => {
        if (!isNavigationReady) {
            console.log("Navigation not ready");
            return ;
        }

        if (APIClient.isLoading) {
            console.log("APIClient is loading");
            return;
        }

        if (APIClient.isAuthenticated) {
            console.log("APIClient is authenticated");
            router.replace("/home");
        } else {
            console.log("APIClient is not authenticated");
            router.replace("/landing");
        }

    }, [isNavigationReady, APIClient.isLoading, APIClient.isAuthenticated]);

    return (
        <SafeAreaView>
            <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            
            }}>
                <ActivityIndicator size="small" color="#3D81E7" />
            </View>

            
        </SafeAreaView>
    )
}