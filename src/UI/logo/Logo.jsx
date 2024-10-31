import React from 'react';
import classes from './Logo.module.css';
import logo from "../../assets/svg/logo.svg";

const Logo = () => {
    return (
        <div className={classes.logoBlock}>
            <img src={logo}  alt='logo'/>
            <div className={classes.logoLabel}>RIProject</div>
        </div>
    );
};

export default Logo;