import React from "react";
import { View, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";

function Loader() {
	const animationRef = React.useRef(null);
	React.useEffect(() => {
		animationRef.current?.play();
	}, []);
	return (
		<View style={styles.container}>
			<Lottie
				source={require("../lottie/loading.json")}
				autoplay={true}
				ref={animationRef}
				loop={true}
				style={styles.lottie}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	lottie: {
		height: 200,
		width: 200,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Loader;
