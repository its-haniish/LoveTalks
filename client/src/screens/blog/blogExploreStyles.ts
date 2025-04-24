import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF5F7',
    },

    pageHeadContanier: {
        padding: 20,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF69B4',
        marginRight: 5,
    },

    pageNameBlueTxt: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6495E3',
    },

    blogScrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },
});