import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    pageHeadContanier: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
        paddingBottom: 5,
    },
    headingContainer: {
        flexDirection: "row",
        alignItems: "center",
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
        textTransform: "capitalize",
    },
    blogScrollContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        width: "100%",
    }

});