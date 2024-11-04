import React from 'react';
import {useLocation} from "react-router-dom";
import {checkUserExists} from "../api";

const UserExist = ({children}) => {
    const {pathname} = useLocation()

    if (!checkUserExists(pathname.slice(1))) {
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