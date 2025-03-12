import React, { useState, useEffect } from 'react';
import { View, Image } from "react-native";
import styles from "./posterCrouselStyles";

const PosterCrousel = () => {
    const data = [
        { id: 1, image: require('../../../assets/chatExplorePosters/poster1.png') },
        { id: 2, image: require('../../../assets/chatExplorePosters/poster2.png') },
        { id: 3, image: require('../../../assets/chatExplorePosters/poster3.png') },
        { id: 4, image: require('../../../assets/chatExplorePosters/poster4.png') },
        { id: 5, image: require('../../../assets/chatExplorePosters/poster5.png') },
        { id: 6, image: require('../../../assets/chatExplorePosters/poster6.png') },
        { id: 7, image: require('../../../assets/chatExplorePosters/poster7.png') },
        { id: 8, image: require('../../../assets/chatExplorePosters/poster8.png') }
    ];

    const [randomImage, setRandomImage] = useState(data[0].image);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * data.length);
            setRandomImage(data[randomIndex].image);
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.posterContainer}>
            <Image
                source={randomImage}
                style={styles.posterImage}
            />
        </View>
    );
}

export default PosterCrousel;
