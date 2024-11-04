import React, {useState} from 'react';
import classes from "./NewPostInput.module.css";
import userPhoto from "../../../assets/svg/userPhoto.svg";
import AutoResizeTextarea from "../../../UI/AutoResizeTextarea";
import postIcon from "../../../assets/svg/post.svg";
import {createPost} from "../api";

const NewPostInput = ({currentUser, createPostCallback}) => {
    const [text, setText] = useState('')

    const onCreatePost = async () => {
        try {
            await createPost(currentUser, text)
            setText('')
            createPostCallback?.()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.postSuggestionBlock}>
            <div className={classes.postSuggestion}>
                <img src={userPhoto} alt='userPhoto' className={classes.postAvatar}/>
                <AutoResizeTextarea
                    text={text}
                    setText={setText}
                    maxLength={1000}
                    placeholder='Что у вас нового?'
                />
                <img src={postIcon} alt='post' className={classes.postBtn} onClick={()=>onCreatePost()}/>
            </div>
        </div>
    );
};

export default NewPostInput;