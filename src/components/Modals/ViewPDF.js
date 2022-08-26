import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

export default function ViewPDF(uri) {
	const route = useRoute();
	const PdfReader = ({ url: uri }) => (
		<WebView
			javaScriptEnabled={true}
			style={{ flex: 1 }}
			source={{ uri }}
		/>
	);
	return (
		<View style={styles.container}>
			<PdfReader url={route.params.uri} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 25,
	},
	pdf: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
