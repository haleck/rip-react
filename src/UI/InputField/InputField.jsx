import React from 'react';
import classes from './InputField.module.css'

const InputField = ({label, name, value, setValue, ...props}) => {
    return (
        <label>
            {label && <div className={classes.label}>{label}</div>}
            <input
                className={classes.input}
                value={value}
                onChange={e=>setValue(e.target.value)}
                name={name}
                {...props}
            />
        </label>
    );
};

export default InputField;