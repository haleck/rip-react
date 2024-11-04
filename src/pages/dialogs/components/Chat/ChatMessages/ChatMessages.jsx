import React from 'react';
import classes from "./ChatMessages.module.css";
import userPhoto from "../../../../../assets/svg/userPhoto.svg";
import {addLineBreaks} from "../../../../../utils/format";

const ChatMessages = ({dialogRef, dialog}) => {
    return (
        <div className={classes.dialogMessages} ref={dialogRef}>
            {dialog.messages.length > 0?
                dialog.messages.map((message, index)=>
                    dialog.messages[index-1]?.sender !== dialog.messages[index]?.sender ?
                        <div className={classes.dialogMessage} key={index}>
                            <img src={userPhoto} alt='userPhoto'/>
                            <div>
                                <div style={{color:"white"}}>{message.senderName}</div>
                                <div>{addLineBreaks(message.text)}</div>
                            </div>
                        </div>
                        :
                        <div className={classes.dialogAdditionalMessage} key={index}>{addLineBreaks(message.text)}</div>
                )
                :
                <div className={classes.dialogEmpty}>
                    <div>Ваш диалог пуст...</div>
                    <div>Начните его первым!</div>
                </div>
            }
        </div>
    );
};

export default ChatMessages;