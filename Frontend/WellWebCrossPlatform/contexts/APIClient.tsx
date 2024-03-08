import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import * as ExpoStore from "expo-secure-store";
import React, { useEffect } from "react";
import useConfig from "./Config";
import { Platform } from "react-native";

export type APIClientContextInterface = {
    post: (url: string, data: any) => Promise<any>;
    get: (url: string) => Promise<any>;
    login: (APIToken: string) => boolean | null;
    logout: () => void | null;
    isAuthenticated: boolean | null;
    isLoading: boolean | null;
    token: string | null;
};

const APIClientContext = React.createContext<APIClientContextInterface>({
    post: (url: string, data: any) => Promise.resolve(null),
    get: (url: string) => Promise.resolve(null),
    login: (APIToken: string) => null,
    logout: () => null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
});

// This hook can be used to access the user info.
export function useAPIClient() {
    const value = React.useContext(APIClientContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useAPIClient must be wrapped in a <APIClientProvider />");
        }
    }

    return value;
}

export function APIClientProvider(props: React.PropsWithChildren) {
    const api_url = process.env.EXPO_PUBLIC_API_URL;
    const config = useConfig();

    const [apiToken, setApiToken] = React.useState<string>("");

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    const login = (APIToken: string) => {
        // save the token to secure store

        console.log("Saving token to secure store");
        if (Platform.OS === "web") {
            localStorage.setItem("apiToken", APIToken);
        } else {
            ExpoStore.setItemAsync("apiToken", APIToken);
        }

        setApiToken(APIToken);
        setIsAuthenticated(true);

        return true;
    }

    const logout = () => {
        console.log("Logging out");
        if (Platform.OS === "web") {
            localStorage.removeItem("apiToken");
        } else {
            ExpoStore.deleteItemAsync("apiToken");
        }
        
        setApiToken("");
        setIsAuthenticated(false);
    }

    const post = async (url: string, data: any) => {
        console.log("POSTing to ", config.apiBaseUrl + url);
        console.log("Bearer " + apiToken);
        const response = await fetch(config.apiBaseUrl + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiToken,
            },
            body: JSON.stringify(data),
        });

        return response
    }

    const get = async (url: string) => {
        console.log("GETing from ", api_url + url);
        console.log("Bearer " + apiToken);
        const response = await fetch(api_url + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiToken,
            },
        });

        return response.json();
    }

    useEffect(() => {
 
        console.log("APIClient Mounted, checking for tokens...");
        setIsLoading(true);

        
        (async () => {
            
            var APIToken;
            if (Platform.OS === "web") {
                APIToken = localStorage.getItem("apiToken")

         
            } else {
                APIToken = await ExpoStore.getItemAsync("apiToken");

            }

            if (APIToken) {
                console.log("API token found");
                setApiToken(APIToken);
                setIsAuthenticated(true);
            } else {
                console.log("No API token found");
                setIsAuthenticated(false);
            
            }

            console.log("Setting Loading to false");
            setIsLoading(false);
        })();


    }, []);
   
    return (
        <APIClientContext.Provider
            value={{  
                post,
                get,
                login,
                logout,
                isAuthenticated,
                isLoading,
                token: apiToken,
            }}
        >
            {props.children}
        </APIClientContext.Provider>
    );
}
