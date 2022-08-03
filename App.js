import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { TailwindProvider } from 'tailwindcss-react-native';
import "react-native-gesture-handler";

//Screens
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";

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
                    </Stack.Navigator>
                </TailwindProvider>
            </NavigationContainer>
        </Provider>
    );
}
