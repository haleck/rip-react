import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Form from "../../components/form";
import FormHeader from "../../components/formHeader";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import CustomLink from "../../components/customLink/CustomLink";
import {useAuth} from "../../hooks/useAuth";
import axios from "axios";

const RegisterName = () => {
    const location = useLocation()
    const {email, password} = location.state
    const {signIn} = useAuth()
    const navigate = useNavigate()
    const fromPage = location.state?.from?.pathname || '/'

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()

        try {
            const params = {email, password, name, surname}
            await axios.post('http://localhost:5000/api/users/register', params)
            signIn(email, fromPage)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form onSubmit={registerUser}>
            <FormHeader text='Как вас зовут?' />
            <InputField name='firstName' label='Имя' value={name} setValue={setName}/>
            <InputField name='lastName' label='Фамилия' value={surname} setValue={setSurname}/>
            <Button>Зарегистрироваться</Button>
            <CustomLink to='../../login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default RegisterName;