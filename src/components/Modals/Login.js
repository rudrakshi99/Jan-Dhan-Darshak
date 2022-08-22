import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { sendOtp } from '../../https/auth'
import * as SecureStore from 'expo-secure-store';
import { flashMessage } from '../../lottie/flashMessage'
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const alreadyLogin = async () => {
            const name = await SecureStore.getItemAsync('name');
            if(name) {
                navigation.push('Home');
            }
        }
        alreadyLogin();
    }, []);

    const handleSubmit = async () => {
        if( !phone || !name ) {
            setError('All fields are required !');
            flashMessage('All fields are required !', 'danger');
            return;
        }
        const checkValid = phone.length === 10;
        if(!checkValid) {
            flashMessage('Invalid phone number !', 'danger');
            setError('Invalid phone number !');
            return;
        }
        console.log(name, ' ', phone);

        try {
            const data = await sendOtp({ name, email, phone_number: phone });
            console.log(data, 'data');
            if(data?.success === true) {
                flashMessage(data?.message, 'success');
                await SecureStore.setItemAsync('phone', phone);
               
                navigation.navigate('OTP');
            }
        } catch(err) {
            console.log(err?.response?.data);
            flashMessage(err?.response?.data, 'danger');
            // setError(err?.response?.data);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                
                <View className='flex-1 flex-col items-center justify-center -mt-28 bg-white relative'>
                  <TouchableOpacity onPress={() => navigation.navigate('Find')} className='absolute top-[17%] left-5 rounded-full'
                  >
                    <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                  </TouchableOpacity>
                    <Image 
                        source={require('../../assets/images/logo.png')}
                        resizeMode="contain"
                        className='h-32 w-64'
                    />

                    <Text className='text-center text-[28px] text-[#101010] pt-4 mb-1 font-bold'>Sign Up/Login</Text>
                    <Text className='text-center text-[16px] text-[#8E8E8E] font-normal'>Login via OTP</Text>

                    <View className='flex-col items-center justify-center space-y-6'>
                        <Text className='text-[16.5px] font-semibold text-[#e35944] -mb-3'>{error}</Text>
                        
                        <TextInput onChangeText={val => setName(val)} defaultValue={name} placeholder='Name' className='h-10 w-72 border border-gray-400 text-[16px] px-4 py-0' keyboardType='default' maxLength={50} />

                        <TextInput onChangeText={val => setEmail(val)} defaultValue={email} placeholder='Email (Optional)' className='h-10 w-72 border border-gray-400 text-[16px] px-4 py-0' keyboardType='email-address' maxLength={50} />

                        <View className='flex flex-row'>
                            <TextInput defaultValue="+91" editable={false} className='h-10 w-12 border bg-white border-gray-400 text-[16px] text-black font-normal px-2 py-0' />
                            <TextInput onChangeText={val => setPhone(val)} defaultValue={phone} placeholder='Mobile Number' className='h-10 w-60 border border-gray-400 text-[16px] px-4 py-0' keyboardType='phone-pad' maxLength={10} />
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className='bg-[#2C81E0] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                        >
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Get OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    upperContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#101010'
    },
})

export default LoginScreen