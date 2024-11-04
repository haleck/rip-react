import React, {useEffect, useState} from 'react';
import classes from "./ProfilePage.module.css";
import {useLocation} from "react-router-dom";
import Post from "../../../modules/Post";
import {useAuth} from "../../../routing/hooks/useAuth";
import axios from "axios";
import UserCard from "./UserCard/UserCard";
import NewPostInput from "../../../modules/newPostInput/components/NewPostInput";
import {getUserInfo, getUserPosts} from "../api";

const ProfilePage = () => {
    const {user} = useAuth()

    const location = useLocation()
    const pageOwnerId = location.pathname.slice(1)

    const [posts, setPosts] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [status, setStatus] = useState(user.status || '')

    const isOwnProfile = pageOwnerId === user.id

    const fetchPosts = async (userId) => {
        try {
            const response = await getUserPosts(userId)
            setPosts(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchUserInfo = async (userId) => {
        try {
            const response = await getUserInfo(userId)
            setStatus(response.data.status || '')
            setName(response.data.name)
            setSurname(response.data.surname)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=> {
        fetchPosts(pageOwnerId)
        fetchUserInfo(pageOwnerId)
    }, [pageOwnerId])

    return (
        <div className={classes.content}>

            <UserCard
                userInfo={{
                    status: status,
                    name: name,
                    surname: surname
                }}
                setStatus={setStatus}
                isOwnProfile={isOwnProfile}
                currentUserId={pageOwnerId}
            />

            {isOwnProfile &&
                <NewPostInput
                    currentUser={user}
                    createPostCallback={()=>fetchPosts(pageOwnerId)}
                />
            }

            {posts.length > 0?
                posts.map((post)=>
                    <Post
                        key={post._id}
                        postId={post._id}
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
                        Пользователь пока не опубликовал ни одного поста
                    </div>
                </div>
            }

        </div>
    );
};

export default ProfilePage;