import axios from "axios";
import {API_BASE_URL} from "../../constants/api";

export const deletePost = async (postId, userToken) => {
    try {
        return await axios.delete(`${API_BASE_URL}/posts/delete/${postId}`, {headers: {token: userToken}})
    } catch (e) {
        console.log(e)
        throw e
    }
}