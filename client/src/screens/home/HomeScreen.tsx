import React from "react";
import styles from "./styles";
import { ScrollView, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types";
import {
    AppInfoCards,
    BlogCrousel,
    ExpertCrousel,
    Poster,
    CircleCard,
    RoundBtnWithIcon
} from "../../components";

const HomeScreen = () => {
    const mentorCardsData = [
        {
            id: 1,
            name: "Mahesh",
            price: 50,
            image: require("../../../assets/expert/expert1.jpeg"),
        },
        {
            id: 2,
            name: "Ramesh",
            price: 60,
            image: require("../../../assets/expert/expert2.jpeg"),
        },
        {
            id: 3,
            name: "Suresh",
            price: 50,
            image: require("../../../assets/expert/expert1.jpeg"),
        },
        {
            id: 4,
            name: "Dogesh",
            price: 60,
            image: require("../../../assets/expert/expert2.jpeg"),
        },
    ]
    const blogCardsData = [
        {
            _id: 1,
            image: require("../../../assets/blogs/image1.png"),
            author: "Sophia Carter",
            date: "March 8, 2025",
            slug: "how-to-build-trust-in-a-relationship",
            title: "How to Build Trust in a Relationship",
        },
        {
            _id: 2,
            image: require("../../../assets/blogs/image1.png"),
            author: "James Anderson",
            date: "March 5, 2025",
            slug: "effective-communication-in-love",
            title: "Effective Communication in Love",
        },
        {
            _id: 3,
            image: require("../../../assets/blogs/image1.png"),
            author: "Emily Roberts",
            date: "March 3, 2025",
            slug: "signs-of-healthy-relationship",
            title: "Signs of a Healthy Relationship",
        },
        {
            _id: 4,
            image: require("../../../assets/blogs/image1.png"),
            author: "Michael Smith",
            date: "February 28, 2025",
            slug: "handling-long-distance-relationships",
            title: "Handling Long-Distance Relationships",
        },
        {
            _id: 5,
            image: require("../../../assets/blogs/image1.png"),
            author: "Olivia Martinez",
            date: "February 25, 2025",
            slug: "expressing-love-in-different-ways",
            title: "Expressing Love in Different Ways",
        },
    ];
    const circleCardsData = [
        {
            id: 1,
            title: "Daily Tips",
            image: require("../../../assets/circle_cards/tips.png"),
            screen: "Blogs" as keyof RootStackParamList,
        },
        {
            id: 2,
            title: "Career Advice",
            image: require("../../../assets/circle_cards/career.png"),
            screen: "Chat" as keyof RootStackParamList,
        },
        {
            id: 3,
            title: "Premium Services",
            image: require("../../../assets/circle_cards/premium.png"),
            screen: "Profile" as keyof RootStackParamList,
        },
        {
            id: 4,
            title: "Love Blogs",
            image: require("../../../assets/circle_cards/blogs.png"),
            screen: "Blogs" as keyof RootStackParamList,
        }
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.homeScrollView}>

                    {/* top circle navigations */}
                    <CircleCard circleCardsData={circleCardsData} />

                    {/* quote section  */}
                    <Poster image={require("../../../assets/posters/quote.png")} screenName="Chat" />

                    {/* expert cards crousel */}
                    <ExpertCrousel mentorCardsData={mentorCardsData} />

                    {/* rectangle image for chat screen  */}
                    <Poster image={require("../../../assets/posters/poster2.png")} screenName="Chat" />

                    {/* blog cards crousel */}
                    <BlogCrousel blogCardsData={blogCardsData} />


                    {/* rectangle image for chat screen  */}
                    <Poster image={require("../../../assets/posters/poster.png")} screenName="Chat" />


                    {/* round buttons for chat and call  */}
                    <View style={styles.roundBtnContainer}>
                        {/* <RoundBtnWithIcon /> */}
                        <RoundBtnWithIcon
                            title="Chat with Mentors"
                            icon="chatbubble-ellipses-sharp"
                            screenToGo="Chat"
                        />
                        {/* <RoundBtnWithIcon /> */}
                        <RoundBtnWithIcon
                            title="Call with Mentors"
                            icon="call"
                            screenToGo="Call"
                        />
                    </View>

                    {/* app info circle cards  */}
                    <AppInfoCards />

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
