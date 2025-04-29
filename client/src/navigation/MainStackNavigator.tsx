import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import { NotificationScreen, WalletScreen, MentorProfileScreen } from "../screens";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationScreen}
                options={{
                    title: "Notification",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Stack.Screen name="Wallet" component={WalletScreen}
                options={{
                    title: "Add Money to Wallet",
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Stack.Screen name="MentorProfile" component={MentorProfileScreen}
                options={{
                    title: "Mentor Profile",
                    headerStyle: {
                        backgroundColor: "#f4511e"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    }
                }}
            />


        </Stack.Navigator>
    );
};

export default MainStackNavigator;
