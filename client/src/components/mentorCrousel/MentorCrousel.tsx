import React from "react";
import styles from "./styles";
import { ScrollView, View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { MentorCardProps, MentorCrouselProps } from "../../types";
import AntDesign from "react-native-vector-icons/AntDesign";

const MentorCrousel = ({ mentorCardsData }: MentorCrouselProps) => {
    return (
        <View style={styles.crouselMainContainer}>
            <View style={styles.crouselHeadContainer}>
                <Text style={styles.crouselTitle}>Love Mentors</Text>
                <TouchableWithoutFeedback>
                    <Text style={styles.crouselViewAllBtn}>View All <AntDesign name="arrowright" size={12} color="grey" /> </Text>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView horizontal={true}
                contentContainerStyle={styles.crouselContainer}
                showsHorizontalScrollIndicator={false}>
                {mentorCardsData.map((mentor) => (

                    <MentorCard
                        id={mentor.id}
                        image={mentor.image}
                        name={mentor.name}
                        price={mentor.price}
                        key={mentor.id}
                    />
                ))}
            </ScrollView>
        </View>
    )
};

const MentorCard = ({ image, name, price, id }: MentorCardProps) => {
    return (
        <View>
            <View>
                <View style={styles.mentorCardContainer}>
                    <Image source={image} style={styles.mentorImage} />
                    <Text style={styles.mentorName}>{name}</Text>
                    <Text style={styles.mentorPrice}>{`₹${price}/min`}</Text>
                    <TouchableWithoutFeedback>
                        <View style={styles.chatButton} >
                            <Text style={styles.chatButtonText}>Chat</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

        </View>
    )
};

export default MentorCrousel;