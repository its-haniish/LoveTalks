import React from "react";
import styles from "./styles";
import { View, Image, Text } from "react-native";

const squareCardsData = [
    {
        id: 1,
        title: "Private & Confidential",
        image: require("../../../assets/circle_cards/private.png"),
    },
    {
        id: 2,
        title: "Verified Experts",
        image: require("../../../assets/circle_cards/verified.png"),
    },
    {
        id: 3,
        title: "Secure Payments",
        image: require("../../../assets/circle_cards/secure.png"),
    }
];

const AppInfoCards = () => {
    return (
        <View style={styles.squareCardsWrapper}>
            {squareCardsData.map((item) => (
                <View key={item.id} style={styles.squareCardContainer}>
                    <Image source={item.image} style={styles.squareCardImage} />
                    <Text style={styles.squareCardText}>
                        {item.title.split(" ")[0]}
                    </Text>
                    <Text style={styles.squareCardText} numberOfLines={1}>
                        {item.title.split(" ").slice(1).join(" ")}
                    </Text>

                </View>
            ))}
        </View>
    );
};

export default AppInfoCards;
