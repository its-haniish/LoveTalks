import React from "react";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFonts, DancingScript_400Regular } from '@expo-google-fonts/dancing-script';

// Screens & Navigators
import BottomTabNavigator from "./BottomTabNavigator";
import { ProfileScreen, SupportScreen } from "../screens";

// Custom Header Components
import { HeaderMain, RightHeader } from "../components";

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => (
    <View style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
            <Text style={styles.logoText1}>Love</Text>
            <Ionicons
                name="heart-outline"
                size={35}
                color="#cc0066"
                style={styles.heartIcon}
            />
            <Text style={styles.logoText2}>Talks</Text>
        </View>

        <View style={styles.divider} />

        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    </View>
);

// Main Drawer Navigator
const MainDrawerNavigator = () => {
    const [fontsLoaded] = useFonts({
        DancingScript_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
                headerTitle: () => <HeaderMain navigation={navigation} />,
                headerRight: () => <RightHeader />,
                headerLeft: () => null,
                headerStyle: {
                    elevation: 0,
                    backgroundColor: "#fff",
                },
                headerTintColor: "#3366cc",
                drawerActiveTintColor: "#ff66b2",
                drawerInactiveTintColor: "#999",
                drawerActiveBackgroundColor: "#cce6ff",
            })}
        >
            {/* Home Tab */}
            <Drawer.Screen
                name="HomeTabs"
                component={BottomTabNavigator}
                options={{
                    title: "Home",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            {/* Profile Screen */}
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />

            {/* History Screen */}
            <Drawer.Screen
                name="Support"
                component={SupportScreen}
                options={{
                    title: "Support",
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="support-agent" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    logoContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logoText1: {
        fontSize: 35,
        fontWeight: "900",
        fontStyle: "italic",
        color: "#cc0066",
        fontFamily: "DancingScript_400Regular",
    },
    heartIcon: {
        marginHorizontal: 5,
    },
    logoText2: {
        fontSize: 35,
        fontWeight: "900",
        fontStyle: "italic",
        color: "#3366cc",
        fontFamily: "DancingScript_400Regular",
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
});

export default MainDrawerNavigator;