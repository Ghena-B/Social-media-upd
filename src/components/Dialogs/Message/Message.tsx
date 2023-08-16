import s from './Message.module.css';
import React from "react";

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.message}>
            <div className={s.image}>
                <img src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt=""/>
            </div>
            <div className={s.text}>{props.message}</div>
        </div>

    )
}

export default Message;