import React, {useState} from 'react';
import {useAuth} from "../../../routing/hooks/useAuth";
import {useLocation} from "react-router-dom";
import AccountForm from "./AccountForm";
import PersonalInfoForm from "./PersonalInfoForm";

const RegistrationPage = () => {
    const [currentForm, setCurrentForm] = useState('accountForm');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    const {signUp} = useAuth()

    const onAccountFormSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        setEmail(form.email.value)
        setPassword(form.password.value)
        setCurrentForm('personalInfoForm')
    }

    const onPersonalInfoFormSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value
        const surname = form.surname.value

        signUp(e, email, password, name, surname, fromPage)
    }

    return (
        <>
            {currentForm === 'accountForm' ?
                <AccountForm onAccountFormSubmit={onAccountFormSubmit}/>
                :
                <PersonalInfoForm onPersonalInfoFormSubmit={onPersonalInfoFormSubmit}/>
            }
        </>
    );
};

export default RegistrationPage;