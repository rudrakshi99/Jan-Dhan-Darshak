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
	const [recordings, setRecordings] = React.useState([]);
	const [uri, setUri] = useState();
	const [message, setMessage] = React.useState("");

	async function getTextFromVoice(uri) {
		try {
			const file = await FileSystem.readAsStringAsync(uri);
			let form = new FormData();
			console.log("Initial", form);
			form.append("voice", file);
			console.log(form);
			const { data } = axios.post(
				"https://jan-dhan-darshak.herokuapp.com/users/voice-to-text/",
				{
					voice: form,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	async function startRecording() {
		try {
			console.log("Requesting permissions..");
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			console.log("Starting recording..");
			await recording.prepareToRecordAsync(
				Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
			);
			await recording.startAsync();
			console.log("Recording started");
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	}

	async function stopRecording() {
		console.log("Stopping recording..");
		setVisible(false);
		await recording.stopAndUnloadAsync();
		console.log(recording);
		const uri = recording.getURI();
		console.log("Recording stopped and stored at", uri);
		getTextFromVoice(uri);
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
	}, [focused]);
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