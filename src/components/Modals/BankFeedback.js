import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import InputField from "../inputComponents/InputField";
import AuthModal from "../AuthModal";

import { MY_SECURE_AUTH_STATE_KEY } from "@env";

const BankFeedback = () => {
    const navigation = useNavigation();
    const focused = useIsFocused();
    const [show, setShow] = useState(true);
    const [user, setUser] = useState();
    const [token, setToken] = useState("");

    useEffect(() => {
        async function getValueFor() {
            try {
                let result = await SecureStore.getItemAsync(
                    MY_SECURE_AUTH_STATE_KEY
                );
                setToken(result);
                console.log(result);
                if (result) {
                    setShow(false);
                    //Access Token
                    let config = {
                        headers: {
                            Authorization: "Bearer " + result,
                        },
                    };
                    console.log(config);
                    const userData = await axios.get(
                        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                        config
                    );
                    setUser(userData.data);
                    console.log(userData.data);
                } else {
                    setShow(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getValueFor();
    }, [focused]);

    const [feedback, setFeedbackInfo] = useState({
        NameOfThePoint: "",
        location: "",
        username: "",
        mobile: "",
        comments: "",
    });
    const [NameOfThePoint, setNameOfThePoint] = useState("");
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [comments, setComments] = useState("");

    async function logout() {
        const res = await SecureStore.deleteItemAsync(MY_SECURE_AUTH_STATE_KEY);
        console.log(res);
    }

    const handleChange = () => {
        setFeedbackInfo({
            NameOfThePoint: NameOfThePoint,
            location: location,
            mobile: mobile,
            username: username,
            comments: comments,
        });
    };
    return (
        <View style={styles.container}>
            {show ? <AuthModal show={show} setShow={setShow} /> : null}
            {user ? (
                <View>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={navigation.goBack}>
                            <ArrowNarrowLeftIcon
                                style={styles.iconHeader}
                                size={30}
                                color="#101010"
                            />
                        </TouchableOpacity>
                        <View style={styles.headingBox}>
                            <Text style={styles.heading}>Feedback</Text>
                            <Text style={styles.smallDesc}>
                                This will be shared with the bank
                            </Text>
                        </View>
                        <Text></Text>
                    </View>
                    <View style={styles.divider}></View>
                    <ScrollView style={styles.forms}>
                        <InputField
                            inputname="Name of the Point"
                            name={feedback.NameOfThePoint}
                            onChangeText={(e) => {
                                setNameOfThePoint(e);
                            }}
                            placeholder="Name of the place"
                        ></InputField>
                        <InputField
                            inputname="Location"
                            name={feedback.location}
                            onChangeText={(e) => {
                                setLocation(e);
                            }}
                            placeholder="Location"
                        ></InputField>
                        <InputField
                            inputname="Your Name"
                            name={feedback.username}
                            onChangeText={(e) => {
                                setUsername(e);
                            }}
                            placeholder="Your Full Name"
                        ></InputField>
                        <InputField
                            inputname="Your Mobile no."
                            name={feedback.mobile}
                            onChangeText={(e) => {
                                setMobile(e);
                            }}
                            placeholder="Your Mobile"
                        ></InputField>
                        <InputField
                            multi={true}
                            inputname="Comments"
                            name={feedback.comments}
                            onChangeText={(e) => {
                                setComments(e);
                            }}
                            placeholder="Please write your feedback here..."
                        ></InputField>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            logout();
                        }}
                        style={styles.buttonBox}
                    >
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

export default BankFeedback;
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginTop: 28,
        marginBottom: 20,
        border: "1px solid black",
        position: "relative",
        height: "85%",
        backgroundColor: "#F1F1F1",
    },
    innerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headingBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    heading: {
        fontSize: 26,
        fontWeight: "600",
        color: "#101010",
        paddingBottom: 5,
    },
    smallDesc: {
        color: "#101010",
    },
    divider: {
        marginTop: 28,
        width: 1000,
        height: 4,
        backgroundColor: "#EAEAEA",
    },
    buttonBox: {
        position: "absolute",
        bottom: -70,
        height: 50,
        width: "100%",
        backgroundColor: "#292C31",
        borderRadius: 5,
    },
    button: {
        color: "#fff",
        textAlign: "center",
        padding: 12,
        fontSize: 17,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});
