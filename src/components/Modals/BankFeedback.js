import React, { useState, useEffect } from "react";
import {
	useNavigation,
	useIsFocused,
	useRoute,
} from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import InputField from "../inputComponents/InputField";
// import AuthModal from "../AuthModal";
import RNPickerSelect from "react-native-picker-select";

// import { MY_SECURE_AUTH_STATE_KEY } from "@env";
import { createFinancialPoint } from "../../https/feedback";
import { useSelector } from "react-redux";
import { flashMessage } from "../../lottie/flashMessage";

const BankFeedback = () => {
	const navigation = useNavigation();
	const route = useRoute();
	// const focused = useIsFocused();
	// const [show, setShow] = useState(true);
	// const [user, setUser] = useState();
	// const [token, setToken] = useState("");

	const [recording, setRecording] = useState();
	const [uri, setUri] = useState("");
	const focused = useIsFocused();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		const isLoggedIn = async () => {
			const name = await SecureStore.getItemAsync('name');
			if(!name) {
				navigation.push('Login');
			}
		}
		isLoggedIn();
	}, []);

	useEffect(() => {
		async function autoFill() {
			console.log(route.params);
			setNameOfThePoint(route.params.name);
			setLocation(route.params.location);
			setUsername(await SecureStore.getItemAsync("name"));
			setMobile(await SecureStore.getItemAsync("phone"));
		}
		autoFill();
	});

	const [financial_type, setFinancial_type] = useState("");
	const [NameOfThePoint, setNameOfThePoint] = useState("");
	const [unique_id_type, setUnique_id_type] = useState("");
	const [location, setLocation] = useState("");
	const [username, setUsername] = useState("");
	const [mobile, setMobile] = useState("");
	const [comments, setComments] = useState("");
	const [unique_id, setUnique_id] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		try {
			if (
				!financial_type ||
				!NameOfThePoint ||
				!unique_id_type ||
				!comments ||
				!unique_id
			) {
				setError("All fields are required !");
				flashMessage("All fields are required !", "danger");
				return;
			}
			const accessToken = await SecureStore.getItemAsync("accessToken");
			const data = await createFinancialPoint({
				accessToken,
				financial_type,
				financial_point_name: NameOfThePoint,
				unique_id_type,
				message: comments,
				audio_message: uri,
				unique_id,
			});

			if (data.success === true) {
				flashMessage("Feedback has been submitted", "success");
			}
		} catch (err) {
			console.log(err?.response?.data);
			setError(err?.response?.data);
			flashMessage(err?.response?.data, "danger");
		}
	};

	return (
		<View style={styles.container}>
			<View>
				<View style={styles.innerContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Find')}>
						<ArrowNarrowLeftIcon
							style={styles.iconHeader}
							size={30}
							color="#101010"
						/>
					</TouchableOpacity>
					<View style={styles.headingBox}>
						<Text style={styles.heading}>Feedback</Text>
						<Text style={styles.smallDesc}>
							This will be shared with the bank
						</Text>
					</View>
					<Text></Text>
				</View>
				<View style={styles.divider}></View>
				<ScrollView
					style={styles.forms}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					<Text className="text-[16.5px] font-semibold text-[#e35944] ml-2 mb-2">
						{error}
					</Text>

					<Text style={styles.inputLabel}>Financial Type</Text>
					<View style={styles.borderGet}>
						<RNPickerSelect
							onValueChange={(value) => setFinancial_type(value)}
							items={[
								{ label: "IFSC", value: "IFSC" },
								{ label: "ATM", value: "ATM" },
								{ label: "CSC", value: "CSC" },
								{ label: "Post Office", value: "PO" },
								{ label: "Bank Mitra", value: "Bank_Mitra" },
							]}
						/>
					</View>
					<InputField
						inputname="Name of the Point"
						name={NameOfThePoint}
						keyboardType="default"
						onChangeText={(e) => {
							setNameOfThePoint(e);
						}}
						placeholder="Name of the place"
					></InputField>
					<Text style={styles.inputLabel}>Financial Id type</Text>
					<View style={styles.borderGet}>
						<RNPickerSelect
							onValueChange={(value) => setUnique_id_type(value)}
							items={[
								{ label: "Bank", value: "Bank" },
								{ label: "CSC Id", value: "CSC_Id" },
								{ label: "PIN Code", value: "PIN_Code" },
							]}
						/>
					</View>
					<InputField
						inputname="Location"
						name={location}
						keyboardType="default"
						onChangeText={(e) => {
							setLocation(e);
						}}
						placeholder="Location"
					></InputField>
					<InputField
						inputname="Your Name"
						name={username}
						keyboardType="default"
						onChangeText={(e) => {
							setUsername(e);
						}}
						placeholder="Your Full Name"
					></InputField>
					<InputField
						inputname="Your Mobile no."
						name={mobile}
						keyboardType="phone-pad"
						onChangeText={(e) => {
							setMobile(e);
						}}
						placeholder="Your Mobile"
					></InputField>
					<InputField
						multi={true}
						showMicro={true}
						recording={recording}
						setRecording={setRecording}
						uri={uri}
						setUri={setUri}
						inputname="Comments"
						name={comments}
						onChangeText={(e) => {
							setComments(e);
						}}
						placeholder="Please write your feedback here..."
					></InputField>
					<InputField
						inputname="Unique ID."
						name={unique_id}
						onChangeText={(e) => {
							setUnique_id(e);
						}}
						placeholder="Your Mobile"
					></InputField>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						// logout();
						handleSubmit();
					}}
					style={styles.buttonBox}
				>
					<Text style={styles.button}>Submit</Text>
				</TouchableOpacity>
			</View>
			{/* ) : null} */}

		</View>
	);
};

export default BankFeedback;
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 24,
		marginTop: 28,
		marginBottom: 20,
		border: "1px solid black",
		position: "relative",
		height: "72%",
		backgroundColor: "#F1F1F1",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headingBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	heading: {
		fontSize: 26,
		fontWeight: "600",
		color: "#101010",
		paddingBottom: 5,
	},
	smallDesc: {
		color: "#101010",
	},
	inputLabel: {
		color: "#8E8E8E",
		fontSize: 16,
		paddingBottom: 10,
		marginLeft: 12,
	},
	borderGet: {
		borderWidth: 1,
		borderRadius: 4,
		width: "95%",
		marginLeft: 8,
	},
	divider: {
		marginTop: 28,
		width: 1000,
		height: 4,
		backgroundColor: "#EAEAEA",
	},
	buttonBox: {
		position: "absolute",
		bottom: -70,
		height: 50,
		width: "100%",
		backgroundColor: "#292C31",
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
