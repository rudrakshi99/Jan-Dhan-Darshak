import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Alert,
	Modal,
	Pressable,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HeaderCard from "../subcomponents/HeaderCard";
import * as Location from "expo-location";
import axios from "axios";
import { BASE_URL, API_KEY } from "@env";
import InputField from "../inputComponents/InputField";
import { useNavigation } from "@react-navigation/native";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { createSuggestion } from "../../https/suggestions";
import * as SecureStore from "expo-secure-store";
import MapView, { Marker } from "react-native-maps";

const MissingBankSuggestion = () => {
	const [latlon, setLatlon] = useState({
		latitude: 28.614788,
		longitude: 77.359662,
	});

	const [location, setLocation] = useState({
		latitude: 28.614788,
		longitude: 77.359662,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const [confirmLocation, setConfirmLocation] = useState(false);
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");

	const focused = useIsFocused();
	const [modalVisible, setModalVisible] = useState(false);
	const [address, setAddress] = useState(
		"B-47 Sector C, Aliganj, Lucknow, Uttar Pradesh, India"
	);
	const [locationObj, setLocationObj] = useState({
		latitude: 0.0,
		longitude: 0.0,
	});
	const navigation = useNavigation();
	const [userId, setUserId] = useState("");
	const [accessToken, setAccessToken] = useState("");

	async function getGeocodedAddress() {
		const location = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = location.coords;
		setLocationObj({
			latitude: latitude,
			longitude: longitude,
		});
		setLocation({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.03,
			longitudeDelta: 0.04,
		});
		setLatlon(latitude, longitude);
		console.log("Location -->", location);
		const result = await axios.get(
			`${BASE_URL}maps/api/geocode/json?latlng=${
				locationObj.latitude + "," + locationObj.longitude
			}&key=${API_KEY}`
		);
		console.log(result.data.results[0].formatted_address);
		setAddress(result.data.results[0].formatted_address);
	}
	useEffect(() => {
		async function getUserData() {
			setAccessToken(await SecureStore.getItemAsync("accessToken"));
			setUserId(await SecureStore.getItemAsync("userId"));
		}
		getGeocodedAddress();
		getUserData();
	}, [focused]);

	const handleRegionChange = () => {
		setLatlon({
			latitude: location.latitude,
			longitude: location.longitude,
		});
	};
	const handleFormChange = async () => {
		try {
			console.log(userId, accessToken);
			const data = await createSuggestion(accessToken, {
				User: parseInt(userId),
				pointName: name,
				address: address,
				otherdetails: details,
				latitude: locationObj.latitude,
				longitude: locationObj.longitude,
			});
			console.log(data, "data");
			if (data?.success === true) {
				setModalVisible(true);
			}
		} catch (err) {
			console.log(err?.response?.data);
		}
	};
	return (
		<View>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<CheckCircleIcon color="#34994C" />
							<Text style={styles.modalText}>Submitted</Text>
							<Text style={styles.modalSubText}>
								Thank you for filling out the Form.
							</Text>
							{/* <Text style={styles.trackID}>
                                Track ID: 4855682
                            </Text> */}
							<View style={styles.modalButtons}>
								<Pressable
									style={[styles.button, styles.trackButton]}
								>
									<Text style={styles.trackstyle}>
										Track Request
									</Text>
								</Pressable>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() =>
										setModalVisible(!modalVisible)
									}
								>
									<Text style={styles.textStyle}>OK</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			</View>
			{!confirmLocation ? (
				<View style={styles.container}>
					<HeaderCard
						heading="Suggestion"
						text="Suggest Missing Bank or FInancial Points"
					/>
					<View style={styles.mapper}>
						<View style={mapstyles.mappercontainer}>
							<MapView
								style={mapstyles.mapmark}
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
								showsTraffic={true}
								onRegionChangeComplete={handleRegionChange}
							>
								<Marker
									draggable
									coordinate={latlon}
									title={"Hold and Drag Me"}
									icon={
										"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png"
									}
									onDragEnd={(e) => {
										setLatlon(e.nativeEvent.coordinate);
										console.log(latlon);
									}}
								/>
							</MapView>
						</View>
					</View>
					<View style={styles.bottomBox}>
						<View style={styles.locationBox}>
							<Text style={styles.locationText}>
								Select Location
							</Text>
							<Text style={styles.locationText}>Step 1/2</Text>
						</View>

						<View style={styles.locationBox}>
							<Text style={styles.address}>{address}</Text>
							<TouchableOpacity style={styles.changeBtn}>
								<Text style={styles.changeText}>Change</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							onPress={() => {
								setConfirmLocation(!confirmLocation);
							}}
							style={styles.buttonBox}
						>
							<Text style={styles.button}>Confirm Location</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<ScrollView>
					<View>
						<View style={styles.mapper2}>
							<MapView
								style={mapstyles.mapmark}
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
								showsTraffic={true}
								onRegionChangeComplete={handleRegionChange}
							>
								<Marker
									coordinate={latlon}
									title={"Hold and Drag Me"}
									icon={
										"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png"
									}
								/>
							</MapView>
						</View>
						<View style={styles.missingform}>
							<View style={styles.formTopText}>
								<Text style={styles.missingformtext}>
									Fill the Details
								</Text>
								<Text style={styles.missingformtext}>
									Step 2/2
								</Text>
							</View>
							<View style={styles.selectPoint}>
								<TouchableOpacity
									onPress={() => {
										setConfirmLocation(!confirmLocation);
									}}
								>
									<Text style={styles.textSelectPoint}>
										Select a Financial Point{" "}
										<Text style={styles.downarrow}>⌄</Text>
									</Text>
								</TouchableOpacity>
							</View>
							<InputField
								onChangeText={(e) => {
									setName(e);
								}}
								inputname="Enter Name"
								name="name"
								placeholder="Full name of the location"
							/>
							<InputField
								onChangeText={(e) => {
									setAddress(e);
								}}
								inputname="Address"
								name="address"
								value={address}
								placeholder="Address of the Financial Point"
							/>
							<InputField
								onChangeText={(e) => {
									setDetails(e);
								}}
								multi={true}
								inputname="Other Details (Optional)"
								name="name"
								placeholder="provide any additional information..."
							/>
							<TouchableOpacity
								onPress={handleFormChange}
								style={styles.formSubmit}
							>
								<Text style={styles.button}>
									Confirm Location
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mapper: {
		height: Dimensions.get("window").height * 0.6,
	},
	mapper2: {
		height: Dimensions.get("window").height * 0.2,
	},
	container: {
		flex: 1,
	},
	bottomBox: {
		position: "absolute",
		top: Dimensions.get("window").height * 0.65,
		marginVertical: 26,
		paddingHorizontal: 15,
		backgroundColor: "#F9F9F9",
		height: Dimensions.get("window").height * 0.3,
		width: Dimensions.get("window").width,
		boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.12)",
	},
	locationBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 18,
	},
	locationText: {
		fontSize: 18,
		color: "#8E8E8E",
		fontWeight: "400",
	},
	address: {
		fontSize: 18,
		fontWeight: "600",
		textAlign: "justify",
		color: "#101010",
		paddingRight: 20,
		width: Dimensions.get("window").width / 1.5,
	},
	changeBtn: {
		borderColor: "#292C31",
		borderWidth: 1,
		borderRadius: 4,
	},
	changeText: {
		paddingVertical: 13,
		paddingHorizontal: 22,
		fontSize: 15,
		fontWeight: "500",
		color: "#292C31",
	},
	buttonBox: {
		position: "absolute",
		bottom: 0,
		marginBottom: 25,
		marginHorizontal: 20,
		width: Dimensions.get("window").width * 0.8,
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
	innerContainer: {
		width: Dimensions.get("window").width,
		flex: 1,
	},

	missingform: {
		width: "85%",
		marginHorizontal: "7.5%",
		marginVertical: 20,
		height: "100%",
	},
	missingformtext: {
		color: "#8E8E8E",
		fontSize: 14,
		fontWeight: "700",
		paddingBottom: 10,
	},
	selectPoint: {
		color: "#8E8E8E",
		fontSize: 14,
		borderWidth: 1,
		borderColor: "#2C81E0",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		marginBottom: 10,
	},
	textSelectPoint: {
		color: "#2C81E0",
		paddingTop: 5,
		paddingBottom: 15,
	},
	downarrow: {
		fontSize: 24,
		color: "#2C81E0",
	},
	formSubmit: {
		height: 50,
		width: "100%",
		backgroundColor: "#292C31",
		borderRadius: 5,
	},
	formTopText: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		marginVertical: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	buttonClose: {
		backgroundColor: "#292C31",
		borderRadius: 4,
		marginHorizontal: 10,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 5,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
	},
	modalSubText: {
		marginBottom: 5,
		textAlign: "center",
		fontSize: 12,
	},
	trackID: {
		marginBottom: 15,
		fontSize: 14,
		fontWeight: "bold",
	},
	modalButtons: {
		display: "flex",
		flexDirection: "row",
	},
	trackButton: {
		fontSize: 14,
		backgroundColor: "#fff",
		borderRadius: 4,
		borderWidth: 1,
		marginHorizontal: 10,
	},
	trackstyle: {
		color: "#101010",
		fontWeight: "bold",
		textAlign: "center",
	},
});
//create our styling code:
const mapstyles = StyleSheet.create({
	mappercontainer: {
		...StyleSheet.absoluteFillObject,
		height: Dimensions.get("window").height,
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	mapmark: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		flex: 1,
	},
});

export default MissingBankSuggestion;
