import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Form from "../../components/form";
import FormHeader from "../../components/formHeader";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import CustomLink from "../../components/customLink/CustomLink";
import {useAuth} from "../../hooks/useAuth";

const RegisterName = () => {
    const location = useLocation()
    const {email, password} = location.state
    const {signIn} = useAuth()
    const navigate = useNavigate()
    const fromPage = location.state?.from?.pathname || '/'

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const registerUser = (e) => {
        e.preventDefault()

        const navigatePath = fromPage === '/'? '/' + email : fromPage
        signIn(email, ()=>navigate(navigatePath, {replace: true}))
    }

    return (
        <Form onSubmit={registerUser}>
            <FormHeader text='Как вас зовут?' />
            <InputField name='firstName' label='Имя' value={firstName} setValue={setFirstName}/>
            <InputField name='lastName' label='Фамилия' value={lastName} setValue={setLastName}/>
            <Button>Зарегистрироваться</Button>
            <CustomLink to='../../login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default RegisterName;