import api from './api';

export const sendOtp = async (body) => {
    const { data } = await api.post('http://192.168.207.154:5000/api/send-otp', body);
    return data;
}

export const verifyOtp = async (body) => {
    const { data } = await api.post('http://192.168.207.154:5000/api/verify-otp', body);
    return data;
}

export const login = async (body) => {
    const { data } = await api.post('http://192.168.207.154:5000/api/login', body);
    return data;
}

export const loginWithPassword = async (body) => {
    const { data } = await api.post('http://192.168.207.154:5000/api/login-via-password', body);
    return data;
}

export const logout = async ({ accessTokenOrg, refreshTokenOrg }) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessTokenOrg}`,
        }
    }
    const { data } = await api.post('http://192.168.207.154:5000/api/logout', { refreshToken: refreshTokenOrg }, config);
    return data;
}