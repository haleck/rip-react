import React from 'react';
import classes from "./Form.module.css";

const Form = ({onSubmit, headerText, children}) => {
    return (
        <form className={classes.form} onSubmit={e=>onSubmit(e)}>
            {headerText &&
                <div className={classes.header}>
                    {headerText}
                </div>
            }
            {children}
        </form>
    );
};

export default Form;