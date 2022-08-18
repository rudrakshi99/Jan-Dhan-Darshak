import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

import { getSavedLocations } from "../../https/Locations";
import BankCard from "../subcomponents/BankCard";
import HeaderCard from "../subcomponents/HeaderCard";
import { BASE_URL, API_KEY } from "@env";
import Loader from "../Loader";

const SavedLocations = () => {
	const focused = useIsFocused();
	const [savedLocations, setSavedLocations] = useState([]);
	const [loading, setLoading] = useState(false);
	let results = [];
	useEffect(() => {
		const getLocations = async () => {
			setLoading(true);
			try {
				const accessToken = await SecureStore.getItemAsync(
					"accessToken"
				);
				const data = await getSavedLocations({ accessToken, id });
				if (data?.success === true) {
					setSavedLocations(data.data);
				}
			} catch (err) {
				console.log(err?.response?.data);
			}
		};
		async function getSavedResults() {
			if (savedLocations.length > 0) {
				try {
					savedLocations.map(async (item) => {
						const { data } = await axios.get(
							`${BASE_URL}maps/api/place/details/json?place_id=${item.place_id}&key=${API_KEY}`
						);
						results.push(data.result);
						return;
					});
					setLoading(false);
				} catch (err) {
					console.log(err);
				}
			}
		}
		getLocations();
		getSavedResults();
	}, [focused]);

	return (
		<View style={styles.container}>
			<HeaderCard
				heading="Saved Locations"
				text="List of all your saved Financial Points"
			/>
			<View style={styles.divider}></View>
			<ScrollView>
				{results !== [] && !loading ? (
					results.map((item, i) => {
						return (
							<View key={i}>
								<BankCard
									imgUrl={{
										uri: `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0]?.photo_reference}&key=${API_KEY}`,
									}}
									name={item?.name}
									branch={`${item?.address_components[1]?.long_name} Branch`}
								/>
								<View style={styles.divider}></View>
							</View>
						);
					})
				) : (
					<Loader />
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	divider: {
		height: 4,
		backgroundColor: "#EAEAEA",
	},
});

export default SavedLocations;
