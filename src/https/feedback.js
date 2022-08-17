import api from './api';

export const createFeedback = async ({ accessToken, ...body }) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('/feedback/developer', body, config);
    console.log(data, 'auth');
    return data;
}


export const getFinancialPoints = async () => {
    const { data } = await api.get('/feedback/financial-list');
    return data;
}


export const createFinancialPoint = async ({ accessToken, ...body }) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('/feedback/financial/', body, config);
    console.log(data, 'auth');
    return data;
}