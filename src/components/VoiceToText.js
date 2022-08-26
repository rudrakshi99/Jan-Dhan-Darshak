import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import {
	View,
	Modal,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import { Permissions } from "expo";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Recording } from "expo-av/build/Audio";
import { useIsFocused } from "@react-navigation/native";
import { flashMessage } from "../lottie/flashMessage";

// RecordingOptionsPresets.HIGH_QUALITY = {
// 	isMeteringEnabled: true,
// 	android: {
// 		extension: ".m4a",
// 		outputFormat: AndroidOutputFormat.MPEG_4,
// 		audioEncoder: AndroidAudioEncoder.AAC,
// 		sampleRate: 44100,
// 		numberOfChannels: 2,
// 		bitRate: 128000,
// 	},
// 	ios: {
// 		extension: ".wav",
// 		outputFormat: IOSOutputFormat.MPEG4AAC,
// 		audioQuality: IOSAudioQuality.MAX,
// 		sampleRate: 44100,
// 		numberOfChannels: 2,
// 		bitRate: 128000,
// 		linearPCMBitDepth: 16,
// 		linearPCMIsBigEndian: false,
// 		linearPCMIsFloat: false,
// 	},
// };

let recording = new Recording();

function VoiceToText({ visible, setVisible, setSearch }) {
	const animationRef = useRef(null);
	const focused = useIsFocused();
	const [recordings] = React.useState([]);
	const [message, setMessage] = React.useState("");

	const recordingOptions = {
		// android not currently in use, but parameters are required
		android: {
			extension: ".m4a",
			outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
			audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
			sampleRate: 44100,
			numberOfChannels: 2,
			bitRate: 128000,
		},
		ios: {
			extension: ".m4a",
			audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
			sampleRate: 44100,
			numberOfChannels: 1,
			bitRate: 128000,
			linearPCMBitDepth: 16,
			linearPCMIsBigEndian: false,
			linearPCMIsFloat: false,
		},
	};

	async function startRecording() {
		try {
			console.log("Requesting permissions..");
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			console.log("Starting recording..");
			await recording.prepareToRecordAsync(recordingOptions);
			await recording.startAsync();
			console.log("Recording started");
		} catch (err) {
			console.error("Failed to start recording", err);
			flashMessage("Error while Recording, please retry", "danger");
		}
	}

	async function stopRecording() {
		console.log("Stopping recording..");
		setVisible(false);
		await recording.stopAndUnloadAsync();
		console.log(recording);
		const uri = recording.getURI();
		console.log("Recording stopped and stored at", uri);
		uploadAudio(uri);
	}

	async function uploadAudio(uri) {
		try {
			const response = await FileSystem.uploadAsync(
				`https://8757-210-89-61-4.in.ngrok.io/users/voice-to-text/`,
				// "http://192.168.43.236:5000/speech-to-text",
				uri,
				{
					fieldName: "voice",
					httpMethod: "POST",
					uploadType: FileSystem.FileSystemUploadType.MULTIPART,
				}
			);
			const res = response.body;
			if (!res) {
				flashMessage("Server Issue, or Permission issue", "danger");
			}
			const parsed = JSON.parse(res);
			if (!parsed) {
				flashMessage("Server Issue", "danger");
			}
			console.log(parsed.data.msg);
			if (parsed.data.msg == null) {
				flashMessage("No results Found", "danger");
			}
			setSearch(parsed.data.msg);
		} catch (err) {
			console.log(err);
		}
	}

	React.useEffect(() => {
		animationRef.current?.play();
		async function begin() {
			startRecording();
			setTimeout(() => {
				stopRecording();
			}, 3000);
			console.log(recordings);
		}
		if (visible) {
			begin();
		}
	}, [visible, focused]);
	return (
		<Modal
			animationType="slide"
			visible={visible}
			transparent={true}
			onRequestClose={() => {
				setVisible(false);
				console.log("Modal Closed");
			}}
		>
			<View style={styles.modal}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => {
							setVisible(false);
						}}
						style={{ flex: 1, justifyContent: "flex-end" }}
					>
						<Icon name="close" size={25} color="black" />
					</TouchableOpacity>
					<LottieView
						source={require("../lottie/animation.json")}
						autoplay={true}
						ref={animationRef}
						loop={true}
						style={styles.lottie}
					/>
					<View
						style={{ flexDirection: "row", alignItems: "flex-end" }}
					>
						{/* <Icon name="microphone" size={30} color="#000" /> */}
						<Text style={styles.text}>Listening ...</Text>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	container: {
		backgroundColor: "#FAFAFA",
		borderRadius: 20,
		padding: 40,
		width: Dimensions.get("window").width / 1.3,
		elevation: 10,
		height: Dimensions.get("window").width / 1.5,
		justifyContent: "center",
		alignItems: "center",
	},
	view: {
		flexDirection: "column",
	},
	text: {
		fontSize: 20,
		marginLeft: 10,
	},
	lottie: {
		height: 200,
		width: 200,
	},
});

export default VoiceToText;
