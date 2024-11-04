import React, {useEffect, useRef, useState} from 'react';
import classes from "./Chat.module.css";
import chats from "../../../../assets/svg/chats.svg";
import {useAuth} from "../../../../routing/hooks/useAuth";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import {createMessage} from "../../api";


const Chat = ({currentDialog, companionName, companionId, socket, sendMessageCallback}) => {
    const [message, setMessage] = useState('')

    const {user} = useAuth()

    const dialogRef = useRef(null)

    const sendMessage = async () => {
        try {
            await createMessage(currentDialog, user, message, socket)
            setMessage('')
            await sendMessageCallback(currentDialog)
        } catch (e) {
            console.log(e)
        }
    }

    // Передвинуть диалог на последние сообщение
    useEffect(()=>{
        if (currentDialog.messages) {
            dialogRef.current.scrollTop = dialogRef.current.scrollHeight
        }
    },[currentDialog])

    return (currentDialog.messages?
        <div className={classes.dialog}>
            <ChatHeader
                companionId={companionId}
                companionName={companionName}
            />
            <ChatMessages
                dialogRef={dialogRef}
                dialog={currentDialog}
            />
            <ChatInput
                message={message}
                setMessage={setMessage}
                createMessage={sendMessage}
            />
        </div>
        :
        <div className={classes.tip}>
            <img src={chats} alt='chats'/>
            <div>Выберите чат для начала общения</div>
        </div>
    );
};

export default Chat;