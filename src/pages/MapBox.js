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
					style={type.atm ? styles.button : {}}
				>
					<Text style={style.buttonText}>ATM</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, bank: true });
					}}
					style={type.bank ? styles.button : {}}
				>
					<Text style={style.buttonText}>Branch</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, postOffice: true });
					}}
					style={type.postOffice ? styles.button : {}}
				>
					<Text style={style.buttonText}>Post Office</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, crc: true });
					}}
					style={type.crc ? styles.button : {}}
				>
					<Text style={style.buttonText}>CRC</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setType({ ...initialState, bankMitra: true });
					}}
					style={type.bankMitra ? styles.button : {}}
				>
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
});

export default MapBox;
