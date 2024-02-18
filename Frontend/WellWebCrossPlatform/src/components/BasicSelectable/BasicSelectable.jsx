import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const BasicSelectable = (props) => {

    let selected = props.selected || false;
    return (
        <TouchableOpacity
            style={{
                backgroundColor: selected ? "#3D81E7" : "transparent",
                minHeight: 44,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={props.onPress || (() => { })}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{
                    color: selected ? "#FFFFFF" : "#000000",
                    fontSize: 16,
                }}>{props.title || "No Title Provided"}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BasicSelectable;
