import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../../https/auth'

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');

    const handleSubmit = async () => {
        if( !phone ) {
            return;
        }

        try {
            // const data = await login({ phone });
            // console.log(data, 'data');
            // dispatch(setOtp({ email: data.email, hash: data.hash }));
            navigation.navigate('OTP', {
                phone
            });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                  <TouchableOpacity onPress={() => navigation.navigate('Find')} className='absolute top-[17%] left-5 bg-[#00CCBB] rounded-full'>
                      <XIcon color="white" className='z-999' size={36} />
                  </TouchableOpacity>
                    <Image 
                        source={require('../../assets/images/logo.png')}
                        resizeMode="contain"
                        className='h-32 w-60'
                    />

                    <Text className='text-center text-3xl text-gray-600 p-4 mb-6 font-bold'>Login</Text>

                    <View className='flex-col items-center justify-center space-y-6'>
                        
                        <TextInput onChangeText={val => setPhone(val)} defaultValue={phone} placeholder='Enter your phone number' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='phone-pad' maxLength={50} />

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className='bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                        >
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Request for OTP</Text>
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
    }
})

export default LoginScreen