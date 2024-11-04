import axios from "axios";
import {API_BASE_URL} from "../../constants/api";

export const changeStatus = async (user, newStatus) => {
    try {
        const params = {
            id: user.id,
            status: newStatus,
            token: user.token
        }
        return await axios.put(`${API_BASE_URL}/users/changeStatus`, params)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const getUserInfo = async (userId) => {
    try {
        return await axios.get(`${API_BASE_URL}/users/getUserInfo/${userId}`)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const getUserPosts = async (userId) => {
    try {
        return await axios.get(`${API_BASE_URL}/posts/getAllUsersPosts/${userId}`)
    } catch (e) {
        console.log(e)
        throw e
    }
}