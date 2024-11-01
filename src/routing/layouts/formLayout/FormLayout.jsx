import React from 'react';
import {Outlet} from "react-router-dom";
import classes from './FormLayout.module.css'

const FormLayout = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.formBlock}>
                <Outlet />
            </div>
        </div>
    );
};

export default FormLayout;