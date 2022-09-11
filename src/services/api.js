import axios from 'axios';

const api = axios.create({
    baseURL: ' https://contact-app-bb9gk.ondigitalocean.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;