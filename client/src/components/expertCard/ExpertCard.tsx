import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import Foundation from "react-native-vector-icons/Foundation";


const ExpertCard = () => {
    const defaultPic = require('../../../assets/default.png');

    return (
        <TouchableOpacity style={styles.cardMainContainer}>
            {/* left container  */}
            <View style={styles.leftContainer}>
                <Image source={defaultPic} style={styles.expertImage} />
                <View style={styles.starsContainer}>
                    <Foundation size={16} name="star" color="grey" />
                    <Foundation size={16} name="star" color="grey" />
                    <Foundation size={16} name="star" color="grey" />
                    <Foundation size={16} name="star" color="grey" />
                    <Foundation size={16} name="star" color="grey" />
                </View>
            </View>
            {/* middle container */}
            <View style={styles.middleContainer}>
                <Text style={styles.expertName}>Expert Name</Text>
                <Text style={styles.expertInfo}>English, Hindi</Text>
                <Text style={styles.expertInfo}>Exp- 3 years</Text>
                <Text style={styles.expertRate}>₹50/min</Text>
            </View>
            {/* right container */}
            <View style={styles.rightContainer}>
                <Image
                    source={require('../../../assets/verify.png')}
                    style={styles.verifyImage}
                />
                <TouchableOpacity>
                    <View style={styles.chatButton}>
                        <Text style={styles.chatButtonText}>Chat</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    )
}

export default ExpertCard