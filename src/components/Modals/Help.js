import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text } from "react-native";
import AuthModal from "../AuthModal";
import axios from "axios";

import { MY_SECURE_AUTH_STATE_KEY } from "@env";

const Help = () => {
    const [show, setShow] = useState(true);
    const [user, setUser] = useState();

    console.log(user);

    useEffect(() => {
        async function getValueFor() {
            try {
                let result = await SecureStore.getItemAsync(
                    MY_SECURE_AUTH_STATE_KEY
                );
                //Access Token
                let config = {
                    headers: {
                        Authorization: "Bearer " + result,
                    },
                };
                const userData = await axios.get(
                    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                    config
                );
                setUser(userData.data);
                if (result === null) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getValueFor();
    }, []);

    return (
        <View>
            {show ? <AuthModal show={show} setShow={setShow} /> : null}
            {user ? (
                <View>
                    <Text>FeedBack Form</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.given_name}</Text>
                    <Text>{user.family_name}</Text>
                </View>
            ) : null}
        </View>
    );
};

export default Help;
