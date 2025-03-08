import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ChatScreen, ProfileScreen } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";

// Define tab navigation
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = "home"; // Default value

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Chat") {
                        iconName = "chatbubbles";
                    } else if (route.name === "Profile") {
                        iconName = "person";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#FF5733",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
