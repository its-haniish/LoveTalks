import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF5F7',
    },

    pageHeadContanier: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    headingContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    pageNamePinkTxt: {
        color: "#FF007F",
        fontSize: 20,
        fontWeight: "bold",
    },
    pageNameBlueTxt: {
        color: "#007FFF",
        fontSize: 20,
        fontWeight: "bold",
    },

    blogScrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },
});