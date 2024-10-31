import React, {useEffect, useRef, useState} from 'react';
import classes from "./Profile.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import userPhoto from '../../assets/svg/userPhoto.svg'
import Post from "../../components/post";
import postIcon from "../../assets/svg/post.svg"
import AutoResizeTextarea from "../../UI/autoResizeTextarea";
import {useAuth} from "../../hooks/useAuth";
import axios from "axios";

const Profile = () => {
    const {id} = useParams()
    const [text, setText] = useState('')
    const {user} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const [status, setStatus] = useState(user.status || '')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [posts, setPosts] = useState([])

    const currentUserId = location.pathname.slice(1)

    const isOwnProfile = currentUserId === user.id

    const fetchPosts = async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/posts/getAllUsersPosts/${userId}`)
        setPosts(response.data)
    }
    const fetchUserInfo = async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/users/getUserInfo/${userId}`)
        setStatus(response.data.status || '')
        setName(response.data.name)
        setSurname(response.data.surname)
    }
    useEffect(()=> {
        fetchPosts(currentUserId)
        fetchUserInfo(currentUserId)
    }, [currentUserId])

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

    const createPost = async (text) => {
        try {
            const params = {
                author: currentUserId,
                authorName: name + ' ' + surname,
                content: text,
                token: user.token
            }

            await axios.post('http://localhost:5000/api/posts/create', params)
            fetchPosts(currentUserId)
            setText('')
        } catch (e) {
            console.log(e)
        }
    }

    const changeStatus = async () => {
        try {
            const params = {
                id: currentUserId,
                status: status,
                token: user.token
            }
            setEditStatus(false)
            await axios.put('http://localhost:5000/api/users/changeStatus', params)
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

    return (
        <div className={classes.content}>

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
                                onBlur={changeStatus}
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

            {isOwnProfile &&
                <div className={classes.postSuggestionBlock}>
                    <div className={classes.postSuggestion}>
                        <img src={userPhoto} alt='userPhoto' className={classes.postAvatar}/>
                        <AutoResizeTextarea
                            text={text}
                            setText={setText}
                            maxLength={1000}
                            placeholder='Что у вас нового?'
                        />
                        <img src={postIcon} alt='post' className={classes.postBtn} onClick={()=>createPost(text)}/>
                    </div>
                </div>
            }

            {posts.length > 0?
                posts.map((post)=>
                    <Post
                        key={post._id}
                        id={post._id}
                        name={post.authorName}
                        time={post.createdAt}
                        deleteOption={isOwnProfile}
                        deletePostCallback={()=>setPosts(posts.filter((item)=> item._id !== post._id))}
                    >
                        {post.content}
                    </Post>
                )
                :
                !isOwnProfile &&
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