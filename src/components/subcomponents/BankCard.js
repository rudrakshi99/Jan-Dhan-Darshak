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
import { useSelector } from "react-redux";
import { deleteSavedLocation } from "../../https/Locations";

const BankCard = ({ imgUrl, name, branch, place_id }) => {
	console.log("place Id :", place_id);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.auth.user);
	async function handleDelete() {
		try {
			const accessToken = user.token;
			const id = 15;
			const data = await deleteSavedLocation({
				accessToken: accessToken,
				id: 15,
				place_id: place_id,
			});
			if (data?.success === true) {
				setLoading(false);
				Alert.alert("Successfully Deleted");
			}
		} catch (err) {
			console.log(err);
			Alert.alert("Error while Deleting, Retry");
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
					bottom: 20,
					right: 20,
				}}
				onPress={() => handleDelete()}
			>
				<Icon name="trash" size={25} color="#000" />
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
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		marginTop: 5,
	},
	bankImage: {
		marginRight: 28,
		height: 100,
		width: 100,
	},
	rightBox: {},
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
