import React from 'react';
import classes from './Input.module.css'

const Input = ({name, value, setValue, ...props}) => {
    return (
        <input
            className={classes.input}
            value={value}
            onChange={e=>setValue(e.target.value)}
            name={name}
            {...props}
        />
    );
};

export default Input;