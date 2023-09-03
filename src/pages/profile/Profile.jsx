import React, {useRef, useState} from 'react';
import classes from "./Profile.module.css";
import {useParams} from "react-router-dom";
import userPhoto from '../../assets/svg/userPhoto.svg'
import Post from "../../components/post";
import postIcon from "../../assets/svg/post.svg"
import AutoResizeTextarea from "../../components/autoResizeTextarea";

const Profile = () => {
    const {id} = useParams()
    const [text, setText] = useState('')

    const userStatus = 'Жизнь – это карнавалй. Мои мечты и стремления вдохновляют меня на новые подвиги. Время проживать каждую минуту, наслаждаться каждым мгновением и создавать незабываемые воспоминания.'
    const [status, setStatus] = useState(userStatus)
    const [editStatus, setEditStatus] = useState(false)
    const textareaStatusRef = useRef(null)
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            textareaStatusRef.current.blur()
        }
    };

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

    const posts = [
        {
            id: 1,
            user:'Имя Фамилия',
            time:'17 апреля в 19:00',
            content:'Текст этого поста может быть любой длины'
        },
        {
            id: 2,
            user:'ДругоеИмя  ДругаяФамилия',
            time:'10 августа в 12:30',
            content:'Длинный длинный текст поста, который повторяется много-много раз. Длинный длинный текст поста, который повторяется много-много раз. Длинный длинный текст поста, который повторяется много-много раз. Длинный длинный текст поста, который повторяется много-много раз. Длинный длинный текст поста, который повторяется много-много раз. '
        }
    ]

    return (
        <div className={classes.content}>
            <div className={classes.userCardWrapper}>
                <div className={classes.userCard}>
                    <img src={userPhoto} alt='avatar' />
                    <div className={classes.bio}>
                        <div className={classes.name}>Имя Фамилия</div>
                        <textarea
                            className={editStatus? [classes.textarea, classes.active].join(' ') : classes.textarea}
                            onBlur={()=>setEditStatus(false)}
                            onFocus={()=>setEditStatus(true)}
                            rows={4}
                            value={status}
                            onChange={(e)=>handleInput(e)}
                            onKeyDown={handleKeyPress}
                            placeholder={editStatus ? '' : 'Введите пользовательский статус'}
                            ref={textareaStatusRef}
                        />
                    </div>
                    <button>
                        Start messaging
                    </button>
                </div>
            </div>

            <div className={classes.postSuggestionBlock}>
                <div className={classes.postSuggestion}>
                    <img src={userPhoto} alt='userPhoto' className={classes.postAvatar}/>
                    <AutoResizeTextarea
                        text={text}
                        setText={setText}
                        maxLength={1000}
                        placeholder='Что у вас нового?'
                    />
                    <img src={postIcon} alt='post' className={classes.postBtn}/>
                </div>
            </div>

            {posts.length > 0?
                posts.map((post)=>
                    <Post key={post.id} name={post.user} time={post.time}>{post.content}</Post>
                )
                :
                <div className={classes.notification}>
                    <div className={classes.notificationText}>
                        Пользователь пока пока не опубликовал ни одного поста
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;