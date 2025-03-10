import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import Ionicons from "react-native-vector-icons/Ionicons"
import { RoundBtnWithIconProps } from "../../types"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "../../types"

const RoundBtnWithIcon = ({ icon, screenToGo, title }: RoundBtnWithIconProps) => {
    const navigation = useNavigation<NavigationProp>();
    const onPress = () => {
        navigation.navigate(screenToGo)
    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name={icon} size={30} color="black" />
                <Text>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default RoundBtnWithIcon