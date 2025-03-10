import React from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types";
import { PosterProps } from "../../types";

const Poster = ({ image, screenName }: PosterProps) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.posterContainer}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate(screenName)}>
                <View style={styles.imageWrapper}>
                    <Image source={image} style={styles.poster} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Poster;
