import React from 'react'
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { truncateText } from '../../utils';

const imgPath = "https://media.istockphoto.com/id/922745190/photo/blogging-blog-concepts-ideas-with-worktable.jpg?s=612x612&w=0&k=20&c=xR2vOmtg-N6Lo6_I269SoM5PXEVRxlgvKxXUBMeMC_A="
const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const BlogCard = () => {
    return (
        <TouchableOpacity style={styles.mainContainer}>
            <View style={styles.headAndImgContainer}>
                <View style={styles.imgCont}>
                    <Image source={{ uri: imgPath }} style={styles.imgStyles} />
                </View>
                <Text style={styles.title}>{truncateText(text, 20)}</Text>
            </View>
            <View>
                <Text style={styles.para}>{truncateText(text, 30)} <Text style={styles.readMore}>Read More</Text></Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoData}> <Text style={styles.infoHead}>Date:</Text> 16,Jan,2025 </Text>
                <Text style={styles.infoData}> <Text style={styles.infoHead}>Author:</Text> Hanish</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BlogCard