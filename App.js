import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { TailwindProvider } from "tailwindcss-react-native";
import "react-native-gesture-handler";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

//Screens
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";
import Otp from "./src/components/Modals/Otp";
import Directions from "./src/pages/Directions";
import Navigation from "./src/pages/Navigation";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TailwindProvider>
					<Stack.Navigator initialRouteName="Splash">
						<Stack.Screen
							name="Splash"
							component={Splash}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Home"
							component={Home}
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
					</Stack.Navigator>
				</TailwindProvider>
			</NavigationContainer>
		</Provider>
	);
}
