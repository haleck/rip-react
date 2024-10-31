import React, {useState} from 'react';
import Form from "../../components/form";
import Logo from "../../UI/logo";
import InputField from "../../UI/inputField";
import Button from "../../UI/button";
import CustomLink from "../../UI/customLink";
import {useLocation, useNavigate} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const goToNextStep = (e) => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value
        const password = form.password.value

        navigate('name', {state: {email, password, from: location.state.from}})
    }

    return (
        <Form onSubmit={goToNextStep}>
            <Logo />
            <InputField name='email' label='Почта' value={email} setValue={setEmail} />
            <InputField name='password' label='Пароль' value={password} setValue={setPassword} type='password' />
            <InputField label='Повторно пароль' value={repeatPassword} setValue={setRepeatPassword} type='password' />
            <Button style={{marginTop: 20}} type="submit">Далее</Button>
            <CustomLink to='/login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default Registration;