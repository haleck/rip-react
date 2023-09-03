import React from 'react';
import classes from "./Form.module.css";

const Form = ({children, onSubmit}) => {
    return (
        <form className={classes.form} onSubmit={e=>onSubmit(e)}>
            {children}
        </form>
    );
};

export default Form;