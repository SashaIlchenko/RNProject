import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import PostsScreen from './PostsScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const HeaderTab = createBottomTabNavigator()
const Home = () => {
    return (
        <View style={styles.container}>
            {/* <HeaderTab.Navigator tabBarOptions={{ showLabel: false }}> */}
            <HeaderTab.Screen
                options={{
                    tabBarShowLabel: false,
                    headerTitleAlign: 'center',
                    title: 'Publications',
                    headerRight: () => (
                        <TouchableOpacity onPress={signOut} style={styles.BtnlogOut}>
                            <MaterialIcons name="logout" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="ios-grid-outline" size={size} color={color} />
                    ),
                }}
                name="Posts"
                component={PostsScreen}
            />
            {/* <HeaderTab.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="add-outline" size={size} color={color} />
                    ),
                }}
            />
            <HeaderTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            /> */}
            {/* </HeaderTab.Navigator> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default Home;