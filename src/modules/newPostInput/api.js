import axios from "axios";
import {API_BASE_URL} from "../../constants/api";

export const createPost = async (currentUser, text) => {
    try {
        const params = {
            author: currentUser.id,
            authorName: `${currentUser.name} ${currentUser.surname}`,
            content: text,
            token: currentUser.token
        }

        await axios.post(`${API_BASE_URL}/posts/create`, params)
    } catch (e) {
        console.log(e)
        throw e
    }
}