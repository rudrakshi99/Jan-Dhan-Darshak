import React from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "tailwindcss-react-native";
import { useNavigation } from "@react-navigation/native";
import { LogBox, Text, TextInput } from "react-native";
import "react-native-gesture-handler";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

//Screens
import Home from "./src/pages/Home";
import Otp from "./src/components/Modals/Otp";
import Directions from "./src/pages/Directions";
import Navigation from "./src/pages/Navigation";
import Onboarding from "./src/pages/Onboarding";
import LoginScreen from "./src/components/Modals/Login";
import Profile from "./src/pages/Profile";
import LoginScreenViaPhone from "./src/components/Modals/LoginViaPhone";
import FlashMessage from "react-native-flash-message";

import { translations } from "./translations";
import BankFeedback from "./src/components/Modals/BankFeedback";
import BankFaqs from "./src/pages/BankFaq";

const Stack = createNativeStackNavigator();

function App() {
	const i18n = new I18n(translations);
	const navigation = useNavigation();
	i18n.locale = Localization.locale;
	React.useEffect(() => {
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		if (TextInput.defaultProps == null) TextInput.defaultProps = {};
		TextInput.defaultProps.allowFontScaling = false;
		async function isFirstTime() {
			const x = await SecureStore.getItemAsync("isFirstTime");
			if (x == null) {
				navigation.navigate("Onboarding");
			}
		}
		isFirstTime();
		async function checkAuth() {
			try {
				const token = await SecureStore.getItemAsync("accessToken");
				if (!!token) {
					return true;
				}
				return false;
			} catch (err) {
				console.log(err);
			}
		}
		async function getUser() {
			try {
				let user = {};
				user.token = await SecureStore.getItemAsync("accessToken");
				user.name = await SecureStore.getItemAsync("name");
				user.phone_number = await SecureStore.getItemAsync("phone");
				user.id = await SecureStore.getItemAsync("userId");
			} catch (err) {
				console.log(err);
			}
		}
		checkAuth()
			.then((isAuthenticated) => {
				console.log("Authenticated Result ", isAuthenticated);
				if (isAuthenticated) {
					getUser();
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<TailwindProvider>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="LoginViaPhone"
					component={LoginScreenViaPhone}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="OTP"
					component={Otp}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Directions"
					component={Directions}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Navigate"
					component={Navigation}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Onboarding"
					component={Onboarding}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="BankFeedback"
					component={BankFeedback}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Profile"
					component={Profile}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="BankFaqs"
					component={BankFaqs}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
			<FlashMessage position="top" />
		</TailwindProvider>
	);
}

export default function AppWrapper() {
	return (
		<NavigationContainer>
			<App />
		</NavigationContainer>
	);
}
