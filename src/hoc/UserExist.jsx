import React from 'react';
import {useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const UserExist = ({children}) => {
    const {user} = useAuth()
    const userList = ['1','2','3','4','5','10', user]

    const {pathname} = useLocation()
    const userExist = userList.includes(pathname.slice(1))

    if (!userExist) {
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