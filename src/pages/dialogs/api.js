import axios from "axios";
import {API_BASE_URL} from "../../constants/api";

export const createMessage = async (dialog, user, message, socket) => {
    try {
        const params = {
            dialog: dialog._id,
            sender: user.id,
            senderName: user.name + ' ' + user.surname,
            receiver: dialog.firstUser === user.id ? dialog.secondUser : dialog.firstUser,
            receiverName: dialog.firstUser === user.id ? dialog.secondUserName : dialog.firstUserName,
            text: message,
            token: user.token
        }

        if (socket)
            socket.emit('sendMessage', {...params})

        return axios.post(`${API_BASE_URL}/messages/create`, params)

    } catch (e) {
        console.error(e)
        throw e;
    }
}

export const getAllFromDialog = async (dialogId, userToken) => {
    try {
        return axios.get(`${API_BASE_URL}/messages/getAllFromDialog/${dialogId}`, {headers: {token: userToken}})
    } catch (e) {
        console.error(e)
        throw e;
    }
}

export const getUserDialogs = async (userId, userToken) => {
    try {
        return axios.get(`${API_BASE_URL}/dialogs/getAllUsersDialogs/${userId}`, {headers: {token: userToken}})
    } catch (e) {
        console.error(e)
        throw e;
    }
}