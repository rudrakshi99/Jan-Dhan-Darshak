import api from './api';

export const createFeedback = async (body) => {
    console.log(body, 'body feedback');
    const { data } = await api.post('/feedback/developer', body);
    console.log(data, 'feedback');
    return data;
}


export const getFinancialPoints = async () => {
    const { data } = await api.get('/feedback/financial-list');
    return data;
}


export const createFinancialPoint = async ({ accessToken, ...body }) => {
    console.log(body, 'financial point');
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('/feedback/financial', body, config);
    console.log(data, 'financial point');
    return data;
}