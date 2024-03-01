import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import * as ExpoStore from "expo-secure-store";
import React, { useEffect } from "react";

export type APIClientContextInterface = {
    login: (APIToken: string) => boolean | null;
    logout: () => void | null;
    isAuthenticated: boolean | null;
    isLoading: boolean | null;
};

const APIClientContext = React.createContext<APIClientContextInterface>({
    login: (APIToken: string) => null,
    logout: () => null,
    isAuthenticated: false,
    isLoading: true,
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

    const [apiToken, setApiToken] = React.useState<string | null>(null);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);



    const login = (APIToken: string) => {
        // save the token to secure store

        console.log("Saving token to secure store");
        ExpoStore.setItemAsync("apiToken", APIToken);

        setApiToken(APIToken);
        setIsAuthenticated(true);


        return true;
    }

    const logout = () => {
        console.log("Logging out");
        ExpoStore.deleteItemAsync("apiToken");
        setApiToken(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
 
        console.log("APIClient Mounted, checking for tokens...");
        setIsLoading(true);

        
        (async () => {
            

            const APIToken = await ExpoStore.getItemAsync("apiToken");

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
                login,
                logout,
                isAuthenticated,
                isLoading,
            }}
        >
            {props.children}
        </APIClientContext.Provider>
    );
}
