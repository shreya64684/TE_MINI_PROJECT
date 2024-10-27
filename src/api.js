import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username, password, userType) => {
    const response = await axios.post(`${API_URL}/register`, { username, password, userType });
    return response.data;
};

export const login = async (username, password, userType) => {
    const response = await axios.post(`${API_URL}/login`, { username, password, userType });
    return response.data;
};
