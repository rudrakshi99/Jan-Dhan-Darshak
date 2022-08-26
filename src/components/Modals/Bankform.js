import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import HeaderCard from "../subcomponents/HeaderCard";
import { useNavigation } from "@react-navigation/native";
import { flashMessage } from "../../lottie/flashMessage";

const Bankform = () => {
	const navigation = useNavigation();
	const data = [
		{
			uri: "https://jandhandarshak.s3.amazonaws.com/media/Bank%20Documents/revised-credit-card-application-form-10-18.pdf",
			title: "Customer Request Form",
		},
		{
			uri: "https://jandhandarshak.s3.amazonaws.com/media/Bank%20Documents/revised-customer-request-form-10-18.pdf",
			title: "RTGS / NEFT Paying Slip",
		},
		{
			uri: "https://jandhandarshak.s3.amazonaws.com/media/Bank%20Documents/revised-net-banking-and-mobile-banking-form-for-corporate-users-1018.pdf",
			title: "Debit cum ATM Card",
		},
		{
			uri: "https://jandhandarshak.s3.amazonaws.com/media/Bank%20Documents/revised-net-banking-and-mobile-banking-form-for-retail-users-10-18.pdf",
			title: "Credit Card - Application Form",
		},
		{
			uri: "https://jandhandarshak.s3.amazonaws.com/media/Bank%20Documents/revised-rtgs-neft-paying-slip-10-18.pdf",
			title: "Home Loan - Application Form",
		},
	];

	async function handleDownload(item) {
		FileSystem.downloadAsync(
			item.uri,
			FileSystem.documentDirectory + `download.pdf`
		)
			.then(({ uri }) => {
				console.log("Finished downloading to ", uri);
				flashMessage("Download Completed Successfully", "success");
			})
			.catch((error) => {
				console.error(error);
			});
	}
	function handleView(uri) {
		navigation.navigate("ViewPDF", { uri: uri });
	}

	return (
		<View style={styles.container}>
			<HeaderCard
				heading="Bank Forms"
				text="Download your required form from here"
			/>
			<View style={styles.divider}></View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{data.map((item, i) => {
					return (
						<View key={i} style={styles.div}>
							<Text style={styles.text}>{item.title}</Text>
							<View style={{ flexDirection: "row" }}>
								<Pressable
									onPress={() => {
										handleDownload(item);
									}}
									style={{ marginLeft: 10 }}
								>
									<Text
										style={{
											color: "rgba(44, 129, 224, 1)",
											fontSize: 16,
										}}
									>
										Download
									</Text>
								</Pressable>
							</View>
						</View>
					);
				})}
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
		boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
	},
	div: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 30,
		backgroundColor: "#fff",
		marginBottom: 5,
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
	},
});

export default Bankform;
