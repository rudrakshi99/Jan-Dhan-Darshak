import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { verifyOtp } from '../https/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store';

const OtpScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [otp, setOTP] = useState('');

    const { params: { phone }} = useRoute();

    // const { email, hash } = useSelector(state => state.auth.otp);

    const handleOtp = async () => {
        // if(!otp || !email || !hash) {
        //     return;
        // }

        // try {
        //     const data= await verifyOtp({ email, otp, hash });
        //     console.log(data, 'data');
        //     await SecureStore.setItemAsync('accessToken', data.accessToken);
        //     await SecureStore.setItemAsync('refreshToken', data.refreshToken);

        //     console.log(await SecureStore.getItemAsync('accessToken'), 'added');
        //     dispatch(setAuth(data));
        //     navigation.navigate('Home');
        // } catch(err) {
        //     console.log(err);
        // }

    }

    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <XIcon color="green" className='z-50' size={30} />
                </TouchableOpacity>
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className='absolute top-[14%] left-5 bg-[#00CCBB] rounded-full'>
                        <XIcon color="white" className='z-999' size={36} />
                    </TouchableOpacity>

                    <Image 
                        source={require('../assets/images/logo.png')}
                        resizeMode="contain"
                        className='h-32 w-60'
                    />

                    <Text className={`text-center text-3xl text-gray-600 p-4 font-bold`}>Verify OTP</Text>
                    <Text className='text-center text-[15px] text-gray-500 mb-8 font-bold'>A verification code has been sent on your phone.</Text>

                    <View className='flex-col items-center justify-center space-y-6'>

                    <TextInput defaultValue={phone} editable={false} placeholder='Enter your phone number' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                    <TextInput onChangeText={val => setOTP(val)} defaultValue={otp} placeholder='Enter OTP' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='number-pad' maxLength={14} />

                    <TouchableOpacity
                        onPress={() => handleOtp()}
                        className='bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                    >
                        <Text className='flex-1 text-white font-bold text-lg text-center'>Verify OTP</Text>
                    </TouchableOpacity>
                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default OtpScreen