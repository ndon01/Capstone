import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import RegistrationScreen from 'screens/RegistrationScreen';
import LoginScreen from 'screens/LoginScreen';


const Stack = createNativeStackNavigator();


const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LandingScreen" component={LandingScreen} options={{
                    headerShown: false,
                    headerTitle: '',
                    
                }}/>
    
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
                    headerShown: false,
                    headerTitle: 'Register',
                    headerTransparent: true,
                }}/>

                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    headerShown: false,
                    headerTitle: 'Login',
                    
                }}/>    
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Routes;
