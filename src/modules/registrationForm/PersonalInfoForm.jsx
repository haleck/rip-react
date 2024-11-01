import React, {useState} from 'react';
import InputField from "../../UI/inputField";
import Button from "../../UI/button";
import CustomLink from "../../UI/customLink";
import Form from "../../components/form";
import {useLocation} from "react-router-dom";

const PersonalInfoForm = ({onPersonalInfoFormSubmit}) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const location = useLocation()

    return (
        <Form
            headerText={'Как вас зовут?'}
            onSubmit={(e) => onPersonalInfoFormSubmit(e)}
        >
            <InputField name='name' label='Имя' value={name} setValue={setName}/>
            <InputField name='surname' label='Фамилия' value={surname} setValue={setSurname}/>
            <Button>Зарегистрироваться</Button>
            <CustomLink to='../../login' state={location.state}>Уже есть аккаунт? Войти</CustomLink>
        </Form>
    );
};

export default PersonalInfoForm;