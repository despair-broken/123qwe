import React from "react";
import classes from './MyButton.module.css';

const MyButton = ({ children, className, ...props }) => {
    return (
        <button {...props} className={`${classes.MyBtn} ${className || ''}`}>
            {children}
        </button>
    );
}

export default MyButton