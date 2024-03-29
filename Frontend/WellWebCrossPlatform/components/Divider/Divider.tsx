import React from 'react';
import { View } from 'react-native';

const Divider = ({width = 1}: {width: number | null}) => {
    return <View style={{
        width: "100%",
        height: width || 1,
        backgroundColor: "#000000",
    }} />
};

export default Divider;
