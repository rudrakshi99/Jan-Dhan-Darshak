import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import {
	useNavigation,
	useIsFocused,
	useRoute,
} from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { API_KEY } from "@env";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Directions() {
	const route = useRoute();
	const navigation = useNavigation();
	const params = route.params;
	const focused = useIsFocused();
	const [data, setData] = useState([]);
	const [mode, setMode] = useState("");
	const [coordinates, setCoordinates] = useState({
		coordinates: [
			{
				latitude: 28.862185,
				longitude: 81.911271,
				latitudeDelta: 0.04,
				longitudeDelta: 0.03,
			},
		],
	});
	const [location, setLocation] = useState({
		latitude: 28.862185,
		longitude: 81.911271,
		latitudeDelta: 0.05,
		longitudeDelta: 0.04,
	});
	useEffect(() => {
		async function getLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				setErrorMsg("Permission to access location was denied");
				return;
			}
			const location = await Location.getCurrentPositionAsync({});
			console.log(location);
			location.coords.latitudeDelta = 0.02;
			location.coords.longitudeDelta = 0.03;
			setLocation(location.coords);
		}
		getLocation();
	}, [focused]);
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 10,
					}}
				>
					<TouchableOpacity
						style={{ justifyContent: "center" }}
						onPress={() => navigation.goBack()}
					>
						<Icon name="arrow-left" size={30} color="#000" />
					</TouchableOpacity>
					<Text
						style={{
							fontSize: 20,
							marginLeft: 10,
							fontWeight: "600",
						}}
					>
						Directions
					</Text>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							justifyContent: "center",
							marginLeft: 5,
						}}
					>
						<Icon name="crosshairs-gps" size={22} color="black" />
						<Icon name="dots-vertical" size={22} color="black" />
						<Icon name="map-marker" size={22} color="black" />
					</View>
					<View
						style={{
							justifyContent: "space-between",
							marginLeft: 10,
						}}
					>
						<Text style={styles.locationText}>Your Location</Text>
						<Text style={styles.locationText}>
							{params.name.substring(0, 29)} ...
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => setMode("driving".toUpperCase())}
						style={[
							styles.directionType,
							{
								backgroundColor:
									mode == "DRIVING" ? "#C8CACB" : "white",
							},
						]}
					>
						<Icon
							name="car"
							size={30}
							color={mode == "DRIVING" ? "#8E8E8E" : "black"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setMode("bicycling".toUpperCase())}
						style={[
							styles.directionType,
							{
								backgroundColor:
									mode == "BICYCLING" ? "#C8CACB" : "white",
							},
						]}
					>
						<Icon
							name="motorbike"
							size={30}
							color={mode == "BICYCLING" ? "#8E8E8E" : "black"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setMode("transit".toUpperCase())}
						style={[
							styles.directionType,
							{
								backgroundColor:
									mode == "TRANSIT" ? "#C8CACB" : "white",
							},
						]}
					>
						<Icon
							name="subway-variant"
							size={30}
							color={mode == "TRANSIT" ? "#8E8E8E" : "black"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setMode("walking".toUpperCase())}
						style={[
							styles.directionType,
							{
								backgroundColor:
									mode == "WALKING" ? "#C8CACB" : "white",
							},
						]}
					>
						<Icon
							name="walk"
							size={30}
							color={mode == "WALKING" ? "#8E8E8E" : "black"}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					flex: 6,
					backgroundColor: "#fff",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<MapView
					style={styles.map}
					initialRegion={location}
					showsUserLocation={true}
					region={location}
					showsMyLocationButton={true}
					followsUserLocation={true}
					showsCompass={true}
					scrollEnabled={true}
					zoomEnabled={true}
					pitchEnabled={true}
					rotateEnabled={true}
				>
					<Marker
						title="my location"
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
					/>
					{coordinates !== [] && (
						<Marker
							coordinate={
								coordinates.coordinates[
									coordinates.coordinates.length - 1
								]
							}
						/>
					)}
					<MapViewDirections
						origin={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						destination={"place_id:" + params.place_id}
						apikey={API_KEY}
						strokeWidth={5}
						strokeColor="skyblue"
						optimizeWaypoints={true}
						mode={mode || "DRIVING"}
						onStart={() => {
							console.log("Started routing");
						}}
						onReady={(result) => {
							console.log(`Distance: ${result.distance} km`);
							console.log(`Duration: ${result.duration} min.`);
							console.log(result);
							setCoordinates(result);
						}}
						onError={(errorMessage) => {
							console.log(errorMessage);
						}}
					/>
				</MapView>
			</View>
			<View style={styles.footer}>
				<View style={styles.footerUpper}>
					<Text style={styles.distance}>
						{coordinates.duration?.toPrecision(2)} min
					</Text>
					<Text
						style={[
							styles.distance,
							{ color: "#8E8E8E", marginLeft: 10 },
						]}
					>
						({coordinates.distance?.toPrecision(2)} Km)
					</Text>
				</View>
				<View style={styles.footerLower}>
					<Text style={{ color: "#8E8E8E", marginVertical: 5 }}>
						Fastest route now due to traffic conditions
					</Text>
					<View style={{ flexDirection: "row", marginTop: 10 }}>
						<TouchableOpacity
							style={styles.navigationButton}
							onPress={() => {
								navigation.navigate("Navigate", {
									place_id: params.place_id,
									name: params.name,
								});
							}}
						>
							<Icon name="navigation" size={20} color="#fff" />
							<Text
								style={{
									color: "#fff",
									fontSize: 20,
									marginLeft: 5,
								}}
							>
								Start
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.navigationButton,
								{
									backgroundColor: "#fff",
									borderColor: "#000",
									borderWidth: 1,
									marginLeft: 10,
								},
							]}
							onPress={() => navigation.goBack()}
						>
							<Text style={{ color: "#000", fontSize: 20 }}>
								Go Back
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		flex: 1,
	},
	footer: {
		backgroundColor: "#fff",
		elevation: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	footerUpper: {
		flexDirection: "row",
		marginBottom: 0,
	},
	navigationButton: {
		backgroundColor: "#000",
		flexDirection: "row",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	locationText: {
		paddingRight: 80,
		paddingLeft: 20,
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: "#fff",
		marginLeft: 5,
		borderWidth: 1,
		borderColor: "#8E8E8E",
		marginVertical: 5,
		color: "#8E8E8E",
	},
	distance: {
		fontSize: 24,
		fontWeight: "500",
		color: "#000",
	},
	header: {
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 20,
		elevation: 5,
	},
	directionType: {
		paddingVertical: 6,
		paddingHorizontal: 30,
		borderRadius: 20,
		backgroundColor: "yellow",
	},
});

export default Directions;
