import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 240,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    headAndImgContainer: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10,
    },
    imgCont: {
        width: "50%",
    },
    imgStyles: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        height: 120,
        fontWeight: "500",
        width: "50%",
        textAlign: "justify",
        flexWrap: "wrap",
        flexShrink: 1, // Prevents text from being cut
    },
    para: {
        marginTop: -20,
        fontSize: 14,
        textAlign: "justify",
        marginBottom: 5,
        flexWrap: "wrap",
        flexShrink: 1, // Prevents text from being cut
    },
    readMore: {
        color: "blue",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoHead: {
        fontWeight: "bold",
        color: "gray",
    },
    infoData: {
        color: "gray",
        fontWeight: "500",
    },
});
