import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
    },
    splash: {
        backgroundColor: "#2C3539",
        color: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabsContainer: {
        backgroundColor: "#fff",
        height: 58,
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        color: "#626262",
        fontSize: 10,
        marginTop: 5
    },
});

export default styles;
