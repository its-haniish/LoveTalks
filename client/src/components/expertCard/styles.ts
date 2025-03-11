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
    expertImage: {
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
    expertName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    expertInfo: {
        fontSize: 13,
        color: 'gray',
        textAlign: 'left',
    },
    expertRate: {
        fontSize: 15,
        fontWeight: 'bold',
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
    chatButton: {
        borderColor: 'gold',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    chatButtonText: {
        color: 'gold',
        fontSize: 16,
        fontWeight: '500',
    },
});
