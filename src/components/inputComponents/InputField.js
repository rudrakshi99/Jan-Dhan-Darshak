import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { MicrophoneIcon } from "react-native-heroicons/outline";
import { Audio } from 'expo-av';

const InputField = ({ multi, inputname, onChangeText, name, placeholder, recording, setRecording, uri, setUri }) => {
    // const [sound, setSound] = useState();

    const startRecording = async () => {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const {recording} = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
         );;
          setRecording(recording);
          console.log(recording, 'recojaof');
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
    
    const  stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setUri(uri);
        console.log('Recording stopped and stored at', uri);
    }

//   async function playSound() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(
//         { uri: uri },
//         { shouldPlay: true }
//     );
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync(); }

//     useEffect(() => {
//         return sound
//         ? () => {
//             console.log('Unloading Sound');
//             sound.unloadAsync(); }
//         : undefined;
//     }, [sound]);

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
                        onPress={() => recording ? stopRecording() : startRecording()}
                        style={styles.microIcon}
                        size={23}
                        color="#8E8E8E"
                    />
                    {/* <Button
                        title="Play Audio"
                        onPress={() => playSound()}
                    /> */}
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
