import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ChatExploreScreen, BlogScreen, CallScreen } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PlatformPressable } from "@react-navigation/elements";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = "home"; // Default value

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Chat") {
                        iconName = "chatbubbles";
                    } else if (route.name === "Blogs") {
                        iconName = "reader-sharp";
                    } else if (route.name === "Call") {
                        iconName = "call";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarButton: (props) => (
                    <PlatformPressable
                        {...props}
                        android_ripple={{ color: "transparent" }} // Disables ripple effect on Android
                    />
                ),
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatExploreScreen} />
            <Tab.Screen name="Call" component={CallScreen} />
            <Tab.Screen name="Blogs" component={BlogScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
