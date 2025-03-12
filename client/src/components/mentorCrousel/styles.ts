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
    mentorCardContainer: {
        width: 150,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 2,
        alignItems: 'center',
    },
    mentorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'skyblue',
    },
    mentorName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    mentorPrice: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    chatButton: {
        borderColor: '#00cc00',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    chatButtonText: {
        color: '#00cc00',
        fontWeight: '500',
    }
});