import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        borderColor: "#000000",
        borderWidth: 1,
        minHeight: 44,
        minWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function BasicButton(props) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text>{props.title || ""}</Text>
        </TouchableOpacity>
    );
}