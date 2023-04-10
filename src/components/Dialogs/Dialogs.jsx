import s from './Dialogs.module.css';
import DialogItem from "./Dialog Item/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem user={d.user} id={d.id}/>);
    let messagesElement = props.messages.map( m => <Message message={m.message}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    )
};
export default Dialogs;