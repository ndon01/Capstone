import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type CustomTextInputProps = {
    title: string;
}


export default function CustomTextInput({ title } : CustomTextInputProps): React.JSX.Element {
    
    const [textFocused, setTextFocused] = React.useState<boolean>(false);
    const textInputRef = React.useRef<TextInput>(null);

    return (
        <>
            <View style={{
            }}>
                {/* Title */}
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',

                }}>Meal Name</Text>


                {/* Input */}
                <View style={{
                    paddingVertical: 10,
                }}>
                    
                    <TextInput
                        style={{
                            fontSize: 16,
                            display: textFocused ? 'flex' : 'none',
                        }}
                        ref={textInputRef}
                    />

                    <TouchableOpacity onPress={() => {
                        setTextFocused(true);
                        textInputRef.current?.focus();
                    }}
                    
                    style={{
                        display: textFocused ? 'none' : 'flex',
                    }}
                    >
                        <Text style={{
                            fontSize: 16,
                        }}>Meal Name</Text>
                    </TouchableOpacity>


                </View>


                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                }} />
            </View>
        </>
    )
}