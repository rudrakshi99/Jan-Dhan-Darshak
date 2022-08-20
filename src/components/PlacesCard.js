import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";
import { API_KEY, BASE_URL } from "@env";
import axios from "axios";
import DetailModal from "./DetailModal";
import { useNavigation } from "@react-navigation/native";

const PlaceCard = ({ item, location }) => {
	const [show, setShow] = useState(false);
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	function getDistance(lat2, lon2) {
		let lat1 = location.latitude;
		let lon1 = location.longitude;
		const R = 6371e3; // metres
		const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
		const φ2 = (lat2 * Math.PI) / 180;
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lon2 - lon1) * Math.PI) / 180;
		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c;
		return d / 1000;
	}
	async function getPlaceDetail(place_id) {
		const { data } = await axios.get(
			`${BASE_URL}maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}`
		);
		return data.result;
	}
	async function LaunchModal(place_id) {
		const result = await getPlaceDetail(place_id);
		console.log(result);
		setData(result);
		setShow(true);
	}
	return (
		<View
			style={{
				marginHorizontal: 6,
				backgroundColor: "#fff",
				borderRadius: 10,
				padding: 12,
				elevation: 5,
			}}
		>
			{show ? (
				<DetailModal item={data} show={show} setShow={setShow} />
			) : null}
			<View style={styles.resultItemContainer}>
				{item.photos ? (
					<Image
						source={{
							uri: `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0]?.photo_reference}&key=${API_KEY}`,
						}}
						style={styles.resultItemImage}
					/>
				) : (
					<Image
						source={require("../assets/images/not-found.jpg")}
						style={styles.resultItemImage}
					/>
				)}
				<View style={{ marginLeft: 25 }}>
					<Text style={styles.name}>
						{item.name.substring(0, 25)}...
					</Text>
					<Text style={styles.branch}>Branch name</Text>
					<Text style={styles.distance}>
						{getDistance(
							item.geometry.location.lat,
							item.geometry.location.lng
						).toPrecision(2)}{" "}
						KM Away
					</Text>
					<Text
						style={[
							styles.openStatus,
							item.opening_hours?.open_now
								? { color: "#34994C" }
								: { color: "#DB0E0E" },
						]}
					>
						{item.opening_hours?.open_now
							? "Open Now"
							: "Closed Now"}
					</Text>
				</View>
			</View>
			<View style={{ backgroundColor: "#FFFFFF", flexDirection: "row" }}>
				<TouchableOpacity
					style={styles.directionButton}
					onPress={() => {
						navigation.navigate("Directions", {
							latitude: item.geometry.location.lat,
							longitude: item.geometry.location.lng,
							place_id: item.place_id,
							name: item.name,
						});
					}}
				>
					<Image
						source={require("../assets/icons/direction.png")}
						style={{ height: 15, width: 15 }}
					/>
					<Text
						style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}
					>
						Directions
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.directionButton,
						{
							marginLeft: 10,
							backgroundColor: "#fff",
							borderColor: "#2C81E0",
							borderWidth: 1,
						},
					]}
					onPress={() => {
						LaunchModal(item.place_id);
					}}
				>
					<Text
						style={{
							color: "#2C81E0",
							fontSize: 15,
						}}
					>
						View Details
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	resultItemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	name: {
		fontSize: 18,
		fontWeight: "700",
		color: "#000",
		marginBottom: 3,
		width: Dimensions.get("window").width / 2.5,
	},
	branch: {
		fontSize: 14,
		fontWeight: "400",
		color: "#8E8E8E",
		marginBottom: 3,
	},
	distance: {
		fontSize: 14,
		fontWeight: "400",
		color: "#8E8E8E",
		marginBottom: 3,
	},
	openStatus: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 3,
	},
	directionButton: {
		backgroundColor: "#2C81E0",
		borderRadius: 30,
		flex: 1,
		flexDirection: "row",
		paddingVertical: 8,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	resultItemImage: {
		height: 100,
		width: 100,
		borderRadius: 15,
	},
});

export default PlaceCard;
