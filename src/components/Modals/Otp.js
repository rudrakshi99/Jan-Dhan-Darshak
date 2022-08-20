import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { verifyOtp } from "../../https/auth";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import RNOtpVerify from 'react-native-otp-verify';
import { flashMessage } from "../../lottie/flashMessage";
// import Clipboard from '@react-native-community/clipboard';
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";

const OtpScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [phone, setPhone] = useState("");
	const [otp, setOTP] = useState("");
	const [error, setError] = useState('');

	useEffect(() => {
		const alreadyLogin = async () => {
			const name = await SecureStore.getItemAsync("name");
			setPhone((await SecureStore.getItemAsync("phone")) || "");
			if (name) {
				navigation.push("Home");
			}
		};
		alreadyLogin();
	}, []);

	// const getHash = RNOtpVerify.getHash().then(console.log).catch(console.log);
	// const startListeningForOtp = () => RNOtpVerify.getOtp().then(p => RNOtpVerify.addListener(otpHandler)).catch(p => console.log(p));
	// const otpHandler = (message) => {
	//     const otp = /(\d{6})/g.exec(message)[1];
	//     setOTP(otp);
	//     RNOtpVerify.removeListener();
	//     Keyboard.dismiss();
	// }
		
	// useEffect(() => {
	// 	getHash();
	// 	startListeningForOtp();
	// }, []);
	

	const handleOtp = async () => {
		if (!otp || !phone) {
			setError('All fields are required !');
			flashMessage('All fields are required !', 'danger');
			return;
		}
		if(otp.length !== 6) {
			// setError('OTP should be of six digit !');
			flashMessage("OTP should be of six digit !", 'danger');
			return;
		}
		try {
			const data = await verifyOtp({ otp, phone_number: phone });
			console.log(data, "data");

			if (data?.success === true) {
				flashMessage(data?.message, 'success');
				let userId = data.data.user.id;
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.tokens.access
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.tokens.refresh
				);
				await SecureStore.setItemAsync("name", data.data.user.name);
				await SecureStore.setItemAsync("userId", `${userId}`);
				console.log(
					await SecureStore.getItemAsync("accessToken"),
					"added"
				);
				console.log(data.data, "user object");
				setOTP('');
				navigation.push("Home");
				
			}
		} catch (err) {
			console.log(err?.response?.data);
			flashMessage(err?.response?.data, 'danger');
			setError(err?.response?.data);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-200">
			<View className="flex-1 bg-gray-100">
				<TouchableOpacity onPress={() => navigation.navigate("Login")} className=''>
					<ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
				</TouchableOpacity>
				<View className="flex-1 flex-col items-center justify-center -mt-32 bg-white relative">
					<TouchableOpacity
						onPress={() => navigation.navigate("Login")}
						className="absolute top-[14%] left-5 rounded-full"
					>
						<ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
					</TouchableOpacity>

					<Image
						source={require("../../assets/images/logo.png")}
						resizeMode="contain"
						className="h-32 w-60"
					/>

					<Text
						className={`text-center text-3xl text-gray-600 p-4 font-bold`}
					>
						Verify OTP
					</Text>
					<Text className="text-center text-[15px] text-[#8E8E8E] mb-3 font-semibold">
						A Verification code has been sent to {'\n'} <Text className='underline'>{phone}</Text>.
					</Text>

					<Text className='text-[16.5px] font-semibold text-[#e35944] mb-2'>{error}</Text>

					<OTPInputView
						style={{ width: "86%", height: 60 }}
						pinCount={6}
						autoFocusOnLoad
						codeInputFieldStyle={styles.underlineStyleBase}
						code={otp}
						onCodeChanged={(val) => setOTP(val)}
					/>

					<TouchableOpacity
						onPress={() => handleOtp()}
						className="bg-[#2C81E0] mx-8 mt-6 p-3 rounded-lg flex-row items-center"
					>
						<Text className="flex-1 text-white font-bold text-lg text-center">
							Verify OTP
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	underlineStyleBase: {
		color: '#505050'
	},
})

export default OtpScreen;
