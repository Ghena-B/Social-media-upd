import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {ChatMessageAPIType} from "../../api/chatApi";
import AddMessageForm from "../Forms/AddMessageForm";
import Message from "../Dialogs/Message/Message";
import s from "../Dialogs/Dialogs.module.css";

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: AppStateType) => state.chatPage.messages);
    const status = useSelector((state: AppStateType) => state.chatPage.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
            dispatch(actions.clearMessages());
        };
    }, [dispatch]);

    const addMessage = (message: ChatMessageAPIType) => {
        dispatch(sendMessage(message));
    };

    return (
        <div>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}

            <Messages/>
            <AddMessageForm addMessage={addMessage}/>
        </div>
    );
};

export default Chat;

const Messages: React.FC = React.memo(() => {
    const messages: ChatMessageAPIType[] = useSelector((state: AppStateType) => state.chatPage.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    let messagesElement = messages.map((m, index) => <Message
        message={m.message}
        key={index}
        photo={m.photo}
        userName={m.userName}/>);

    return <div style={{overflowY: 'auto'}} onScroll={scrollHandler} className={s.message}>
        {messagesElement}
        <div ref={messagesAnchorRef}></div>
    </div>
});