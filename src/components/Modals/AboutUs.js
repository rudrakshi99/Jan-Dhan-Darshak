import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import { I18n } from "i18n-js";

const About = () => {
	const navigation = useNavigation();
	const i18n = new I18n();
	i18n.locale = "hi";

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Find")}
					>
						<ArrowNarrowLeftIcon
							style={styles.iconHeader}
							size={30}
							color="#101010"
						/>
					</TouchableOpacity>
					<Text style={styles.heading}>About Us</Text>
					<Text></Text>
				</View>

				<View style={styles.imageBox}>
					<Image
						style={styles.imageLogo}
						source={require("../../assets/images/aboutLogo.png")}
						resizeMode="cover"
					/>
				</View>

				<View style={styles.textBox}>
					<Text style={styles.para}>
						The Jan Dhan Darshak mobile application provides an
						interface for citizen to view the Banking
						Infrastructures in India consisting of Bank Branches,
						ATMs and Bank Mitra locations. the data is collated by
						Department of Financial Services from Scheduled
						Commercial Banks both in Public and Private Sector.{" "}
					</Text>
				</View>

				{/* <View style={styles.topBorder}>
                    <TouchableOpacity style={styles.buttonBox}>
                        <Text style={styles.button}>Got it</Text>
                    </TouchableOpacity>
                </View> */}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 24,
		marginTop: 28,
		marginBottom: 20,
		border: "1px solid black",
		position: "relative",
		height: "70%",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconHeader: {},
	heading: {
		fontSize: 26,
		fontWeight: "600",
		color: "#101010",
		marginLeft: -16,
	},
	imageBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 70,
	},
	imageLogo: {},
	textBox: {
		marginTop: 60,
		// marginBottom: 80,
	},
	para: {
		fontSize: 17,
		fontWeight: "600",
		lineHeight: 24,
		color: "#101010",
		paddingBottom: 120,
		// borderBottomColor: '#E0E0E0',
		// borderBottomWidth: 3,
		width: "100%",
		letterSpacing: 0,
		lineHeight: 24.4,
		textAlign: "justify",
	},
	topBorder: {
		marginVertical: 10,
	},
	buttonBox: {
		position: "absolute",
		bottom: 13,
		height: 50,
		width: "100%",
		backgroundColor: "#2C81E0",
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
});

export default About;
