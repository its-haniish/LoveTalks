import { StyleSheet } from "react-native";

export default StyleSheet.create({
    crouselMainContainer: {
        backgroundColor: "#fff",
        marginVertical: 5,

    },
    crouselContainer: {
        backgroundColor: "#fff",
        padding: 5
    },
    crouselHeadContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        marginTop: 10,
    },
    crouselTitle: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.2
    },
    crouselViewAllBtn: {
        fontSize: 12,
        color: "grey",
        fontWeight: "400",
    },
    blogCardContainer: {
        width: 200,
        height: 200,
        marginHorizontal: 5,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
        backgroundColor: "#fff",
        elevation: 2,
    },
    blogImage: {
        width: "100%",
        height: "60%",
        borderRadius: 10,
        resizeMode: "cover",
    },
    blogInfoContainer: {
        justifyContent: "space-between",
        height: "40%",
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    blogTitle: {
        fontSize: 14,
        fontWeight: "400",
        marginVertical: 5,
        width: "100%",
        textAlign: "center",
    },
    blogAuthorDateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    blogAuthor: {
        fontSize: 10,
        color: "grey",
        fontWeight: "400",
    },
    blogDate: {
        fontSize: 10,
        color: "grey",
    },

});