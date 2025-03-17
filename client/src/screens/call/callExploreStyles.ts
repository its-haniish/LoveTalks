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
        textTransform: "capitalize",
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
    filtersContaniner: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    filterTitleContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",

    },
    filtersNameContainer: {
        width: "40%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 20,
        backgroundColor: "transparent",
    },
    filtersRasioBtnsContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10,
    },
    filterName: {
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
    sortingContainer: {
        width: "100%",
    },
    sortAndFilterTitle: {
        paddingBottom: 10,
        marginVertical: 5,
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
    },
    removeFiltersBtn: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FF007F",
        backgroundColor: "aliceblue",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    }
});