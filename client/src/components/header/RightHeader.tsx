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
            {/* Support container - Navigates to Support Page */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Support")}>
                <Image
                    source={require("../../../assets/support.png")}
                    style={styles.image}
                />
            </TouchableWithoutFeedback>

        </View>
    );
};

export default RightHeader;
