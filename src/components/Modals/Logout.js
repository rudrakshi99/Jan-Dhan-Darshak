import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { XIcon } from "react-native-heroicons/outline";
import { showMessage } from "react-native-flash-message";
import { flashMessage } from "../../lottie/flashMessage";

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
        flashMessage("User logged out successfully", 'success');
        await SecureStore.setItemAsync('accessToken',"");
        await SecureStore.setItemAsync('name',"");
        await SecureStore.setItemAsync('refreshToken',"");
        await SecureStore.setItemAsync('userId',"");
        await SecureStore.setItemAsync('phone',"");

        navigation.push('Home');
    }

    return (
        <View style={styles.centeredView}>
          <TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute top-[2%] left-6 bg-[#2C81E0] rounded-full"
					>
						<XIcon color="white" className="z-999" size={36} />
					</TouchableOpacity>
            <View style={styles.modalView}>
            <Image
                        source={require('../../assets/images/logo.png')}
                        resizeMode="contain"
                        className='h-36 w-64'
                        style={{ marginTop: -100, marginBottom: 40 }}
                    />
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
});

export default Logout;