import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Adjust the baseURL according to your backend setup
});

export default instance;