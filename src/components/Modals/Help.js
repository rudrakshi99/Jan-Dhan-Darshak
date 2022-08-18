import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from "react-native";

import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import InputField from "../inputComponents/InputField";
import { AirbnbRating } from "react-native-ratings";
import RNPickerSelect from "react-native-picker-select";

import { createFeedback } from "../../https/feedback";
import VoiceToText from "../VoiceToText";

const Help = () => {
	return (
		<View>
			<VoiceToText />
		</View>
	);
};

export default Help;
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 24,
		marginTop: 28,
		marginBottom: 20,
		border: "1px solid black",
		position: "relative",
		height: "72%",
		backgroundColor: "#F1F1F1",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
	responseView: {
		display: "flex",
		top: 200,
		justifyContent: "center",
		alignItems: "center",
	},
	responseText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1a5e33",
	},
	inputLabel: {
		color: "#8E8E8E",
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 12,
	},
	borderGet: {
		borderWidth: 1,
		borderRadius: 4,
		width: "95%",
		marginLeft: 10,
	},
	marginGet: {
		paddingBottom: 0,
	},
	divider: {
		marginTop: 28,
		width: 1000,
		height: 4,
		backgroundColor: "#EAEAEA",
	},
	rating: {
		paddingBottom: "24px",
	},
	buttonBox: {
		position: "absolute",
		bottom: -70,
		height: 50,
		width: "100%",
		backgroundColor: "#292C31",
		borderRadius: 5,
	},
	button: {
		color: "#fff",
		textAlign: "center",
		padding: 12,
		fontSize: 17,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
});
