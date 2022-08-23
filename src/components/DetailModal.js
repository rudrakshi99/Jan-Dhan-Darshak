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

// let item = {
// 	address_components: [
// 		{ long_name: "48", short_name: "48", types: ["street_number"] },
// 		{
// 			long_name: "Pirrama Road",
// 			short_name: "Pirrama Rd",
// 			types: ["route"],
// 		},
// 		{
// 			long_name: "Pyrmont",
// 			short_name: "Pyrmont",
// 			types: ["locality", "political"],
// 		},
// 		{
// 			long_name: "City of Sydney",
// 			short_name: "City of Sydney",
// 			types: ["administrative_area_level_2", "political"],
// 		},
// 		{
// 			long_name: "New South Wales",
// 			short_name: "NSW",
// 			types: ["administrative_area_level_1", "political"],
// 		},
// 		{
// 			long_name: "Australia",
// 			short_name: "AU",
// 			types: ["country", "political"],
// 		},
// 		{
// 			long_name: "2009",
// 			short_name: "2009",
// 			types: ["postal_code"],
// 		},
// 	],
// 	adr_address:
// 		'<span class="street-address">48 Pirrama Rd</span>, <span class="locality">Pyrmont</span> <span class="region">NSW</span> <span class="postal-code">2009</span>, <span class="country-name">Australia</span>',
// 	business_status: "OPERATIONAL",
// 	formatted_address: "48 Pirrama Rd, Pyrmont NSW 2009, Australia",
// 	formatted_phone_number: "(02) 9374 4000",
// 	geometry: {
// 		location: { lat: -33.866489, lng: 151.1958561 },
// 		viewport: {
// 			northeast: { lat: -33.8655112697085, lng: 151.1971156302915 },
// 			southwest: { lat: -33.86820923029149, lng: 151.1944176697085 },
// 		},
// 	},
// 	icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
// 	icon_background_color: "#7B9EB0",
// 	icon_mask_base_uri:
// 		"https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
// 	international_phone_number: "+61 2 9374 4000",
// 	name: "Google Workplace 6",
// 	opening_hours: {
// 		open_now: false,
// 		periods: [
// 			{
// 				close: { day: 1, time: "1700" },
// 				open: { day: 1, time: "0900" },
// 			},
// 			{
// 				close: { day: 2, time: "1700" },
// 				open: { day: 2, time: "0900" },
// 			},
// 			{
// 				close: { day: 3, time: "1700" },
// 				open: { day: 3, time: "0900" },
// 			},
// 			{
// 				close: { day: 4, time: "1700" },
// 				open: { day: 4, time: "0900" },
// 			},
// 			{
// 				close: { day: 5, time: "1700" },
// 				open: { day: 5, time: "0900" },
// 			},
// 		],
// 		weekday_text: [
// 			"Monday: 9:00 AM – 5:00 PM",
// 			"Tuesday: 9:00 AM – 5:00 PM",
// 			"Wednesday: 9:00 AM – 5:00 PM",
// 			"Thursday: 9:00 AM – 5:00 PM",
// 			"Friday: 9:00 AM – 5:00 PM",
// 			"Saturday: Closed",
// 			"Sunday: Closed",
// 		],
// 	},
// 	photos: [
// 		{
// 			height: 3024,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/117600448889234589608">Cynthia Wei</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEC6jqtpflLS8GxQqPHBjlcwBf2sri0ZErk9q1ciHGZ6Zx5HBiiiEsPEO3emtB1PGyWbBQhgPL2r9CshoVlJEG4xzB71QMhGBTqqeaCNk1quO3vTTiP50aM1kmOaBQ-DF1ER7zpu6BQOEtnusKMul0m4KA45wfE3h6Xh2IxjLNzx-IiX",
// 			width: 4032,
// 		},
// 		{
// 			height: 3264,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/102493344958625549078">Heyang Li</a>',
// 			],
// 			photo_reference:
// 				"Aap_uECyRjHhOQgGaKTW6Z3ZfTEaDhNc44m0F6GrNSFIMffixwI5xqD35QhecdzVY-FUuDtVE1huu8-2HkxgI9Gwvy6W18fU-_E3UUkdSFBQqGK8_slKlT8BZZc66sTX53IEcTDrZfT-E5_YUBYBOm13yxOTOfWfEDABhaxCGC5Hu_XYh0fI",
// 			width: 4912,
// 		},
// 		{
// 			height: 3036,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/104829437842034782235">Anna Linetsky</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEAumTzSdhRHDutPAj6wVPSZZmBV-brI6TPFwI0tcQlbSR74z44mUPr4aXMQKck_AzHaKmbfR3P2c1qsu45i1RQPHrcpIXxrA78FmDjCdWYYZWUnFozdcmEj9OQ_V0G08adpKivMKZyeaQ1NuwRy9GhSopeKpzkzkFZG5vXMYPPSgpa1",
// 			width: 4048,
// 		},
// 		{
// 			height: 4016,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/107755640736541028674">Jonah Dell</a>',
// 			],
// 			photo_reference:
// 				"Aap_uECC7cSbDkh-TdmXr6m5d5pgVXJmvXg8dF2jzhL0b0Ko4CtnVll6-tIvdz7vhbCsd3hl2u9EgZ4Y30FBxKmFcimfeYUgW2XJyv8JY5IYGuXsKkCLqpV3QH9dIGwoUv2uX0eosDsUsTN2DOlyOasUgVxcYqzIzEmrL5ofIssThQWZeozD",
// 			width: 6016,
// 		},
// 		{
// 			height: 3024,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/115886271727815775491">Anthony Huynh</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEDTdw58CglFmZZAR9iZ05x3y2oK9r5_dRqKWnbZKSS9gs6gp9AeBa1QDvBL6dzZyQAZfN8H2Eppu6y4NBaPOp-GkulZYiKRM7Yww8sUEv-8dmcq35Tx38pe4LEX2wIicFkQHedRgMc0FfV9aFtgosQ5ps5-HCjJSApg8eLGyuxxqPm9",
// 			width: 4032,
// 		},
// 		{
// 			height: 3024,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/102939237947063969663">Jasen Baker</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEAGqslqZPhZUk0T2Y6l7mkCYnY7JN9li4g5NkZsE0N4Cdy7_cZ-fZWyV02VhpQR4Ph4fLUL6_WTXrlGMXXzUJXUcSmSTs2d_Dzf3Q_A1y07Dm-vtv7pS3JXsWyrWETGIoT1pIj81PPdUc1vlR2i3GFMWAbx9rCC472ZJclY8JlvMg-x",
// 			width: 4032,
// 		},
// 		{
// 			height: 3024,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/100678816592586275978">Jeremy Hsiao</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEBaGxeN90YFjD-AUjxZqM44kpMcICKKBBhb0RQQS7DHHFaay8RRAwjWsAt8GEmmB5QnxrbQWHU3TwhVXXHP0m-YNp9Ds3ihpiFan0moNv4QB7kern5cfjWhhrWe8B0dz_vYvmPssJE24P-24YfWWHubOo0L2MjQyueZfDv57N_RvDZk",
// 			width: 4032,
// 		},
// 		{
// 			height: 1515,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/112343109286948028063">Andrew W</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEBDzJlmTeNUreMop6_hkC1HKTCRLyPs5fikJi58qCejtkWp5PIM6vzNN3HErkSWUwnamTr_WLyT7jXMAIdByR-hx8dG-OHjj5JxzmcPvuT_VeVLmdSbNPeIlpmp6EUcPOhaVrhEKojSd44QXkl0za29eZ0oj1KDOnAsGxmhanDFW7lI",
// 			width: 2048,
// 		},
// 		{
// 			height: 3024,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/100678816592586275978">Jeremy Hsiao</a>',
// 			],
// 			photo_reference:
// 				"Aap_uEBvYFpzCDQzvQ0kdBxxB70lTkLbTM0yH3xF-BCHsb7DQ63cuWnutvwv8oVLDSbA14_kns3WVlEInTyy2elvmH5lzQteb6zzRu3exkwE65_55TgJqdLO7RYYiPFliWk4ocszn9nn5ELv5uP2BQmqr9QET5vwgxR-0eshyVmcdM42jb39",
// 			width: 4032,
// 		},
// 		{
// 			height: 4032,
// 			html_attributions: [
// 				'<a href="https://maps.google.com/maps/contrib/100678816592586275978">Jeremy Hsiao</a>',
// 			],
// 			photo_reference:
// 				"Aap_uECQynuD_EnSnbz8sJQ6-B6uR-j2tuu4Z1tuGUjq8xnxFDk-W8OdeLzWBX8suNKTCsPlkzTqC22BXf_hX33XclGPL4SS9xnPmHcMrLoUl0H_xHYevFvT17Hgw5DZpSyVmLvDvxzzJ1rsZTh55QwopmAty083a1r1ZIfL32iXh_q8FUas",
// 			width: 3024,
// 		},
// 	],
// 	place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
// 	plus_code: {
// 		compound_code: "45MW+C8 Pyrmont NSW, Australia",
// 		global_code: "4RRH45MW+C8",
// 	},
// 	rating: 4,
// 	reference: "ChIJN1t_tDeuEmsRUsoyG83frY4",
// 	reviews: [
// 		{
// 			author_name: "Luke Archibald",
// 			author_url:
// 				"https://www.google.com/maps/contrib/113389359827989670652/reviews",
// 			language: "en",
// 			profile_photo_url:
// 				"https://lh3.googleusercontent.com/a-/AOh14GhGGmTmvtD34HiRgwHdXVJUTzVbxpsk5_JnNKM5MA=s128-c0x00000000-cc-rp-mo",
// 			rating: 1,
// 			relative_time_description: "a week ago",
// 			text: "Called regarding paid advertising google pages to the top of its site of a scam furniture website misleading and taking peoples money without ever sending a product - explained the situation,  explained I'd spoken to an ombudsman regarding it.  Listed ticket numbers etc.\n\nThey left the advertisement running.",
// 			time: 1652286798,
// 		},
// 		{
// 			author_name: "Tevita Taufoou",
// 			author_url:
// 				"https://www.google.com/maps/contrib/105937236918123663309/reviews",
// 			language: "en",
// 			profile_photo_url:
// 				"https://lh3.googleusercontent.com/a/AATXAJwZANdRSSg96QeZG--6BazG5uv_BJMIvpZGqwSz=s128-c0x00000000-cc-rp-mo",
// 			rating: 1,
// 			relative_time_description: "6 months ago",
// 			text: "I need help.  Google Australia is taking my money. Money I don't have any I am having trouble sorting this issue out",
// 			time: 1637215605,
// 		},
// 		{
// 			author_name: "Jordy Baker",
// 			author_url:
// 				"https://www.google.com/maps/contrib/102582237417399865640/reviews",
// 			language: "en",
// 			profile_photo_url:
// 				"https://lh3.googleusercontent.com/a/AATXAJwgg1tM4aVA4nJCMjlfJtHtFZuxF475Vb6tT74S=s128-c0x00000000-cc-rp-mo",
// 			rating: 1,
// 			relative_time_description: "4 months ago",
// 			text: "I have literally never been here in my life, I am 17 and they are taking money I don't have for no reason.\n\nThis is not ok. I have rent to pay and my own expenses to deal with and now this.",
// 			time: 1641389490,
// 		},
// 		{
// 			author_name: "Prem Rathod",
// 			author_url:
// 				"https://www.google.com/maps/contrib/115981614018592114142/reviews",
// 			language: "en",
// 			profile_photo_url:
// 				"https://lh3.googleusercontent.com/a/AATXAJyEQpqs4YvPPzMPG2dnnRTFPC4jxJfn8YXnm2gz=s128-c0x00000000-cc-rp-mo",
// 			rating: 1,
// 			relative_time_description: "4 months ago",
// 			text: "Terrible service. all reviews are fake and irrelevant. This is about reviewing google as business not the building/staff etc.",
// 			time: 1640159655,
// 		},
// 		{
// 			author_name: "Husuni Hamza",
// 			author_url:
// 				"https://www.google.com/maps/contrib/102167316656574288776/reviews",
// 			language: "en",
// 			profile_photo_url:
// 				"https://lh3.googleusercontent.com/a/AATXAJwRkyvoSlgd06ahkF9XI9D39o6Zc_Oycm5EKuRg=s128-c0x00000000-cc-rp-mo",
// 			rating: 5,
// 			relative_time_description: "7 months ago",
// 			text: "Nice site. Please I want to work with you. Am Alhassan Haruna, from Ghana. Contact me +233553851616",
// 			time: 1633197305,
// 		},
// 	],
// 	types: ["point_of_interest", "establishment"],
// 	url: "https://maps.google.com/?cid=10281119596374313554",
// 	user_ratings_total: 939,
// 	utc_offset: 600,
// 	vicinity: "48 Pirrama Road, Pyrmont",
// 	website: "http://google.com/",
// };

const DetailModal = ({ show, setShow, item }) => {
	const [index, setIndex] = useState(0);
	const navigation = useNavigation();
	const [routes] = useState([
		{ key: "first", title: "Overview" },
		{ key: "second", title: "Reviews" },
	]);
	const user = useSelector((state) => state.auth.user);
	console.log(user);

	// useEffect(() => {
	// 	const isLoggedIn = async () => {
	// 		const name = await SecureStore.getItemAsync('name');
	// 		if(!name) {
	// 			navigation.push('Login');
	// 		}
	// 	}
	// 	isLoggedIn();
	// }, []);

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
			if (!!accessToken) {
				// navigation.navigate("Login", {
				// 	to: "Detail",
				// 	place_id: place_id,
				// });
			}
			const result = await createSavedLocation({
				accessToken: accessToken,
				place_id: place_id,
				User: 15,
			});
			if (result.success) {
				Alert.alert(result.message);
			}
			console.log(result);
		} catch (err) {
			console.log(err);
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
									ATM ID : #57238384882
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
