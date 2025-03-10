import React from "react";
import styles from "./styles";
import { ScrollView, View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { ExpertCardProps, ExpertCrouselProps } from "../../types";
import AntDesign from "react-native-vector-icons/AntDesign";

const ExpertCrousel = ({ expertCardsData }: ExpertCrouselProps) => {
    return (
        <View style={styles.crouselMainContainer}>
            <View style={styles.crouselHeadContainer}>
                <Text style={styles.crouselTitle}>Experts</Text>
                <TouchableWithoutFeedback>
                    <Text style={styles.crouselViewAllBtn}>View All <AntDesign name="arrowright" size={12} color="grey" /> </Text>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView horizontal={true}
                contentContainerStyle={styles.crouselContainer}
                showsHorizontalScrollIndicator={false}>
                {expertCardsData.map((expertCard) => (

                    <ExpertCard
                        image={expertCard.image}
                        name={expertCard.name}
                        price={expertCard.price}
                        key={expertCard.id}
                    />
                ))}
            </ScrollView>
        </View>
    )
};

const ExpertCard = ({ image, name, price }: ExpertCardProps) => {
    return (
        <View>
            <View>
                <View style={styles.expertCardContainer}>
                    <Image source={image} style={styles.expertImage} />
                    <Text style={styles.expertName}>{name}</Text>
                    <Text style={styles.expertPrice}>{`₹${price}/min`}</Text>
                    <TouchableWithoutFeedback>
                        <View style={styles.chatButton}>
                            <Text style={styles.chatButtonText}>Chat</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

        </View>
    )
};

export default ExpertCrousel;