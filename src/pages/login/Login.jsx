import React, {useState} from 'react';
import InputField from "../../components/inputField";
import Button from "../../components/button";
import Form from '../../components/form'
import Logo from "../../components/logo";
import CustomLink from "../../components/customLink/CustomLink";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const {signIn} = useAuth()

    const fromPage = location.state?.from?.pathname || '/';

    const login = (e) => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value

        signIn(email, fromPage)
    }

    return (
        <Form onSubmit={login}>
            <Logo />
            <InputField name='email' label='Почта' value={email} setValue={setEmail} />
            <InputField label='Пароль' value={password} setValue={setPassword} type='password'/>
            <Button style={{marginTop: 20}} type="submit">Войти</Button>
            <CustomLink to='/registration' state={location.state}>Нет аккаунта? Регистрация</CustomLink>
        </Form>
    );
};

export default Login;