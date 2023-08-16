import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    user: string,
    id: number
}
const DialogItem: React.FC<PropsType> = (props) => {

    let path = "/dialogs/" + props.id;
    return (
        <NavLink to={path} style={{textDecoration:'none'}}>
            <div className={s.dialog + " " + s.active}>
                <div className={s.image}>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt=""/>
                </div>
                <div className={s.text}>{props.user}</div>

            </div>
        </NavLink>

    )
}

export default DialogItem;