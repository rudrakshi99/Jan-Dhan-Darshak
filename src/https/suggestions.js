import api from './api';

export const createSuggestion = async (accessToken,body ) => {
    console.log(body,'suggestion')
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('/suggestions/', body, config);
    console.log(data, 'create suggestions');
    return data;
}

export const SuggestionByUser = async (accessToken,body ) => {
    console.log(body,'suggestion')
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('/suggestions/usertrack/', body, config);
    console.log(data, 'create suggestions');
    return data;
}

export const getDatesOfCalendar = async (code) => {
    console.log(code,'calendar')
    console.log(`/financialpoint/?state=${code}`, 'url');
    const { data } = await api.get(`/financialpoint/?state=${code}`);
    console.log(data, 'dates calendar');
    return data;
}