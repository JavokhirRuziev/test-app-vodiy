import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://dummyjson.com',
});
