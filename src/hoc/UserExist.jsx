import React from 'react';
import {useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";

const UserExist = ({children}) => {
    const {user} = useAuth()
    const {pathname} = useLocation()

    const userExists = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/checkUserExists/${pathname.slice(1)}`)
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    }

    if (!userExists(user.id)) {
        return <div
            style={{
                height: '100%',
                background: '#5D5D5D',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '3rem',
                textTransform: 'uppercase'
            }}
        >
            User is not found
        </div>
    }

    return children;
};

export default UserExist;