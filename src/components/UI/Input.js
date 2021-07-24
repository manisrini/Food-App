import style from './Input.module.css'
import React from 'react'


const Input = React.forwardRef((props,ref) => {
    return(
        <div className={style.input}>
            <label htmlFor={props.item.id}>{props.item.label}</label>
            <input ref={ref} {...props.item}></input>
        </div>
    )
})

export default Input;