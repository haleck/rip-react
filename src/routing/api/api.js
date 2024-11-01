import axios from "axios";
import {API_BASE_URL} from "../../constants/api";

export const login = async (email, password) => {
    try {
        const params = {
            email,
            password
        }

        return await axios.post(`${API_BASE_URL}/users/login`, params)
    } catch (e) {
        console.log(e)
    }
}

export const register = async (email, password, name, surname) => {
    try {
        const params = {
            email,
            password,
            name,
            surname
        }

        return await axios.post(`${API_BASE_URL}/users/register`, params)
    } catch (e) {
        console.log(e)
    }
}

export const checkUserExists = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/checkUserExists/${userId}`)
        return response.status === 200;
    } catch (e) {
        console.log(e)
        return false
    }
}