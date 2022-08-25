import ViewPager from "react-native-pager-view";
import React, { useRef,useState } from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

function Page({ image, title, subtitle, func }) {
	return (
		<View style={styles.container}>
			<Image source={image} resizeMode="contain" style={styles.image} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.text}>{subtitle}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={func}>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function Onboarding() {
	React.useEffect(() => {
		async function getFirstTime() {
			try {
				const res = await SecureStore.getItemAsync("isFirstTime");
				console.log(res);
				if (res !== null) {
					navigation.navigate("Home");
				}
			} catch (err) {
				console.log(err);
			}
		}
		getFirstTime();
	}, []);

	
	const pagerRef = useRef(null);
	const navigation = useNavigation();

	const handlePageChange = (pageNumber) => {
		console.log("Fired", pageNumber);
		if (pagerRef.current) {
			pagerRef?.current?.setPage(pageNumber);
		}
	};

	const saveFirstLogin = async () => {
		console.log("saving");
		await SecureStore.setItemAsync("isFirstTime", "false");
		return;
	};

	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "flex-end",
					paddingHorizontal: 20,
					marginTop: 20,
				}}
			>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() => {
						saveFirstLogin();
						navigation.navigate("Home");
					}}
				>
					<Text
						style={{
							color: "#2C81E0",
							fontSize: 20,
							fontWeight: "600",
						}}
					>
						Skip
					</Text>
				</TouchableOpacity>
			</View>
			<ViewPager style={{ flex: 1 }} ref={pagerRef} initialPage={0}>
				<View key="1" style={styles.container}>
					<Page
						image={require("../assets/images/group1.png")}
						title="Locate Financial Touch Points"
						subtitle="Locate nearby Financial Service Touch Points at a given location in India."
						func={() => handlePageChange(1)}
					/>
				</View>
				<View key="2" style={styles.container}>
					<Page
						image={require("../assets/images/group2.png")}
						title="Voice Dailing Feedback"
						subtitle="Integrated Dialing Users’ Feedback goes directly to the concerned Bank."
						func={() => handlePageChange(2)}
					/>
				</View>
				<View key="3" style={styles.container}>
					<Page
						image={require("../assets/images/group1.png")}
						title="Track Suggestions Request"
						subtitle="Track the status of all suggestions' requests in one place."
						func={() => {
							saveFirstLogin();
							navigation.navigate("Home");
						}}
					/>
				</View>
			</ViewPager>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: Dimensions.get("window").height / 2,
		width: Dimensions.get("window").width / 1.6,
	},
	button: {
		backgroundColor: "#2C81E0",
		paddingVertical: 10,
		width: Dimensions.get("window").width / 1.3,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "auto",
		zIndex: 90,
	},
	text: {
		color: "#8E8E8E",
		fontSize: 16,
		textAlign: "center",
		width: Dimensions.get("window").width / 1.5,
		marginVertical: 10,
	},
	title: {
		color: "#101010",
		fontSize: 20,
		fontWeight: "600",
		letterSpacing: 1,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
	},
	buttonContainer: {
		marginTop: 60,
	},
});

export default Onboarding;
