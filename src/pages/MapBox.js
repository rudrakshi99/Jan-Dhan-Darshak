import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	FlatList,
	Platform,
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
	const [show, setShow] = useState(false);
	const [type, setType] = useState(initialState);
	const [results, setResults] = useState([]);
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	function generateString() {
		if (type.atm) return "atm";
		if (type.bank) return "bank";
		if (type.crc) return "crc";
		if (type.bankMitra) return "bank%20mitra";
		else return "post%20office";
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

	return (
		<View style={style.container}>
			<Header
				title="Location"
				setResults={setResults}
				subtitle="Current Address of the User"
				location={location}
				type={generateString}
			/>
			<Map markers={results} />
			{results !== [] ? (
				<FlatList
					data={results}
					horizontal={true}
					style={styles.resultContainer}
					snapToAlignment="start"
					snapToInterval={100}
					contentContainerStyle={{ paddingVertical: 10 }}
					renderItem={({ item, index }) => {
						return (
							<PlaceCard
								key={index}
								item={item}
								location={location}
							/>
						);
					}}
				/>
			) : (
				<View></View>
			)}
			<View style={style.tabsContainer}>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, atm: true });
					}}
					style={[type.atm ? styles.button : {}, styles.column]}
				>
					<Icon name="headphones" size={22} color="#8E8E8E" />
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
						style={{ height: 24, width: 24 }}
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
						style={{ height: 24, width: 24 }}
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
						style={{ height: 24, width: 24 }}
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
						style={{ height: 24, width: 24 }}
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
	column: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MapBox;
