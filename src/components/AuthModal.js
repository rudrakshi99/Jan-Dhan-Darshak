import React, { useEffect } from "react";
import {
    View,
    Platform,
    TouchableOpacity,
    Text,
    Modal,
    Dimensions,
    StyleSheet,
    Image,
} from "react-native";
import { XIcon } from "react-native-heroicons/outline";
import { useAuthRequest } from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

import {
    WEB_CLIENT_ID,
    ANDROID_CLIENT_ID,
    IOS_CLIENT_ID,
    MY_SECURE_AUTH_STATE_KEY,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

const AuthModal = ({ show, setShow }) => {
    const [request, response, promptAsync] = useAuthRequest({
        expoClientId: WEB_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        selectAccount: true,
    });

    useEffect(() => {
        WebBrowser.warmUpAsync();
        if (response?.type === "success") {
            const auth = response.authentication.accessToken;
            console.log(auth);
            // Securely store the auth on your device
            SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, auth);
            setShow(false);
        }
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    return (
        <Modal
            animationType="slide"
            visible={show}
            transparent
            onRequestClose={() => {
                setShow(false);
                if (!response?.type === "success") {
                    //push back to previous page.
                }
            }}
        >
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Text style={styles.heading}>Login to continue</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShow(false);
                        }}
                    >
                        <XIcon
                            style={styles.iconHeader}
                            size={30}
                            color="#101010"
                        />
                    </TouchableOpacity>
                </View>
                {Platform.OS === "ios" ? (
                    <TouchableOpacity>
                        <Text>Login with Apple ID</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        disabled={!request}
                        onPress={() => promptAsync({ useProxy: true })}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={require("../assets/icons/google-sign-in.png")}
                            style={{ transform: [{ scale: 0.8 }] }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 25,
        position: "absolute",
        bottom: -30,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 60,
    },
    headContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 30,
    },
    iconHeader: {
        transform: [{ translateY: -10 }],
    },
});

export default AuthModal;
