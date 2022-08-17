import React from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

function Navigation() {
	const route = useRoute();
	const params = route.params;
	return (
		<View>
			<Text>Navigation Screen</Text>
		</View>
	);
}

export default Navigation;
