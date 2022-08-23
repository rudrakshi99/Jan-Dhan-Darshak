import React from "react";
import { View, StyleSheet } from "react-native";

function ListModal() {
	return <View></View>;
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get("window").width,
		backgroundColor: "#fff",
		// paddingVertical: 30,
		position: "absolute",
		bottom: 0,
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 60,
		height: Dimensions.get("window").height / 2,
	},
});

export default ListModal;
