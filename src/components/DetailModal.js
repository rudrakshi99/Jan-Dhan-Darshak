import React, { useState, useEffect } from "react";
import {
	View,
	Platform,
	TouchableOpacity,
	Text,
	Modal,
	Dimensions,
	StyleSheet,
	Image,
	ScrollView,
	Share,
	Alert,
	Linking,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { ArrowNarrowDownIcon } from "react-native-heroicons/outline";
import { BASE_URL, API_KEY } from "@env";
import { TabView, SceneMap } from "react-native-tab-view";
import { createSavedLocation } from "../https/Locations";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { flashMessage } from "../lottie/flashMessage";

const DetailModal = ({ show, setShow, item }) => {
	const [index, setIndex] = useState(0);
	const navigation = useNavigation();
	const [routes] = useState([
		{ key: "first", title: "Overview" },
		{ key: "second", title: "Reviews" },
	]);
	const user = useSelector((state) => state.auth.user);
	console.log(user);

	async function share(name) {
		try {
			const result = await Share.share({
				message: `Hey, I wan to share this location of ${name}, Click on the link to view it. \n https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
				title: "I am sharing this location with you",
				url: `https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	}
	async function handleSaveLocation(place_id) {
		try {
			const accessToken = await SecureStore.getItemAsync("accessToken");
			const userId = await SecureStore.getItemAsync("userId");
			if (!!accessToken) {
				// navigation.navigate("Login", {
				// 	to: "Detail",
				// 	place_id: place_id,
				// });
			}
			const result = await createSavedLocation({
				accessToken: accessToken,
				place_id: place_id,
				User: userId,
			});
			if (result.success) {
				flashMessage(result?.message, 'success');
				Alert.alert(result.message);
			}
			console.log(result);
		} catch (err) {
			console.log(err);
			flashMessage(err?.response?.data, 'success');
		}
	}

	function handleFeedback({ name, financial_type, location, place_id }) {
		navigation.navigate("Feedback", {
			name: name,
			financial_type: financial_type,
			location: location,
			place_id: place_id,
		});
	}

	const FirstRoute = () => {
		const [expand, setExpand] = useState(false);
		return (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#EAEAEA",
				}}
			>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 5,
					}}
				>
					<Image
						source={require("../assets/icons/marker.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "400",
							marginLeft: 10,
						}}
					>
						{item?.formatted_address}
					</Text>
				</View>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "flex-start",
						marginBottom: 5,
					}}
				>
					<Image
						source={require("../assets/icons/clock.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					{expand ? (
						<View>
							{item?.opening_hours.weekday_text.map((item, i) => {
								return (
									<Text
										style={{ marginLeft: 10, fontSize: 16 }}
										key={i}
									>
										{item}
									</Text>
								);
							})}
						</View>
					) : (
						<Text
							style={{
								fontSize: 16,
								fontWeight: "400",
								marginLeft: 10,
							}}
						>
							Monday : 10AM to 6PM
						</Text>
					)}
					<TouchableOpacity
						onPress={() => {
							setExpand((prev) => !prev);
						}}
					>
						<ArrowNarrowDownIcon
							style={{ marginLeft: 10 }}
							size={20}
							color="#2C81E0"
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../assets/icons/clock.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "400",
							marginLeft: 10,
						}}
					>
						Write a review...
					</Text>
				</View>
			</ScrollView>
		);
	};

	const SecondRoute = () => (
		<ScrollView style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
			<View style={styles.reviewContainer}>
				<View>
					<Text style={styles.reviewTitle}>User Reviews</Text>
					<View style={styles.rating}>
						<Text
							style={{
								fontSize: 60,
								marginRight: 10,
								fontWeight: "600",
							}}
						>
							{item?.rating}
						</Text>
						<Icon name="star" size={40} color="#FF9900" />
					</View>
				</View>
				<View></View>
			</View>
			<View
				style={{
					backgroundColor: "#fff",
					paddingHorizontal: 30,
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: "600" }}>
					Top Reviews
				</Text>
			</View>
			<View style={{}}>
				{item?.reviews ? (
					item?.reviews?.map((review, i) => {
						return (
							<View
								key={i}
								style={{
									paddingHorizontal: 30,
									marginBottom: 10,
									backgroundColor: "#fff",
									paddingVertical: 20,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Image
										source={{
											uri: review.profile_photo_url,
										}}
										style={{ width: 40, height: 40 }}
									/>
									<View style={{ marginLeft: 10 }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "600",
											}}
										>
											{review.author_name}
										</Text>
										<Text
											style={{
												color: "#101010",
												fontSize: 14,
											}}
										>
											{review.relative_time_description}
										</Text>
									</View>
								</View>
								<Text style={{ marginTop: 10 }}>
									{review.text}
								</Text>
							</View>
						);
					})
				) : (
					<View
						style={{ paddingVertical: 20, backgroundColor: "#fff" }}
					>
						<Text
							style={{
								fontSize: 18,
								textAlign: "center",
								fontWeight: "600",
								fontStyle: "italic",
							}}
						>
							No reviews made..
						</Text>
					</View>
				)}
			</View>
		</ScrollView>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	return (
		<Modal
			animationType="slide"
			visible={show}
			transparent
			onRequestClose={() => {
				setShow(false);
			}}
		>
			<View style={styles.container}>
				{item?.photos ? (
					<Image
						source={{
							uri: `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item?.photos[0]?.photo_reference}&key=${API_KEY}`,
						}}
						style={styles.image}
					/>
				) : (
					<Image
						source={require("../assets/images/not-found.jpg")}
						style={styles.image}
					/>
				)}
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => setShow(false)}
				>
					<Icon name="keyboard-backspace" size={25} color="black" />
				</TouchableOpacity>
				<View style={styles.detailContainer}>
					<View style={[{ paddingHorizontal: 30 }]}>
						<View style={styles.headContainer}>
							<View>
								<Text style={styles.name}>{item?.name}</Text>
								<Text style={styles.id}>
									Place ID : #{item?.place_id.toUpperCase().substr(0,12)}
								</Text>
							</View>
							<Text
								style={[
									styles.openStatus,
									item?.opening_hours?.open_now
										? { color: "#34994C" }
										: { color: "#DB0E0E" },
								]}
							>
								{item?.opening_hours?.open_now
									? "Open Now"
									: "Closed Now"}
							</Text>
						</View>

						<View style={styles.buttonRow}>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[
										styles.optionButton,
										{ backgroundColor: "#2C81E0" },
									]}
									onPress={() => {
										navigation.navigate("Directions", {
											name: item?.name,
											place_id: item?.place_id,
										});
									}}
								>
									<Image
										source={require("../assets/icons/direction.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>
									Directions
								</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() => {
										item.international_phone_number
											? Linking.openURL(
													`tel:${item.international_phone_number}`
											  )
											: Alert.alert("No Phone Avaialble");
									}}
								>
									<Image
										source={require("../assets/icons/call.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>Call</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() => {
										share(item?.name);
									}}
								>
									<Image
										source={require("../assets/icons/share_outlined.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>Share</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() =>
										handleSaveLocation(item?.place_id)
									}
								>
									<Image
										source={require("../assets/icons/save.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>Save</Text>
							</View>
						</View>
					</View>

					<TabView
						navigationState={{ index, routes }}
						renderScene={renderScene}
						onIndexChange={setIndex}
						initialLayout={{
							width: Dimensions.get("window").width,
						}}
						indicatorContainerStyle={{ backgroundColor: "white" }}
						inactiveColor="#fff"
					/>
					<View style={styles.floatingButtonContainer}>
						<TouchableOpacity
							style={styles.floatingButton}
							onPress={() =>
								handleFeedback({
									name: item?.name,
									place_id: item?.place_id,
									location: item?.formatted_address,
									financial_type: item.type
										? item.type[0]
										: null,
								})
							}
						>
							<Image
								source={require("../assets/icons/feedback.png")}
								style={styles.floatingButtonImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								marginTop: 10,
							}}
						>
							Feedback
						</Text>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get("window").width,
		backgroundColor: "#fff",
		// paddingVertical: 30,
		position: "absolute",
		bottom: -30,
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 60,
		height: Dimensions.get("window").height + 30,
	},
	headContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	detailContainer: {
		backgroundColor: "#fff",
		height: Dimensions.get("window").height / 1.3,
		paddingVertical: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		elevation: 5,
		transform: [{ translateY: 0 }],
	},
	image: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 4,
	},
	name: {
		fontSize: 20,
		fontWeight: "700",
		width: Dimensions.get("window").width / 2,
	},
	id: {
		color: "#101010",
		fontSize: 14,
	},
	openStatus: {
		fontSize: 18,
		fontWeight: "500",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
	},
	optionVector: {
		height: 24,
		width: 24,
	},
	optionButton: {
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 5,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 14,
		fontWeight: "500",
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	reviewContainer: {
		backgroundColor: "#fff",
		paddingVertical: 20,
		paddingHorizontal: 30,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 0,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	reviewTitle: {
		fontSize: 20,
		fontWeight: "700",
	},
	floatingButtonContainer: {
		position: "absolute",
		bottom: 45,
		right: 25,
		backgroundColor: "white",
		borderTopLeftRadius: 99,
		borderTopRightRadius: 99,
		padding: 10,
	},
	floatingButton: {
		backgroundColor: "#fff",
		borderRadius: 99,
		padding: 20,
		elevation: 10,
	},
	floatingButtonImage: {
		height: 30,
		width: 30,
	},
	backButton: {
		backgroundColor: "#fff",
		borderRadius: 99,
		padding: 10,
		position: "absolute",
		top: 10,
		left: 10,
		elevation: 5,
	},
});

export default DetailModal;
