import React from 'react';
import classes from "./ChatHeader.module.css";
import userPhoto from "../../../../../assets/svg/userPhoto.svg";
import {useNavigate} from "react-router-dom";

const ChatHeader = ({companionId, companionName}) => {
    const navigate = useNavigate()

    return (
        <div className={classes.dialogHeader}>
            <div onClick={()=>navigate(`/${companionId}`)}>{companionName}</div>
            <img src={userPhoto} alt='userPhoto' onClick={()=>navigate(`/${companionId}`)}/>
        </div>
    );
};

export default ChatHeader;