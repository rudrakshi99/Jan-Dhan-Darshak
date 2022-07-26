import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";

//Screens
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        screenOptions={{
                            headerShown: true,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
