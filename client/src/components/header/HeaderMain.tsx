import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HeaderMainProps } from "../../types";

const HeaderMain = ({ navigation }: HeaderMainProps) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Image
                    style={styles.image}
                    source={require("../../../assets/menu.png")}
                />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>Hi Hanish</Text>
        </View>
    );
};

export default HeaderMain;
