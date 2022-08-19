import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';

const Logout = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const isLogin = async () => {
            const name = await SecureStore.getItemAsync('name');
            if(!name) {
                navigation.push('Home');
            }
        }
        isLogin();
    }, []);
    

    const handleLogout = async () => {
        await SecureStore.setItemAsync('accessToken',"");
        await SecureStore.setItemAsync('name',"");
        await SecureStore.setItemAsync('refreshToken',"");
        await SecureStore.setItemAsync('userId',"");
        await SecureStore.setItemAsync('phone',"");

        navigation.push('Home');
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Do you want to logout ?</Text>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleLogout()}
                >
                    <Text style={styles.textStyle}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 12,
    width: 200,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginLeft: 14,
    backgroundColor: "#db5a5a",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',

  }
});

export default Logout;