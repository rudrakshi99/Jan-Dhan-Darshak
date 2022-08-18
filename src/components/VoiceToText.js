import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { View, Modal, Text, StyleSheet, Dimensions } from "react-native";
import Voice from "@react-native-community/voice";
import { Permissions } from "expo";
import Icon from "react-native-vector-icons/FontAwesome5";

function VoiceToText() {
	const animationRef = useRef(null);
	const [status, setStatus] = useState("");
	React.useEffect(() => {
		animationRef.current?.play();
		async () => {
			const { status, expires, permissions } = await Permissions.askAsync(
				Permissions.AUDIO_RECORDING
			);
			if (status !== "granted") {
				//Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
				// this.setState({showRecordButton: false});
			} else {
				// this.setState({showRecordButton: true});
			}
		};
	});
	async function check() {
		Voice.isAvailable()
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	}
	async function startListening() {
		Voice.getSpeechRecognitionServices()
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	}
	return (
		<Modal
			animationType="slide"
			visible={true}
			transparent={true}
			onRequestClose={() => {
				console.log("Modal Closed");
			}}
		>
			<View style={styles.modal}>
				<View style={styles.container}>
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
