import { createContext, useContext } from "react";

export type Config = {
    apiBaseUrl: string;
}

const ConfigContext = createContext<Config>({
    apiBaseUrl: ""
});

export default function useConfig() {
    const value = useContext(ConfigContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useConfig must be wrapped in a <ConfigProvider />");
        }
    }
    return value;
}

export function ConfigProvider(props: React.PropsWithChildren<Config>) {
    return <ConfigContext.Provider value={props}>
        {props.children}
    </ConfigContext.Provider>
}