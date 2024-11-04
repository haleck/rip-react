import React, {useEffect, useRef} from 'react';
import classes from "./AutoResizeTextarea.module.css";

// Нужно добавить максимальную высоту в строках
const AutoResizeTextarea = ({text, setText, maxLength, ...props}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        adjustTextareaHeight(textareaRef.current);
    }, [text]);

    const adjustTextareaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    const handleChange = (e) => {
        const inputText = e.target.value;
        const remaining = maxLength - inputText.length;

        if (remaining >= 0) {
            setText(inputText);
        } else {
            setText(inputText.slice(0, maxLength));
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            className={classes.textarea}
            rows={1}
            {...props}
        />
    );
};
export default AutoResizeTextarea;