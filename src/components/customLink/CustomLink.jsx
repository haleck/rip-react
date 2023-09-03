import React from 'react';
import classes from "./CustomLink.module.css";
import {Link} from "react-router-dom";

const CustomLink = ({to, children, ...props}) => {
    return (
        <Link to={to} className={classes.link} {...props}>
            {children}
        </Link>
    );
};

export default CustomLink;