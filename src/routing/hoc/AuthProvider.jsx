import React, {createContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {login, register} from "../api";
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        let userFromStorage = JSON.parse(localStorage.getItem('user'))
        setUser(userFromStorage)
    },[])

    useEffect(()=> {
        if (user) {
            let navigatePath = location.pathname? location.pathname : '/' + user.id
            navigate(navigatePath, {replace: true})
        }
    }, [user])

    const handleUserLogin = (userData, navigatePath) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))

        navigatePath = navigatePath === '/' ? '/' + userData.id : navigatePath
        navigate(navigatePath, {replace: true})
    }

    const signIn = async (email, password, navigatePath='/') => {
        const respond = await login(email, password)
        if (respond.status === 200) {
            handleUserLogin(respond.data, navigatePath)
        }
    }

    const signUp = async (e, email, password, name, surname, navigatePath='/') => {
        e.preventDefault()

        const respond = await register(email, password, name, surname)
        if (respond.status === 200) {
            handleUserLogin(respond.data, navigatePath)
        }
    }

    const signOut = (cb) => {
        setUser(null)
        localStorage.clear()
        cb()
    }

    const value = {user, signIn, signOut, signUp}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
