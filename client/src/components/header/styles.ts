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
        borderColor: "#3366cc",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 20,
    },
    notificationWrapper: {
        position: 'relative'
    },
    notificationBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 19,
        height: 19,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    notificationCount: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
})

