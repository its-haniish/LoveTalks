import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { rightHeaderStyles as styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types"; // Import from types/index.ts


const RightHeader = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.mainContainer}>

            {/* Coin container - Navigates to Coin Page */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Wallet")}>
                <View style={styles.coinContainer}>
                    <Ionicons name="wallet-outline" size={20} color="black" />
                    <Text style={styles.text}>
                        ₹ 10
                    </Text>
                    <View>
                        <Ionicons name="add-circle-sharp" size={20} color="blue" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* Notification container - Navigates to Notification Page */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Notification")}>
                <View style={styles.notificationWrapper}>
                    <Ionicons name="notifications-outline" size={30} color="black" />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationCount}>9+</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </View>
    );
};

export default RightHeader;
