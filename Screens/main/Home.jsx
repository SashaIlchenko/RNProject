import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator()
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MainTab.Navigator screenOptions={
                {
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopColor: "#212121",
                        boxShadow: "0 -0.5px 0 rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(13.5914px)",
                        backgroundColor: "#FFFFFF",
                        paddingTop: 9,
                        paddingBottom: 34,
                        paddingHorizontal: 90,
                    },
                }
            }>
                <MainTab.Screen
                    options={{
                        tabBarShowLabel: false,
                        headerTitleAlign: 'center',
                        title: 'Publications',
                        headerStyle: {
                            borderBottomColor: "#212121",
                            boxShadow: "0 0.5px 0 rgba(0, 0, 0, 0.3)",
                            borderBottomWidth: 0.5,
                        },
                        headerTitleStyle: {
                            fontFamily: 'Roboto_500Medium',
                            fontSize: 17,
                            color: '#212121',
                            paddingVertical: "auto",
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <MaterialIcons name="logout" size={24} color='#BDBDBD' />
                            </TouchableOpacity>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="ios-grid-outline" size={24} color='rgba(33, 33, 33, 0.8)' />
                        ),
                    }}
                    name="PostsScreen"
                    component={PostsScreen}
                />
                <MainTab.Screen
                    name="CreatePostsScreen"
                    component={CreatePostsScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons name="add-outline" size={24} color='#FFFFFF' />
                        ),
                        tabBarItemStyle: {
                            backgroundColor: "#FF6C00",
                            borderRadius: 20,
                            marginHorizontal: 42,
                            paddingHorizontal: 13,
                        },
                        headerTitleStyle: {
                            fontFamily: 'Roboto_500Medium',
                            fontSize: 17,
                            color: '#212121',
                            paddingVertical: "auto",
                        },
                        tabBarStyle: { display: "none" },


                    }}
                />
                <MainTab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <Ionicons name="person-outline" size={24} color='rgba(33, 33, 33, 0.8)' />
                        ),
                    }}
                />
            </MainTab.Navigator>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default Home;

