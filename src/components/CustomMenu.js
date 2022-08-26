import React, { useEffect } from "react";
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { flashMessage } from "../lottie/flashMessage";

const CustomMenu = (props) => {
    const [customer, setCustomer] = useState("");
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const getToken = async () => {
            setCustomer(await SecureStore.getItemAsync('name'));
        }
        getToken();
    }, []);

    const handleLogout = async () => {
        flashMessage("User logged out successfully", 'success');
        await SecureStore.setItemAsync('accessToken',"");
        await SecureStore.setItemAsync('name',"");
        await SecureStore.setItemAsync('refreshToken',"");
        await SecureStore.setItemAsync('userId',"");
        await SecureStore.setItemAsync('phone',"");
        await SecureStore.setItemAsync('email',"");

        navigation.push('Home');
    }

    return (
        <View style={!modalVisible ? styles.container : styles.modalContainer}>
            {customer ? <TouchableOpacity onPress={() => navigation.navigate('Profile')} className='flex-row items-center mt-10 justify-end'>
                <Icon name="edit" size={16} color="#2C81E0" />
                <Text className='text-right pl-[2px] pr-4 text-[12px] font-normal text-[#2C81E0]'>Edit Profile</Text>
            </TouchableOpacity> : null}
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.heading}>Jan Dhan Darshak</Text>
            <View className='h-1 bg-[#EAEAEA]'></View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View className='h-1 bg-[#EAEAEA]'></View>
            {customer ? ( 
                <View className='flex-row items-center justify-between ml-4'>
                    <TouchableOpacity onPress={() => navigation.navigate('SavePrivateInfo')} className='flex-row items-center mb-4 mt-2 justify-end'>
                        <Icon2 name="lock" size={12} color="#34994C" />
                        <Text className='text-right pl-[3px] pr-4 text-[12px] font-semibold text-[#34994C]'>Info Vault</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)} className='flex-row items-center mb-4 mt-2 justify-end'>
                        <Icon1 name="logout" size={12} color="#DB0E0E" />
                        <Text className='text-right pl-[3px] pr-4 text-[12px] font-semibold text-[#DB0E0E]'>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Login')} className='flex-row items-center mb-4 mt-2 justify-end'>
                    <Icon1 name="login" size={12} color="#2C81E0" />
                    <Text className='text-right pl-[3px] pr-4 text-[12px] font-semibold text-[#2C81E0]'>Login/Register</Text>
                </TouchableOpacity>
            )}

            {
                modalVisible ? (
                    // <View style={styles.modalContainer}>
                        <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText} className='text-lg text-[#484848] font-semibold'>Do you want to logout?</Text>
                                    <View className='flex-row space-x-5'>
                                        <TouchableOpacity
                                            // style={[styles.button, styles.buttonClose]}
                                            className='bg-[#2C81E0] mx-2 mt-2 px-5 py-1 rounded-lg flex-row items-center'
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text className='flex-1 text-white font-semibold text-lg text-center'>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className='bg-[#db5a5a] mx-2 mt-2 px-5 py-1 rounded-lg flex-row items-center'
                                            onPress={() => handleLogout()}
                                        >
                                            <Text className='flex-1 text-white font-semibold text-lg text-center'>Logout</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    // </View>
                ) : null
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        height: Dimensions.get("window").height / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    image: { height: 130, width: 85 },
    heading: {
        fontSize: 22,
        marginTop: -20,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 15,
    },

    modalContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },

    centeredView: {
        // flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        top: 250
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
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default CustomMenu;
