import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { deleteSavedLocation } from "../../https/Locations";
import * as SecureStore from "expo-secure-store";
import { flashMessage } from "../../lottie/flashMessage";

const BankCard = ({ imgUrl, name, branch, place_id }) => {
	console.log("place Id :", place_id);
	const [isLoading, setIsLoading] = useState(false);

	async function handleDelete() {
		try {
			setIsLoading(true);
			const accessToken = await SecureStore.getItemAsync("accessToken");
			const userId = await SecureStore.getItemAsync("userId");
			const data = await deleteSavedLocation({
				accessToken: accessToken,
				id: userId,
				place_id: place_id,
			});
			if (data?.success === true) {
				flashMessage(data?.message, "success");
			}
		} catch (err) {
			console.log(err);
			flashMessage(err?.response?.data, "danger");
		} finally {
			setIsLoading(false);
		}
	}
	console.log(imgUrl, name, branch);
	return (
		<View style={styles.bankBox}>
			<Image
				style={styles.bankImage}
				source={imgUrl}
				resizeMode="cover"
			/>

			<View style={styles.rightBox}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.branch}>{branch}</Text>
				<Text>
					<Text style={styles.time1}>Open Now</Text> .{" "}
					<Text style={styles.time2}>Closes in 2 hours</Text>
				</Text>
			</View>
			<TouchableOpacity
				style={{
					position: "absolute",
					bottom: 10,
					right: 15,
				}}
				onPress={() => handleDelete()}
			>
				<Icon name="trash" size={24} color="#000" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	bankBox: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 20,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		marginTop: 5,
	},
	bankImage: {
		marginRight: 28,
		height: 100,
		width: 100,
	},
	rightBox: {
		marginLeft: -10,
		width: 200,
	},
	name: {
		fontSize: 17,
		lineHeight: 17,
		color: "#101010",
		fontWeight: "600",
	},
	branch: {
		color: "#8E8E8E",
		marginTop: 2,
		fontSize: 14.5,
		fontWeight: "400",
		width: Dimensions.get("window").width / 2,
	},
	time1: {
		color: "#34994C",
		fontSize: 14.6,
		fontWeight: "500",
	},
	time2: {
		color: "#8E8E8E",
		fontSize: 14.6,
		fontWeight: "500",
	},
});

export default BankCard;
