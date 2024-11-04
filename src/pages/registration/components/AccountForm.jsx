import React, {useState} from 'react';
import Logo from "../../../UI/Logo";
import InputField from "../../../UI/InputField";
import Button from "../../../UI/Button";
import CustomLink from "../../../UI/CustomLink";
import Form from "../../../components/Form";
import {useLocation} from "react-router-dom";

const AccountForm = ({onAccountFormSubmit}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const location = useLocation()

    return (
        <Form
            onSubmit={(e) => onAccountFormSubmit(e)}
        >
            <Logo />
            <InputField name='email' label='Почта' value={email} setValue={setEmail} />
            <InputField name='password' label='Пароль' value={password} setValue={setPassword} type='password' />
            <InputField label='Повторно пароль' value={repeatPassword} setValue={setRepeatPassword} type='password' />
            <Button style={{marginTop: 20}} type="submit">Далее</Button>
            <CustomLink to='/login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default AccountForm;