import React from 'react';
import classes from "./formHeader.module.css"

const FormHeader = ({text}) => {
    return (
        <div className={classes.header}>
            {text}
        </div>
    );
};

export default FormHeader;