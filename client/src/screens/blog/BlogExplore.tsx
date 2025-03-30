import React from 'react'
import { View, ScrollView, Text } from "react-native";
import styles from "./blogExploreStyles"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlogCard } from "../../components";

const BlogExplore = () => {
    return (
        <GestureHandlerRootView style={styles.mainContainer}>
            <View style={styles.pageHeadContanier}>
                <View style={styles.headingContainer}>
                    <Text style={styles.pageNamePinkTxt}>Love</Text>
                    <Text style={styles.pageNameBlueTxt}>Blogs</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.blogScrollContainer}>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </ScrollView>

        </GestureHandlerRootView>
    )
}

export default BlogExplore