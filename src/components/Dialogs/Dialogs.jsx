import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.user}</NavLink></div>
    )
}
const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <DialogItem user="Ghena" id="1"/>
                <DialogItem user="Nicu" id="2"/>
                <DialogItem user="Max" id="3"/>
                <DialogItem user="Tudor" id="4"/>
                <DialogItem user="Mama" id="5"/>
                <DialogItem user="Tata" id="6"/>
            </div>
            <div className={s.messages}>
                <Message message="Salut, ce faci?"/>
                <Message message="Mesaj 2"/>
                <Message message="Ciao"/>
            </div>
        </div>
    )
};
export default Dialogs;