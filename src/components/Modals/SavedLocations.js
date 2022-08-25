import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getSavedLocations } from "../../https/Locations";
import BankCard from "../subcomponents/BankCard";
import HeaderCard from "../subcomponents/HeaderCard";
import { BASE_URL, API_KEY } from "@env";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import Loader from "../Loader";

// var results = [];

const SavedLocations = () => {
	const focused = useIsFocused();
	const navigation = useNavigation();
	const [savedLocations, setSavedLocations] = useState([]);
	const [results, setResults] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const [isLoading, setIsLoading] = useState(false);
	let savedRes = [];

	useEffect(() => {
		const isLoggedIn = async () => {
			const name = await SecureStore.getItemAsync("name");
			if (!name) {
				navigation.push("Login");
			}
		};
		isLoggedIn();
		const getLocations = async () => {
			setIsLoading(true);
			try {
				const accessToken = await SecureStore.getItemAsync(
					"accessToken"
				);
				const userId = await SecureStore.getItemAsync("userId");
				const data = await getSavedLocations({
					accessToken: accessToken,
					id: userId,
				});
				if (data?.success === true) {
					setSavedLocations(data.data);

					let promises = data.data.map((item) => {
						return axios
							.get(
								`${BASE_URL}maps/api/place/details/json?place_id=${item.place_id}&key=${API_KEY}`
							)
							.then((results) => {
								return results.data.result;
							});
					});
					Promise.all(promises).then(function (results) {
						setResults(results);
						console.log(results);
					});
					setIsLoading(false);
					console.log("Final Result", savedRes);
				}
			} catch (err) {
				console.log(err?.response?.data);
			}
		};

		// async function getSavedResults() {
		// 	try {
		// 		let promises = savedLocations.map((item) => {
		// 			return axios
		// 				.get(
		// 					`${BASE_URL}maps/api/place/details/json?place_id=${item.place_id}&key=${API_KEY}`
		// 				)
		// 				.then((results) => {
		// 					return results.data.result;
		// 				});
		// 		});
		// 		Promise.all(promises).then(function (results) {
		// 			setResults(results);
		// 			console.log(results);
		// 		});
		// 		setIsLoading(false);
		// 		console.log("Final Result", savedRes);
		// 	} catch (err) {
		// 		console.log(err);
		// 		setIsLoading(false);
		// 	}
		// }
		getLocations();
		// getSavedResults();
		setIsLoading(false);
		() => {};
	}, [focused]);

	return (
		<View style={styles.container}>
			<HeaderCard
				heading="Saved Locations"
				text="List of all your saved Financial Points"
			/>
			<View style={styles.divider}></View>
			{isLoading ? (
				<Loader />
			) : (
				<ScrollView>
					{results != [] ? (
						results.map((item, i) => {
							console.log("mapped Item", item);
							return (
								<BankCard
									key={i}
									imgUrl={{
										uri: item.photos
											? `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item?.photos[0]?.photo_reference}&key=${API_KEY}`
											: "https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg",
									}}
									name={item?.name}
									branch={`${item?.address_components[1]?.long_name} Branch`}
									place_id={item?.place_id}
								/>
							);
						})
					) : (
						<View>
							<Text className="">No locations saved !</Text>
						</View>
					)}
				</ScrollView>
			)}
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
