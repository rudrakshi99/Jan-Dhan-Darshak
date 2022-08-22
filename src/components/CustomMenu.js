import React from "react";
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CustomMenu = (props) => {
    const [customer, setCustomer] = useState("");
    const navigation = useNavigation();
    
    const getToken = async () => {
        setCustomer(await SecureStore.getItemAsync('name'));
    }
    getToken();

    return (
        <View style={styles.container}>
            {customer ? <TouchableOpacity className='flex-row items-center mt-6 justify-end'>
                <Icon name="edit" size={16} color="#2C81E0" />
                <Text className='text-right pl-[2px] pr-4 text-[14px] font-normal text-[#2C81E0]'>Edit Profile</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate('Logout')} className='flex-row items-center mb-4 mt-2 justify-end'>
                    <Icon1 name="logout" size={16} color="#DB0E0E" />
                    <Text className='text-right pl-[3px] pr-4 text-[15px] font-semibold text-[#DB0E0E]'>Logout</Text>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Login')} className='flex-row items-center mb-4 mt-2 justify-end'>
                    <Icon1 name="login" size={16} color="#2C81E0" />
                    <Text className='text-right pl-[3px] pr-4 text-[15px] font-semibold text-[#2C81E0]'>Login</Text>
                </TouchableOpacity>
            )}
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
});

export default CustomMenu;
