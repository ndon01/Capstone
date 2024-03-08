import PageLayoutComponent from "components/PageLayoutComponent";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function BrandScreen() {
    const localSearchParams = useLocalSearchParams();
    const BrandId = localSearchParams.id;

    useEffect(() => {
        console.log("Brand screen mounted");

        

        return () => {
            console.log("Brand screen unmounted");
        };
    }, []);

    return (
        <PageLayoutComponent title={`Brand: ${localSearchParams.id}`}>



        </PageLayoutComponent>
    );
}