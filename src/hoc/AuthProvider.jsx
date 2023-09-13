import React, {createContext, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const signIn = async (email, navigatePath='/') => {
        try {
            const respond = await axios.get(`http://localhost:5000/api/users/login/${email}`)
            setUser(respond.data)

            navigatePath = navigatePath === '/' ? '/' + respond.data.id : navigatePath

            navigate(navigatePath, {replace: true})
        } catch (e) {
            console.log(e)
        }
    }

    const signOut = (cb) => {
        setUser(null)
        cb()
    }

    const value = {user, signIn, signOut}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;