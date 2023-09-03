import React from 'react';
import classes from './Dialogs.module.css'
import userPhoto from '../../assets/svg/userPhoto.svg'

const DialogsItem = ({item, ...props}) => {
    return (
        <div className={classes.dialogsItem} {...props}>
            <img src={userPhoto} alt='userPhoto'/>
            <div>
                <div className={classes.name}>{item.name}</div>
                <div className={classes.date}>{item.dateOfLastMessage}</div>
                <br />
                <div className={classes.lastMessage}>{item.lastMessage}</div>
            </div>
        </div>
    );
};

export default DialogsItem;