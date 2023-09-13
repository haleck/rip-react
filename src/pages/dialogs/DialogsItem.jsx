import React from 'react';
import classes from './Dialogs.module.css'
import userPhoto from '../../assets/svg/userPhoto.svg'
import {formatDate} from "../../utils/format";

const DialogsItem = ({item, ...props}) => {

    return (
        <div className={classes.dialogsItem} {...props}>
            <img src={userPhoto} alt='userPhoto'/>
            <div>
                <div className={classes.name}>{item.name}</div>
                <div className={classes.date}>{item.dateOfLastMessage && formatDate(item.dateOfLastMessage)}</div>
                <br />
                {item.lastMessage?
                    <div className={classes.lastMessage}>{item.lastMessage}</div>
                    :
                    <div style={{opacity: 0.2}}>Нет сообщений</div>
                }
            </div>
        </div>
    );
};

export default DialogsItem;