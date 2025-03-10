import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    squareCardsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 5,
        backgroundColor: "#fff"
    },
    squareCardContainer: {
        alignItems: "center",
        borderRadius: 10,
        padding: 15,
        width: 110,
    },
    squareCardImage: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        marginBottom: 8,
    },
    squareCardText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        alignSelf: "center",  // Prevents unnecessary stretching
        flexShrink: 1,        // Ensures text fits inside the container
    },
});

export default styles;
