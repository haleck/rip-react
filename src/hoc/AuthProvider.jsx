import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
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
            let navigatePath = location.state?.from? location.state?.from?.pathname : '/' + user.id
            navigate(navigatePath, {replace: true})
        }
    }, [user])

    const signIn = async (email, password, navigatePath='/') => {
        try {
            const params = {
                email,
                password
            }

            const respond = await axios.post(`http://localhost:5000/api/users/login`, params)
            setUser(respond.data)
            localStorage.setItem('user', JSON.stringify(respond.data))

            navigatePath = navigatePath === '/' ? '/' + respond.data.id : navigatePath

            navigate(navigatePath, {replace: true})
        } catch (e) {
            console.log(e)
        }
    }

    const signUp = async (e, email, password, name, surname, navigatePath='/') => {
        e.preventDefault()

        try {
            const params = {email, password, name, surname}
            const respond = await axios.post('http://localhost:5000/api/users/register', params)

            setUser(respond.data)
            localStorage.setItem('user', JSON.stringify(respond.data))

            navigatePath = navigatePath === '/' ? '/' + respond.data.id : navigatePath

            navigate(navigatePath, {replace: true})
        } catch (e) {
            console.log(e)
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
