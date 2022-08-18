import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Map from "../Map";
import HeaderCard from "../subcomponents/HeaderCard";
import * as Location from "expo-location";
import axios from "axios";
import { BASE_URL, API_KEY } from "@env";
import InputField from "../inputComponents/InputField";
import { useNavigation } from "@react-navigation/native";
import {
    ArrowNarrowLeftIcon,
    CheckCircleIcon,
} from "react-native-heroicons/outline";

const MissingBankSuggestion = () => {
    const [confirmLocation, setConfirmLocation] = useState(false);
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [formDetails, setFormDetails] = useState({
        name: "",
        location: "",
        details: "",
    });
    const focused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState(
        "B-47 Sector C, Aliganj, Lucknow, Uttar Pradesh, India"
    );
    const navigation = useNavigation();

    useEffect(() => {
        async function getGeocodedAddress() {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            // const result = await axios.get(
            //     `${BASE_URL}maps/api/geocode/json?latlng=${
            //         latitude + "," + longitude
            //     }&key=${API_KEY}`
            // )
            // console.log(result.data.results[0].formatted_address);
            // setAddress(result.data.results[0].formatted_address);
        }
        getGeocodedAddress();
    }, [focused]);

    const handleFormChange = () => {
        const newDetails = { name: name, location: location, details: details };
        setFormDetails(newDetails);
        // console.log(newDetails);
        setModalVisible(true);
    };
    return (
        <View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <CheckCircleIcon color="#34994C" />
                            <Text style={styles.modalText}>Submitted</Text>
                            <Text style={styles.modalSubText}>
                                Thank you for filling out the Form.
                            </Text>
                            <Text style={styles.trackID}>
                                Track ID: 4855682
                            </Text>
                            <View style={styles.modalButtons}>
                                <Pressable
                                    style={[styles.button, styles.trackButton]}
                                >
                                    <Text style={styles.trackstyle}>
                                        Track Request
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            {!confirmLocation ? (
                <View style={styles.container}>
                    <HeaderCard
                        heading="Suggestion"
                        text="Suggest Missing Bank or FInancial Points"
                    />
                    <Map />
                    <View style={styles.bottomBox}>
                        <View style={styles.locationBox}>
                            <Text style={styles.locationText}>
                                Select Location
                            </Text>
                            <Text style={styles.locationText}>Step 1/2</Text>
                        </View>

                        <View style={styles.locationBox}>
                            <Text style={styles.address}>{address}</Text>
                            <TouchableOpacity style={styles.changeBtn}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setConfirmLocation(!confirmLocation);
                            }}
                            style={styles.buttonBox}
                        >
                            <Text style={styles.button}>Confirm Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.innerContainer}>
                        <Map />
                    </View>
                    <TouchableOpacity
                        style={styles.iconHeader}
                        onPress={() => {
                            setConfirmLocation(!confirmLocation);
                        }}
                    >
                        <ArrowNarrowLeftIcon size={30} color="#101010" />
                    </TouchableOpacity>
                    <View style={styles.missingform}>
                        <View style={styles.formTopText}>
                            <Text style={styles.missingformtext}>
                                Fill the Details
                            </Text>
                            <Text style={styles.missingformtext}>Step 2/2</Text>
                        </View>
                        <View style={styles.selectPoint}>
                            <Text style={styles.textSelectPoint}>
                                Select a Financial Point{" "}
                                <Text style={styles.downarrow}>⌄</Text>
                            </Text>
                        </View>
                        <InputField
                            onChangeText={(e) => {
                                setName(e);
                            }}
                            inputname="Enter Name"
                            name="name"
                            placeholder="Full name of the location"
                        />
                        <InputField
                            onChangeText={(e) => {
                                setLocation(e);
                            }}
                            inputname="Address"
                            name="address"
                            placeholder="Address of the Financial Point"
                        />
                        <InputField
                            onChangeText={(e) => {
                                setDetails(e);
                            }}
                            multi={true}
                            inputname="Other Details (Optional)"
                            name="name"
                            placeholder="provide any additional information..."
                        />
                        <TouchableOpacity
                            onPress={handleFormChange}
                            style={styles.formSubmit}
                        >
                            <Text style={styles.button}>Confirm Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomBox: {
        height: 180,
        marginVertical: 26,
        marginHorizontal: 20,
        background: "#F9F9F9",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.12)",
    },
    locationBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 18,
    },
    locationText: {
        fontSize: 18,
        color: "#8E8E8E",
        fontWeight: "400",
    },
    address: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "justify",
        color: "#101010",
        paddingRight: 20,
        width: Dimensions.get("window").width / 1.5,
    },
    changeBtn: {
        borderColor: "#292C31",
        borderWidth: 1,
        borderRadius: 4,
    },
    changeText: {
        paddingVertical: 13,
        paddingHorizontal: 25,
        fontSize: 15,
        fontWeight: "500",
        color: "#292C31",
    },
    buttonBox: {
        position: "absolute",
        bottom: 0,
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
    innerContainer: {
        width: Dimensions.get("window").width,
        flex: 1,
    },
    iconHeader: {
        marginTop: 15,
        marginLeft: 15,
        position: "absolute",
    },
    missingform: {
        width: "85%",
        marginHorizontal: "7.5%",
        marginVertical: 20,
        height: "100%",
    },
    missingformtext: {
        color: "#8E8E8E",
        fontSize: 14,
        fontWeight: "700",
        paddingBottom: 10,
    },
    selectPoint: {
        color: "#8E8E8E",
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#2C81E0",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        marginBottom: 10,
    },
    textSelectPoint: {
        color: "#2C81E0",
        paddingTop: 5,
        paddingBottom: 15,
    },
    downarrow: {
        fontSize: 24,
        color: "#2C81E0",
    },
    formSubmit: {
        height: 50,
        width: "100%",
        backgroundColor: "#292C31",
        borderRadius: 5,
    },
    formTopText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonClose: {
        backgroundColor: "#292C31",
        borderRadius: 4,
        marginHorizontal: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    modalSubText: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 12,
    },
    trackID: {
        marginBottom: 15,
        fontSize: 14,
        fontWeight: "bold",
    },
    modalButtons: {
        display: "flex",
        flexDirection: "row",
    },
    trackButton: {
        fontSize: 14,
        backgroundColor: "#fff",
        borderRadius: 4,
        borderWidth: 1,
        marginHorizontal: 10,
    },
    trackstyle: {
        color: "#101010",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default MissingBankSuggestion;