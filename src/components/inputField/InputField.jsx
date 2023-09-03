import React from 'react';
import Input from "../input";
import classes from './InputField.module.css'

const InputField = ({label, name, value, setValue}) => {
    return (
        <label>
            <div className={classes.label}>{label}</div>
            <Input name={name} value={value} setValue={setValue}/>
        </label>
    );
};

export default InputField;