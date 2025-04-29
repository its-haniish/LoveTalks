import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },

    headAndImgContainer: {
        marginBottom: 10,
    },

    imgCont: {
        borderRadius: 10,
        overflow: 'hidden',
    },

    imgStyles: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 10,
        color: '#333',
    },

    readMore: {
        color: '#FF69B4',
        fontWeight: '600',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    infoData: {
        fontSize: 12,
        color: '#888',
    },

    infoHead: {
        fontWeight: '600',
        color: '#444',
    },
});
