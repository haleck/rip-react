import React, {useState} from 'react';
import InputField from "../../UI/inputField";
import Button from "../../UI/button";
import Form from '../../components/form'
import Logo from "../../UI/logo";
import CustomLink from "../../UI/customLink";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../routing/hooks/useAuth";

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
        const password = form.password.value

        signIn(email, password, fromPage)
    }

    return (
        <Form onSubmit={(e) => login(e)}>
            <Logo />
            <InputField name='email' label='Почта' value={email} setValue={setEmail} />
            <InputField name='password' label='Пароль' value={password} setValue={setPassword} type='password'/>
            <Button style={{marginTop: 20}} type="submit">Войти</Button>
            <CustomLink to='/registration' state={location.state}>Нет аккаунта? Регистрация</CustomLink>
        </Form>
    );
};

export default Login;