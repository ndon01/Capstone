import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LandingScreen from 'src/screens/LandingScreen';

const Stack = createStackNavigator();

const StackRouter = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        {/* Define your screens here */}
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} /> */}
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackRouter;
