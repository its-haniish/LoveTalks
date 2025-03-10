import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get device width

export default StyleSheet.create({
    posterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "white",
    },
    imageWrapper: {
        width: width - 20,  // Set explicit size
        height: 100, // Set explicit size
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    poster: {
        width: "100%",
        height: "100%", // Ensure it fills the wrapper
        resizeMode: "cover", // Change to 'cover' for better fit
        elevation: 10,
    },
});
