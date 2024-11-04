import React, {useEffect, useState} from 'react';
import classes from "./DialogsPage.module.css";
import {useAuth} from "../../../routing/hooks/useAuth";
import {useLocation} from "react-router-dom";
import {io} from "socket.io-client"
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import {SOCKET_BASE_URL} from "../../../constants/api";
import {getAllFromDialog, getUserDialogs} from "../api";

const DialogsPage = () => {
    const {user} = useAuth()
    const location = useLocation()
    const [currentDialog, setCurrentDialog] = useState({})
    const [fetchedDialogs, setFetchedDialogs] = useState([])

    const [companionName, setCompanionName] = useState('')
    const [companionId, setCompanionId] = useState('')

    const [socket, setSocket] = useState(null)

    // Получение сокета
    useEffect(()=>{
       const newSocket = io(SOCKET_BASE_URL);
       setSocket(newSocket)

        return () => {
           newSocket.disconnect()
        }
    }, [user])

    // Подключение пользователя
    useEffect(()=>{
        if (!socket) return
        socket.emit('addNewUser', user?.id)
    }, [socket])

    useEffect(() => {
        fetchDialogs(user.id)
    }, []);

    const fetchDialogs = async (userId) => {
        try {
            const response = await getUserDialogs(userId, user.token)
            setFetchedDialogs(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchMessagesAndSetDialog = async (dialog) => {
        try {
            const response = await getAllFromDialog(dialog._id, user.token)
            setCurrentDialog({...dialog, messages: response.data})

            if (dialog.firstUser === user.id) {
                setCompanionId(dialog.secondUser)
                setCompanionName(dialog.secondUserName)
            } else {
                setCompanionId(dialog.firstUser)
                setCompanionName(dialog.firstUserName)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // Получение диалогов
    useEffect(()=>{
        const dialogId = location.state?.dialogId
        const firstUser = location.state?.firstUser
        const firstUserName = location.state?.firstUserName
        const secondUser = location.state?.secondUser
        const secondUserName = location.state?.secondUserName

        if (dialogId) {
            fetchMessagesAndSetDialog({_id: dialogId, firstUser, firstUserName, secondUser, secondUserName})
        }
    }, [])

    // Получение сообщения из сокетов
    useEffect(()=>{
        if (!socket) return

        socket.on('getMessage', (message)=>{
            if (currentDialog._id === message.dialog) {
                setCurrentDialog({...currentDialog, messages: [...currentDialog.messages, message]})
            }
            fetchDialogs(user.id)
        })
    }, [socket, currentDialog])

    const sendMessageCallback = (currentDialog) => {
        fetchMessagesAndSetDialog(currentDialog)
        fetchDialogs(user.id)
    }

    return (
        <div className={classes.content}>
            <Sidebar
                fetchedDialogs={fetchedDialogs}
                currentDialog={currentDialog}
                fetchMessagesAndSetDialog={fetchMessagesAndSetDialog}
            />
            <Chat
                currentDialog={currentDialog}
                companionName={companionName}
                companionId={companionId}
                socket={socket}
                sendMessageCallback={sendMessageCallback}
            />
        </div>
    );
};

export default DialogsPage;