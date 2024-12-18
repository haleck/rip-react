import React, {useState} from 'react';
import classes from "./Post.module.css";
import userPhoto from '../../../assets/svg/userPhoto.svg'
import dots from '../../../assets/svg/dots.svg'
import Delete from '../../../assets/svg/delete.svg'
import axios from "axios";
import {addLineBreaks, formatDateWithMonthName} from "../../../utils/format"
import {useAuth} from "../../../routing/hooks/useAuth";
import {deletePost} from "../api";

const Post = ({children, name, time, deletePostCallback, postId, deleteOption}) => {
    const [dotsClicked, setDotsClicked] = useState(false)
    const {user} = useAuth()

    const onDeletePost = async () => {
        try {
            await deletePost(postId, user.token)
            deletePostCallback()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.post}>
            <div className={classes.title}>
                <img src={userPhoto} alt="userPhoto" className={classes.userPhoto}/>
                <div>
                    <div className={classes.titleName}>{name}</div>
                    <div className={classes.titleTime}>{formatDateWithMonthName(time)}</div>
                </div>
                <div className={classes.dotsBlock} onClick={()=>setDotsClicked(!dotsClicked)}>
                    {/*Нужно сделать нормальную функцию отрктия/закрытия окна*/}
                    {deleteOption && <img src={dots} alt='dots' className={classes.dots}/>} {/*Нужно будет сделать без каритнки*/}
                    <div className={classes.deleteBtn} style={dotsClicked ? {} : {display: 'none'}} onClick={onDeletePost}>
                        <img src={Delete} alt="delete"/>
                        <div>Удалить</div>
                    </div>
                </div>
            </div>
            <div className={classes.content}>
                {addLineBreaks(children)}
            </div>
        </div>
    );
};

export default Post;