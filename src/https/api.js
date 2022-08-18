import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { BACKEND_URL } from "@env";

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// Axios Interceptors 
// api.interceptors.response.use(
//     (config) => {
//         return config;
//     }, 
//     async (error) => {
//         const refreshToken = await SecureStore.getItemAsync('refreshToken');
//         console.log(refreshToken, 'api axios');
//         const originalRequest = error.config;
//         if(error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
//             originalRequest._isRetry = true;
    
//             try {
//                 const { data } = await axios.post('http://192.168.207.154:5000/api/refresh', { refreshTokenFromCookie: refreshToken });
//                 console.log(data, 'coming refresh');
//                 await SecureStore.setItemAsync('accessToken', data.accessToken);
//                 await SecureStore.setItemAsync('refreshToken', data.refreshToken);

//                 originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

//                 console.log('Refresh used setted');
//                 return api.request(originalRequest);
    
//             } catch(err) {
//                 console.log(err.message);
//             }
//         }
//     throw error;
// });


export default api;