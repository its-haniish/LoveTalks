import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        gap: 10,
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 14,
        color: "black",
    },
});


export const rightHeaderStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        gap: 10,
        padding: 14,
    },
    image: {
        width: 42,
        height: 42,
    },
    text: {
        fontSize: 14,
        color: "black",
    },
    coinContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 2,
        alignItems: "center",
        borderColor: "skyblue",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 20,
    },
})

