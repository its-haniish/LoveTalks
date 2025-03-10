import React from "react";
import styles from "./styles";
import { ScrollView, View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { BlogCardProps, BlogCrouselProps } from "../../types";
import AntDesign from "react-native-vector-icons/AntDesign";

const BlogCrousel = ({ blogCardsData }: BlogCrouselProps) => {
    return (
        <View style={styles.crouselMainContainer}>
            <View style={styles.crouselHeadContainer}>
                <Text style={styles.crouselTitle}>Latest Blogs</Text>
                <TouchableWithoutFeedback>
                    <Text style={styles.crouselViewAllBtn}>View All <AntDesign name="arrowright" size={12} color="grey" /> </Text>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={styles.crouselContainer}
                showsHorizontalScrollIndicator={false}
            >
                {blogCardsData.map((blogCard) => (
                    <BlogCard
                        key={blogCard._id}
                        image={blogCard.image}
                        author={blogCard.author}
                        date={blogCard.date}
                        slug={blogCard.slug}
                        title={blogCard.title}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const BlogCard = ({ author, date, image, slug, title }: BlogCardProps) => {
    return (
        <View style={styles.blogCardContainer}>
            <Image source={image} style={styles.blogImage} />

            <View style={styles.blogInfoContainer}>
                <Text style={styles.blogTitle}>{title}</Text>

                <View style={styles.blogAuthorDateContainer}>
                    <Text style={styles.blogAuthor}>{author}</Text>
                    <Text style={styles.blogDate}>{date}</Text>
                </View>
            </View>
        </View>
    );
};

export default BlogCrousel;
