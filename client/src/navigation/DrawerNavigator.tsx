import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator"; // Import Tabs
import { ProfileScreen } from "../screens";  // Example additional screen
import { Ionicons } from "@expo/vector-icons";
import { HeaderMain, RightHeader } from "../components"

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation, route }) => ({
                tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "home"; // Explicit type

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
                headerTitle: () => <HeaderMain navigation={navigation} />,
                headerRight: () => <RightHeader />,
                headerLeft: () => null,  // ✅ Hide only the default menu button
                headerStyle: {
                    elevation: 0, // Remove shadow on Android
                }
            })}
        >
            <Drawer.Screen name="HomeTabs" component={BottomTabNavigator} options={{ title: "Home" }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
};

export default MainDrawerNavigator;
