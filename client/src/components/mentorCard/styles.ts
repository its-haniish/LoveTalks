import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get device width

export default StyleSheet.create({
    cardMainContainer: {
        width: width * 0.95, // 90% of device width
        height: 130,
        backgroundColor: 'transparent',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: "center", // Centers the card horizontally
        borderColor: 'lightgray',
        marginTop: 5,
    },
    leftContainer: {
        width: '30%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    mentorImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'skyblue',
    },
    starsContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    middleContainer: {
        width: '40%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginTop: 30,
        gap: 2,
    },
    mentorName: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'left',
    },
    mentorInfo: {
        fontSize: 13,
        color: 'gray',
        textAlign: 'left',
    },
    mentorRate: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
        textAlign: 'left',
    },
    rightContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        gap: 18,
        marginTop: 25,
    },
    verifyImage: {
        width: "100%",
        height: "30%",
        resizeMode: "cover",
    },
    typeButton: {
        borderColor: 'gold',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    typeButtonText: {
        color: 'gold',
        fontSize: 16,
        fontWeight: '500',
        textTransform: "capitalize"
    },
});
