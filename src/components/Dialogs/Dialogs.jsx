import s from './Dialogs.module.css';
import DialogItem from "./Dialog Item/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem user={d.user} key={d.id} id={d.id}/>);
    let messagesElement = props.messages.map(m => <Message message={m.message} key={m.id}/>);

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        props.sendMessage();
    };
    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.onMessageChange(text);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div className={s.user}>
                    <div className={s.image}><img
                        src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
                        alt=""/></div>
                    <div className={s.username}></div>
                </div>
                <div className={s.message}>{messagesElement}</div>
                <div className={s.response}>Raspuns 1</div>
                <div className={s.response}>Raspuns 2</div>
                <div className={s.response}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti
                    dolore earum est fuga inventore iure laborum modi neque nisi, obcaecati quaerat reiciendis rem
                    repudiandae sint tempore velit voluptatem voluptatum.
                </div>
                <div className={s.addMessage}>
                    <textarea onChange={onMessageChange} value={props.newMessageText} name="" id="" cols="30" rows="10" ref={newMessageElement} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>

        </div>
    )
};
export default Dialogs;