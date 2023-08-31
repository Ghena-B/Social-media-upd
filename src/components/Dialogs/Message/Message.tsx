import s from './Message.module.css';
import React from "react";

type PropsType = {
    message: string
    photo: string
    userName: string
    isMyMessage: boolean;
}
const Message: React.FC<PropsType> = (props) => {

    return (
        <div className={`${s.container} ${props.isMyMessage ? s.myMessage : ''}`}>
            <div className={s.image}>
                <img src={props.photo || "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"} alt=""/>
            </div>
            <div className={s.box}>
                <div className={s.user}>{props.userName}</div>
                <div className={s.text}>{props.message}</div>
            </div>
        </div>

    )
}

export default Message;