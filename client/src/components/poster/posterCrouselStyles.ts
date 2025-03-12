import { StyleSheet } from "react-native";

export default StyleSheet.create({
    posterContainer: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        alignSelf: "center",
        marginVertical: 5,
    },
    posterImage: {
        width: "100%",
        height: 70,
        resizeMode: "cover",
    }
});
