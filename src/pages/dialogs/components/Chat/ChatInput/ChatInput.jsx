import React from 'react';
import classes from "./ChatInput.module.css";
import AutoResizeTextarea from "../../../../../UI/AutoResizeTextarea";
import send from "../../../../../assets/svg/post.svg";

const ChatInput = ({message, setMessage, createMessage}) => {
    return (
        <div className={classes.dialogFooter}>
            <AutoResizeTextarea text={message} setText={setMessage} placeholder='Введите сообщение' maxLength={1000}/>
            <img src={send} alt='sendMessage' onClick={createMessage}/>
        </div>
    );
};

export default ChatInput;