import { StyleSheet } from "react-native";

export default StyleSheet.create({
    circleCardsWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        marginVertical: 5,
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 12
    },
    circleCardContainer: {
        width: 120,
        height: 120,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    circleCardImage: {
        width: 70,
        height: 70
    },
    circleCardText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold"
    }
});