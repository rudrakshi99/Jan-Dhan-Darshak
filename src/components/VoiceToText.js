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
import Voice from "@react-native-community/voice";
import { Permissions } from "expo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function VoiceToText({ visible, setVisible }) {
	const animationRef = useRef(null);
	const [status, setStatus] = useState("");

	React.useEffect(() => {
		animationRef.current?.play();
		async function check() {
			Voice.isAvailable()
				.then((result) => {
					console.log(result);
					return result;
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
		async function stopListening() {
			Voice.stop()
				.then((result) => {
					console.log(result);
				})
				.catch((err) => console.log(err));
		}
		async () => {
			const { status, expires, permissions } = await Permissions.askAsync(
				Permissions.AUDIO_RECORDING
			);
			if (status !== "granted") {
				//Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
				// this.setState({showRecordButton: false});
			} else {
				const result = check();
				if (result) {
					startListening();
					setTimeout(() => {
						stopListening();
						setVisible(false);
					}, 3000);
				}
			}
		};
	});
	return (
		<Modal
			animationType="slide"
			visible={visible}
			transparent={true}
			onRequestClose={() => {
				console.log("Modal Closed");
			}}
		>
			<View style={styles.modal}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => {
							Voice.cancel()
								.then((res) => console.log(res))
								.catch((err) => console.log(err));
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
