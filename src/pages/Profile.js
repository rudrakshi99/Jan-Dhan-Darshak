import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { updateProfile } from '../https/auth'
import * as SecureStore from 'expo-secure-store';
import { flashMessage } from '../lottie/flashMessage'
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import Loader from '../components/Loader'

const Profile = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const alreadyLogin = async () => {
            const name = await SecureStore.getItemAsync('name');
            setName(name);
            setEmail(await SecureStore.getItemAsync("email"));
            if(!name) {
                navigation.push('Home');
            }
        }
        alreadyLogin();
    }, []);

    const handleSubmit = async () => {
        
        if( !email || !name ) {
            setError('All fields are required !');
            flashMessage('All fields are required !', 'danger');
            return;
        }

        try {
            setIsLoading(true);
            const userId = await SecureStore.getItemAsync('userId');
            const accessToken = await SecureStore.getItemAsync('accessToken');
            
            const data = await updateProfile({ userId, accessToken, name, email });
            console.log(data, 'data');
            if(data?.success === true) {
                console.log('Success profile');
                flashMessage(data?.message, 'success');
				await SecureStore.setItemAsync("name", name);
				await SecureStore.setItemAsync("email", email);
				navigation.push("Home");
            }
        } catch(err) {
            console.log(err?.response?.data);
            flashMessage(err?.response?.data, 'danger');
            // setError(err?.response?.data);
        } finally {
            setIsLoading(false);
        }
    }
 
    if(isLoading) return <Loader />
    else
    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                
                <View className='flex-1 flex-col items-center justify-center -mt-28 bg-white relative'>
                  <TouchableOpacity onPress={() => navigation.navigate('Find')} className='absolute top-[17%] left-5 rounded-full'
                  >
                    <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                  </TouchableOpacity>
                    <Image 
                        source={require('../assets/images/logo.png')}
                        resizeMode="contain"
                        className='h-32 w-64'
                    />

                    <Text className='text-center text-[28px] text-[#101010] pt-4 mb-1 font-bold'>Update Profile</Text>
                    <Text className='text-center text-[16px] text-[#8E8E8E] font-normal'>Enter the details to be updated</Text>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={{height: '28%'}}
                    >
                    <View className='flex-col items-center justify-center space-y-6'>
                        <Text className='text-[16.5px] font-semibold text-[#e35944] -mb-3'>{error}</Text>
                        
                        <TextInput onChangeText={val => setName(val)} defaultValue={name} placeholder='Name' className='h-10 w-72 border border-gray-400 text-[16px] px-4 py-0' keyboardType='default' maxLength={50} />

                        <TextInput onChangeText={val => setEmail(val)} defaultValue={email} placeholder='Email' className='h-10 w-72 border border-gray-400 text-[16px] px-4 py-0' keyboardType='email-address' maxLength={50} />

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className='bg-[#2C81E0] mx-8 mt-6 p-3 w-72 rounded-lg flex-row items-center'
                        >
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Update</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
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

export default Profile