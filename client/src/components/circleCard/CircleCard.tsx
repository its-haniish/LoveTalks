import React from "react";
import styles from "./styles";
import { View, TouchableWithoutFeedback, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CircleCardProps, NavigationProp, } from "../../types";

const CircleCard = ({ circleCardsData }: { circleCardsData: CircleCardProps[] }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.circleCardsWrapper}>

            {
                circleCardsData.map((item) => {
                    return (
                        <TouchableWithoutFeedback
                            key={item.id}
                            style={styles.circleCardContainer}
                        >
                            <View>
                                <Image
                                    source={item.image}
                                    style={styles.circleCardImage}
                                />
                                <Text style={styles.circleCardText}>
                                    {item.title.split(" ")[0]}
                                </Text>
                                <Text style={styles.circleCardText}>
                                    {item.title.split(" ").slice(1).join(" ")}
                                </Text>

                            </View>
                        </TouchableWithoutFeedback>
                    );
                })
            }


        </View>
    );
}

export default CircleCard;
