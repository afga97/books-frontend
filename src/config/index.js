import axios from 'axios';

export const URL = "http://localhost:3008/"

export const AXIOS = axios.create({
    baseURL: URL,
});