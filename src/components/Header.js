import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Dimensions,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { API_KEY, BASE_URL } from "@env";

import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import VoiceToText from "./VoiceToText";

const Header = ({
	title,
	subtitle,
	setResults,
	location,
	type,
	setFilter,
	filter,
}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const [search, setSearch] = useState("");
	const [visible, setVisible] = useState("");

	const [loaded] = useFonts({
		InterBold: require("../assets/fonts/Inter-Bold.otf"),
		InterRegular: require("../assets/fonts/Inter-Regular.otf"),
		InterLight: require("../assets/fonts/Inter-Light.otf"),
	});
	async function handleSearch() {
		try {
			const { data } = await axios.get(
				`${BASE_URL}maps/api/place/textsearch/json?query=${search}&location=${
					location.latitude
				},${location.longitude}&type=${type()}&key=${API_KEY}`
			);
			if (data != []) {
				setResults(data.results);
			} else {
				Alert.alert("No results found");
			}
		} catch (err) {
			console.log(err);
		}
	}
	async function getTextFromVoice() {
		try {
			const response = await axios.post("", {
				voice: "",
			});
			const { data } = response;
			setSearch(data);
		} catch (err) {
			console.log(err);
		}
	}
	if (!loaded) {
		return null;
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			style={{height: 200}}
		>
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<VoiceToText
					visible={visible}
					setVisible={setVisible}
					setSearch={setSearch}
				/>
				<TouchableOpacity
					style={styles.back}
					onPress={() => {
						if (route.name === "Find") {
							//Open Drawer Navigation
							navigation.openDrawer();
						} else {
							navigation.goBack();
						}
					}}
				>
					{route.name !== "Find" ? (
						<Svg
							width={35}
							height={25}
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							color="#101010"
						>
							<Path
								stroke="#000"
								strokeWidth={3}
								strokeLinecap="round"
								d="M2 7h22M1 6.586 6.586 1M7.071 12.657 1.414 7"
							/>
						</Svg>
					) : (
						<Svg
							width={32}
							height={20}
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<Path
								d="M1 1h30M1 10h30M1 19h30"
								stroke="#101010"
								strokeWidth={2}
								strokeLinecap="round"
							/>
						</Svg>
					)}
				</TouchableOpacity>
				{route.name === "Find" && (
					<Svg
						width={21}
						height={28}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<Path
							d="M9.204 27.37C6.349 23.85 0 15.32 0 10.528 0 4.713 4.7 0 10.5 0 16.297 0 21 4.713 21 10.527c0 4.792-6.398 13.324-9.204 16.844a1.65 1.65 0 0 1-2.592 0ZM10.5 14.037c1.93 0 3.5-1.573 3.5-3.509a3.508 3.508 0 0 0-3.5-3.509c-1.93 0-3.5 1.574-3.5 3.51 0 1.935 1.57 3.508 3.5 3.508Z"
							fill="#101010"
						/>
					</Svg>
				)}
				<View style={styles.headings}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>
				</View>
			</View>
			{route.name === "Find" ? (
				<View style={styles.filterWrapper}>
					<TextInput
						value={search}
						onChangeText={setSearch}
						style={styles.searchBar}
						placeholder="Search ATM near you"
					/>
					<Icon
						onPress={() => {
							setVisible(true);
						}}
						name="microphone"
						style={{ marginLeft: 5 }}
						size={30}
						color="black"
					/>
					<Icon
						onPress={() => {
							if (search !== "") {
								handleSearch();
							}
						}}
						name="magnify"
						style={{ marginLeft: 10 }}
						size={30}
						color="black"
					/>
				</View>
			) : null}
			{route.name === "Find" ? (
				<View style={styles.filterButtonGroup}>
					<TouchableOpacity
						style={[
							styles.filterButton,
							{
								backgroundColor: filter.relevance
									? "#E3ECF7"
									: "#fff",
							},
						]}
						onPress={() => {
							if (filter.relevance) {
								setFilter({ ...filter, relevance: false });
							} else {
								setFilter({ ...filter, relevance: true });
							}
						}}
					>
						<Text
							style={[
								styles.filterButtonText,
								{
									color: filter.relevance
										? "#2C81E0"
										: "#7C7C7C",
									marginRight: 3,
								},
							]}
						>
							Relevance
						</Text>
						{filter.relevance ? (
							<Icon name="close" color="#2C81E0" size={15} />
						) : null}
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.filterButton,
							{
								backgroundColor: filter.open_now
									? "#E3ECF7"
									: "#fff",
							},
						]}
						onPress={() => {
							if (filter.open_now) {
								setFilter({ ...filter, open_now: false });
							} else {
								setFilter({ ...filter, open_now: true });
							}
						}}
					>
						<Text
							style={[
								styles.filterButtonText,
								{
									color: filter.open_now
										? "#2C81E0"
										: "#7C7C7C",
									marginRight: 3,
								},
							]}
						>
							Open Now
						</Text>
						{filter.open_now ? (
							<Icon name="close" color="#2C81E0" size={15} />
						) : null}
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.filterButton,
							{
								backgroundColor: filter.distance
									? "#E3ECF7"
									: "#fff",
							},
						]}
						onPress={() => {
							if (filter.distance) {
								setFilter({ ...filter, distance: false });
							} else {
								setFilter({ ...filter, distance: true });
							}
						}}
					>
						<Text
							style={[
								styles.filterButtonText,
								{
									color: filter.distance
										? "#2C81E0"
										: "#7C7C7C",
									marginRight: 3,
								},
							]}
						>
							Distance
						</Text>
						{filter.distance ? (
							<Icon name="close" color="#2C81E0" size={15} />
						) : null}
					</TouchableOpacity>
				</View>
			) : null}
		</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#F9F9F9",
		width: Dimensions.get("window").width,
	},
	headerWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
	},
	filterWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	back: { flex: 1, marginLeft: 30 },
	headings: {
		flex: 5,
		marginLeft: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		fontFamily: "InterBold",
	},
	subtitle: { fontSize: 14, fontFamily: "InterLight" },
	searchBar: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderRadius: 10,
		backgroundColor: "#D9D9D9",
	},
	filterButtonGroup: {
		flexDirection: "row",
		paddingHorizontal: 30,
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
	filterButton: {
		paddingHorizontal: 12,
		paddingVertical: 5,
		borderRadius: 10,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "space-between",
	},
	filterButtonText: {
		color: "#7C7C7C",
		fontSize: 13,
	},
});

export default Header;
