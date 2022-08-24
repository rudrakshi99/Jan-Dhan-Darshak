import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import InputField from "../inputComponents/InputField";
import { AirbnbRating } from "react-native-ratings";
import RNPickerSelect from "react-native-picker-select";

import { createFeedback } from "../../https/feedback";
import VoiceToText from "../VoiceToText";
import { flashMessage } from "../../lottie/flashMessage";
import Loader from "../Loader";

const Help = () => {
	const navigation = useNavigation();
	const [phone_number, setPhone_number] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [topic, setTopic] = useState("");
	const [rating, setRating] = useState("5");
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const ratingCompleted = (rating) => {
		console.log("Rating is: " + rating);
		setRating(rating);
	};

	const handleSubmit = async () => {
		try {
			if (
				!phone_number ||
				!name ||
				!email ||
				(rating <= 4 && !message) ||
				!topic ||
				!rating
			) {
				setError("All fields are required !");
				flashMessage('All fields are required !', 'danger');
				return;
			}
			console.log(phone_number, " ", email, " ", message, " ", rating);
			setIsLoading(true);
			const data = await createFeedback({
				phone_number,
				name,
				email,
				topic,
				message,
				rating,
			});
			console.log(data, "response feedback");
			if (data.success === true) {
				setResponse(data.message);
				flashMessage(data?.message, 'success');
			}
		} catch (err) {
			console.log(err?.response?.data);
			setError(err?.response?.data);
			flashMessage(err?.response?.data, 'danger');
		} finally {
            setIsLoading(false);
        }
	};

	if(isLoading) return <Loader />
    else
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
							This will be shared with the Development Team
						</Text>
					</View>
					<Text></Text>
				</View>
				<View style={styles.divider}></View>
				{!response ? (
					<ScrollView
						style={styles.forms}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					>
						<Text className='text-[16.5px] font-semibold text-[#e35944] ml-2 mt-2 mb-2'>{error}</Text>
						<InputField
							inputname="Phone number"
							keyboardType="phone-pad"
							help={true}
							name={phone_number}
							onChangeText={(e) => {
								setPhone_number(e);
							}}
							placeholder="Phone number"
						></InputField>
						<InputField
							inputname="Name"
							help={true}
							keyboardType="default"
							name={name}
							onChangeText={(e) => {
								setName(e);
							}}
							placeholder="Name"
						></InputField>
						<InputField
							inputname="Email"
							help={true}
							keyboardType="email-address"
							name={email}
							onChangeText={(e) => {
								setEmail(e);
							}}
							placeholder="Email address"
						></InputField>
						<Text style={styles.inputLabel}>Topic</Text>
						<View style={styles.borderGet}>
							<RNPickerSelect
								onValueChange={(value) => setTopic(value)}
								items={[
									{
										label: "Content Issue",
										value: "content_issue",
									},
									{
										label: "Design Issue",
										value: "design_issue",
									},
									{
										label: "Server Issue",
										value: "server_issue",
									},
									{ label: "Bug", value: "bug" },
								]}
							/>
						</View>
						{rating <= 4 && (
							<InputField
								multi={true}
								showMicro={false}
								inputname="Message"
								name={message}
								onChangeText={(e) => {
									setMessage(e);
								}}
								placeholder="Please write your feedback here..."
							></InputField>
						)}

						<Text style={styles.inputLabel}>Rating</Text>
						<AirbnbRating
							onFinishRating={(rating) => ratingCompleted(rating)}
							reviews={[
								"Poor",
								"Fine",
								"Good",
								"Very good",
								"Excellent",
							]}
							defaultRating={5}
							showRating={false}
							size={36}
						/>
						<Text style={styles.marginGet}></Text>
					</ScrollView>
				) : (
					<View style={styles.responseView}>
						<Text style={styles.responseText}>{response}</Text>
					</View>
				)}
				{!response && (
					<TouchableOpacity
						onPress={() => {
							// logout();
							handleSubmit();
						}}
						style={styles.buttonBox}
					>
						<Text style={styles.button}>Submit</Text>
					</TouchableOpacity>
				)}
			</View>
			{/* ) : null} */}

		</View>
	);
};

export default Help;
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
	errorMsg: {
		fontSize: 20,
		fontWeight: "normal",
		color: "#9c342d",
		marginLeft: 10,
		marginTop: 8,
		marginBottom: 8,
	},
	responseView: {
		display: "flex",
		top: 200,
		justifyContent: "center",
		alignItems: "center",
	},
	responseText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1a5e33",
	},
	inputLabel: {
		color: "#8E8E8E",
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 12,
	},
	forms: {
		marginTop: -10,
	},
	borderGet: {
		borderWidth: 1,
		borderRadius: 4,
		width: "95%",
		marginLeft: 10,
	},
	marginGet: {
		paddingBottom: 0,
	},
	divider: {
		marginTop: 28,
		width: 1000,
		height: 4,
		backgroundColor: "#EAEAEA",
	},
	rating: {
		paddingBottom: "24px",
	},
	buttonBox: {
		position: "absolute",
		bottom: -70,
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
	responseView: {
		display: "flex",
		top: 200,
		justifyContent: "center",
		alignItems: "center",
	},
	responseText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1a5e33",
	},
	inputLabel: {
		color: "#8E8E8E",
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 12,
	},
	borderGet: {
		borderWidth: 1,
		borderRadius: 4,
		width: "95%",
		marginLeft: 10,
	},
	marginGet: {
		paddingBottom: 0,
	},
	divider: {
		marginTop: 28,
		width: 1000,
		height: 4,
		backgroundColor: "#EAEAEA",
	},
	rating: {
		paddingBottom: "24px",
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
