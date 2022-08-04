import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MicrophoneIcon } from "react-native-heroicons/outline";
const InputField = ({ multi, inputname, onChangeText, name, placeholder }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputLabel}> {inputname}</Text>
            {multi ? (
                <View style={styles.filterWrapper}>
                    <TextInput
                        style={styles.commentFieldStyle}
                        multiline
                        name={name}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                    ></TextInput>
                    <MicrophoneIcon
                        style={styles.microIcon}
                        size={23}
                        color="#8E8E8E"
                    />
                </View>
            ) : (
                <TextInput
                    style={styles.inputFieldStyle}
                    name={name}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                ></TextInput>
            )}
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    inputLabel: {
        color: "#8E8E8E",
        fontSize: 14,
        paddingBottom: 10,
    },
    inputFieldStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#C8CACB",
        borderRadius: 4,
        color: "#8E8E8E",
        paddingLeft: 20,
    },
    commentFieldStyle: {
        flex: 1,
        height: 116,
        width: "100%",
        paddingLeft: 20,
        paddingBottom: 60,
        fontSize: 12,
        color: "#8E8E8E",
        borderWidth: 1,
        borderRadius: 4,
    },
    filterWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D0D0D0",
        borderWidth: 1,
        borderRadius: 5,
    },

    microIcon: {
        position: "absolute",
        right: 20,
        top: 20,
        color: "#2C81E0",
    },
});
