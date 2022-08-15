import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";

function Login() {
	const [phone, setPhone] = useState("");
	const navigation = useNavigation();
	async function handleLogin(e) {
		e.preventDefault();
		try {
			const { data } = await axios.post("", {
				phone_number: phone,
			});
			if (data.success) {
				//navigate to enter OTP screen
				navigation.navigate("/otp", {
					phone_number: phone,
				});
			} else {
				if (data.status == 501) {
					Alert.alert(
						"Login service unavailable. Please try again later"
					);
				} else if (data.status == 401) {
					Alert.alert("Invalid Phone Number");
				} else {
					Alert.alert(
						"Unknown error occurred. Please try again later"
					);
				}
			}
		} catch (err) {
			console.log(err);
			Alert.alert("Request Failed, Check your Internet");
		}
	}
	return (
		<View style={styles.container}>
			<TextInput
				value={phone}
				onChangeText={setPhone}
				style={styles.input}
				placeholder="Phone Number"
			/>
			<TouchableOpacity
				onPress={() => {
					handleLogin();
				}}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<Text></Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Login;
