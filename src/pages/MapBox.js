import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	FlatList,
	Platform,
	Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

//Components
import Map from "../components/Map";

import style from "../styles/styles";
import Header from "../components/Header";
import axios from "axios";

import { BASE_URL, API_KEY } from "@env";
import PlaceCard from "../components/PlacesCard";

const MapBox = () => {
	const focused = useIsFocused();
	const initialState = {
		atm: false,
		bank: false,
		postOffice: false,
		crc: false,
		bankMitra: false,
	};
	const filters = {
		relevance: false,
		open_now: false,
		distance: false,
	};
	const [filter, setFilter] = useState(filters);
	const [show, setShow] = useState(false);
	const [type, setType] = useState(initialState);
	const [results, setResults] = useState([]);
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [horizontal, setHorizontal] = useState(true);
	function generateString() {
		if (type.atm) return "atm";
		if (type.bank) return "bank";
		if (type.crc) return "crc";
		if (type.bankMitra) return "bank%20mitra";
		else return "post%20office";
	}
	function generateFilter() {
		let filter = "";
		if (filter.relevance) {
			filter += `&rankby=prominence`;
		} else if (filter.open_now) {
			filter += `&opennow`;
		} else if (filter.distance) {
			filter += `&rankby=distance`;
		} else {
		}
		return filter;
	}
	useEffect(() => {
		async function getLocation() {
			const { coords } = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: coords.latitude,
				longitude: coords.longitude,
			});
		}
		async function getResults() {
			try {
				const location = await Location.getCurrentPositionAsync({});
				const response = await axios.get(
					`${BASE_URL}maps/api/place/nearbysearch/json?location=${
						location.coords.latitude
					},${
						location.coords.longitude
					}&radius=1500&type=${generateString()}&keyword=${generateString()}&key=${API_KEY}`
				);
				setResults(response.data.results);
			} catch (err) {
				console.log(err);
			}
		}
		getLocation();
		getResults();
		return () => {
			setResults([]);
			setLocation({}); // This worked for me
		};
	}, [type, focused]);

	function handleList() {
		setHorizontal((prev) => !prev);
	}

	return (
		<View style={style.container}>
			<Header
				title="Location"
				setResults={setResults}
				subtitle="Current Address of the User"
				location={location}
				type={generateString}
				setFilter={setFilter}
				filter={filter}
			/>
			<Map markers={results} />
			<TouchableOpacity
				style={[
					styles.viewList,
					{
						bottom: horizontal
							? 300
							: Dimensions.get("screen").height / 1.8,
					},
				]}
				onPress={() => {
					handleList();
				}}
			>
				<Image
					source={require("../assets/icons/dotted_hamburger.png")}
					resizeMode="contain"
					style={{ height: 20, width: 20 }}
				/>
				<Text
					style={{
						marginLeft: 6,
						color: "#2C81E0",
						fontWeight: "600",
					}}
				>
					{`${horizontal ? "View" : "Hide"} List`}
				</Text>
			</TouchableOpacity>
			<View
				style={
					horizontal
						? styles.resultContainer
						: styles.resultContainerVertical
				}
			>
				{results !== [] ? (
					<FlatList
						data={results}
						horizontal={horizontal}
						// style={styles.resultContainer}
						snapToAlignment="start"
						snapToInterval={horizontal ? 100 : 0}
						contentContainerStyle={[
							horizontal
								? styles.horizontalList
								: styles.verticalList,
							{ paddingVertical: 5 },
						]}
						renderItem={({ item, index }) => {
							return (
								<PlaceCard
									key={index}
									item={item}
									location={location}
									horizontal={horizontal}
								/>
							);
						}}
					/>
				) : (
					<View></View>
				)}
			</View>
			<View style={style.tabsContainer}>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, atm: true });
					}}
					style={[type.atm ? styles.button : {}, styles.column]}
				>
					<Image
						source={require("../assets/icons/atm.png")}
						resizeMode="contain"
						style={{ height: 20, width: 20 }}
					/>
					<Text style={style.buttonText}>ATM</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, bank: true });
					}}
					style={[type.bank ? styles.button : {}, styles.column]}
				>
					{/* <Icon name="building-columns" size={25} color="#8E8E8E" /> */}
					<Image
						source={require("../assets/icons/bank.png")}
						resizeMode="contain"
						style={{ height: 20, width: 20 }}
					/>
					<Text style={style.buttonText}>Branch</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, postOffice: true });
					}}
					style={[
						type.postOffice ? styles.button : {},
						styles.column,
					]}
				>
					<Image
						source={require("../assets/icons/post_office.png")}
						resizeMode="contain"
						style={{ height: 20, width: 20 }}
					/>
					<Text style={style.buttonText}>Post Office</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, crc: true });
					}}
					style={[type.crc ? styles.button : {}, styles.column]}
				>
					<Image
						source={require("../assets/icons/csc.png")}
						resizeMode="contain"
						style={{ height: 20, width: 20 }}
					/>
					<Text style={style.buttonText}>CRC</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, bankMitra: true });
					}}
					style={[type.bankMitra ? styles.button : {}, styles.column]}
				>
					<Image
						source={require("../assets/icons/bank_mitra.png")}
						resizeMode="contain"
						style={{ height: 20, width: 20 }}
					/>
					<Text style={style.buttonText}>Bank Mitra</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#ECECEC",
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 10,
		fontWeight: "bold",
	},
	resultContainer: {
		position: "absolute",
		bottom: 70,
		paddingHorizontal: 10,
		flex: 1,
		paddingVertical: 10,
	},
	resultContainerVertical: {
		position: "absolute",
		bottom: 50,
		paddingHorizontal: 10,
		flex: 1,
		paddingVertical: 10,
		height: Dimensions.get("screen").height / 2,
	},
	column: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	viewList: {
		// justifyContent: "center",
		// alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 15,
		backgroundColor: "white",
		flexDirection: "row",
		position: "absolute",
		bottom: 300,
		right: 10,
		borderRadius: 10,
		elevation: 5,
	},
	verticalList: {
		// height: Dimensions.get("screen").height / 2,
		marginBottom: -20,
	},
});

export default MapBox;
