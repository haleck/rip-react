import React, {useRef, useState} from 'react';
import classes from "../ProfilePage.module.css";
import userPhoto from "../../../../assets/svg/userPhoto.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../../routing/hooks/useAuth";
import {changeStatus} from "../../api";

const UserCard = ({userInfo, isOwnProfile, currentUserId, setStatus}) => {
    const {user} = useAuth()

    const [editStatus, setEditStatus] = useState(false)

    const textareaStatusRef = useRef(null)

    const navigate = useNavigate()

    const name = userInfo.name
    const surname = userInfo.surname
    const status = userInfo.status

    const onChangeStatus = async () => {
        try {
            await changeStatus(user, status)
            setEditStatus(false)
        } catch (e) {
            console.log(e)
        }
    }

    const createDialogAndRedirect = async () => {
        try {
            const params = {
                firstUser: user.id,
                firstUserName: user.name + ' ' + user.surname,
                secondUser: currentUserId,
                secondUserName: name + ' ' + surname,
                token: user.token
            }

            const response = await axios.post('http://localhost:5000/api/dialogs/create', params)
            navigate('/dialogs', {state: {dialogId: response.data._id, ...params}})
        } catch (e) {
            console.log(e)
        }
    }

    const handleInput = (e) => {
        const inputText = e.target.value;
        const maxLength = 200;
        const remaining = maxLength - inputText.length;

        if (remaining >= 0) {
            setStatus(inputText);
        } else {
            setStatus(inputText.slice(0, maxLength));
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            textareaStatusRef.current.blur()
        }
    };

    return (
        <div className={classes.userCardWrapper}>
            <div className={classes.userCard}>
                <img src={userPhoto} alt='avatar' style={!isOwnProfile && !status? {height: "8.7rem"} : {}}/>
                <div className={classes.bio} style={isOwnProfile? {width: '100%'} : status? {} : {alignSelf: 'center'}}>
                    <div className={classes.name} style={!status && !isOwnProfile? {fontSize: "2.4rem"} : {}}>
                        {name + ' ' + surname}
                    </div>
                    {isOwnProfile?
                        <textarea
                            className={editStatus? [classes.textarea, classes.active].join(' ') : classes.textarea}
                            onBlur={onChangeStatus}
                            onFocus={()=>setEditStatus(true)}
                            rows={4}
                            value={status}
                            onChange={(e)=>handleInput(e)}
                            onKeyDown={handleKeyPress}
                            placeholder={editStatus ? '' : 'Введите пользовательский статус'}
                            ref={textareaStatusRef}
                        />
                        :
                        status &&
                        <div className={classes.textarea}>
                            {status}
                        </div>
                    }
                </div>
                {!isOwnProfile &&
                    <button onClick={createDialogAndRedirect}>
                        Start messaging
                    </button>
                }
            </div>
        </div>
    );
};

export default UserCard;