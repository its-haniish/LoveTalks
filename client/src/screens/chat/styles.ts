import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    filterContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    appNameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    appNamePinkTxt: {
        color: "#FF007F",
        fontSize: 20,
        fontWeight: "bold",
    },
    appNameBlueTxt: {
        color: "#007FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    filterBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: "aliceblue",
    },
    filterbtnTxt: {
        color: "#000",
        fontSize: 14,
        fontWeight: "400"
    },
    bottomSheetContainer: {
        flex: 1,
        alignItems: "flex-start",
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    bottomContainerMain: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        width: "100%",
        textAlign: "center",
    },
    bottomSheetLeftContainer: {
        width: "40%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 20,
        backgroundColor: "transparent",
    },
    bottomSheetRightContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10,
    },
    filterTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        backgroundColor: "aliceblue",
        width: "100%",
        textAlign: "center",
        paddingVertical: 5,
        borderLeftWidth: 3,
        borderLeftColor: "#FF007F",
    },
    radioBtnContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
    },
    bottomSheetSortContainer: {
        width: "100%",
    },
    bottomSheetSortTitle: {
        width: "100%",
        borderBottomWidth: 1,
        borderTopColor: "#ccc",
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginVertical: 5,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        color: "#333",
    },
    sortsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sortRadioBtnContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    }



});