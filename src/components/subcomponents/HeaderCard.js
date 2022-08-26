import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";

const HeaderCard = ({ heading, text }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.innerContainer}>
			<TouchableOpacity onPress={() => navigation.navigate("Find")}>
				<ArrowNarrowLeftIcon
					style={styles.iconHeader}
					size={30}
					color="#101010"
				/>
			</TouchableOpacity>
			<View style={styles.headingBox}>
				<Text style={styles.heading}>{heading}</Text>
				<Text style={styles.smallDesc}>{text}</Text>
			</View>
			<Text></Text>
		</View>
	);
};

const styles = StyleSheet.create({
	innerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		height: 150,
		backgroundColor: "#F9F9F9",
		boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.12)",
		paddingTop: 30,
	},
	headingBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	heading: {
		fontSize: 26,
		fontWeight: "600",
		color: "#101010",
		paddingBottom: 5,
	},
	smallDesc: {
		color: "#101010",
	},
});

export default HeaderCard;
