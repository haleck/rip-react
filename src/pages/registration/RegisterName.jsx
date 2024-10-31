import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import Form from "../../components/form";
import InputField from "../../UI/inputField";
import Button from "../../UI/button";
import CustomLink from "../../UI/customLink";
import {useAuth} from "../../hooks/useAuth";

const RegisterName = () => {
    const location = useLocation()
    const {email, password} = location.state
    const fromPage = location.state?.from?.pathname || '/'

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const {signUp} = useAuth()

    return (
        <Form
            headerText={'Как вас зовут?'}
            onSubmit={(e) => signUp(e, email, password, name, surname, fromPage)}
        >
            <InputField name='firstName' label='Имя' value={name} setValue={setName}/>
            <InputField name='lastName' label='Фамилия' value={surname} setValue={setSurname}/>
            <Button>Зарегистрироваться</Button>
            <CustomLink to='../../login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default RegisterName;