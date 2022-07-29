import React, { useState } from "react";
import { View, Text } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

//Components
import Map from "../components/Map";

import style from "../styles/styles";

const Home = () => {
    const [current, setCurrent] = useState("test");
    return (
        <View style={style.container}>
            <Map />
            <RadioButtonGroup
                containerStyle={style.tabsContainer}
                selected={current}
                onSelected={(value) => setCurrent(value)}
                radioBackground="black"
                radioStyle={{
                    color: "blue",
                }}
            >
                <RadioButtonItem
                    value="Bank"
                    label={
                        <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                            BANKS
                        </Text>
                    }
                />
                <RadioButtonItem
                    value="atm"
                    label={
                        <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                            ATM
                        </Text>
                    }
                />
                <RadioButtonItem
                    value="post office"
                    label={
                        <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                            P.O
                        </Text>
                    }
                />
                <RadioButtonItem
                    value="csc"
                    label={
                        <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                            CSC
                        </Text>
                    }
                />
            </RadioButtonGroup>
        </View>
    );
};

export default Home;
