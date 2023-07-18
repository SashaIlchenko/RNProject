import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator()
const AuthStack = createStackNavigator()

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/main/Home";
import MapScreen from './Screens/main/MapScreen';
import CommentsScreen from './Screens/main/CommentsScreen';

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </AuthStack.Navigator>
        )
    }
    return (
        <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
                name="Home"
                component={Home}
            />
            <MainStack.Screen
                options={{
                    headerTitleAlign: 'center',
                    title: 'Comments',
                }}
                name="Comments"
                component={CommentsScreen}
            />
            <MainStack.Screen
                options={{
                    headerTitleAlign: 'center',
                    title: 'MapScreen',
                }}
                name="MapScreen"
                component={MapScreen}
            />
        </MainStack.Navigator>
    )
};
