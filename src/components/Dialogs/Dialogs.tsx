import s from './Dialogs.module.css';
import Message from "./Message/Message";
import React, {useEffect, useRef, useState} from "react";
import AddMessageForm from "../Forms/AddMessageForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {ChatMessageAPIType} from '../../api/chatApi';

type ChatMessagesType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const Dialogs: React.FC = React.memo((props) => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chatPage.status);
    const isMounted = useRef(true);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            if (isMounted.current) {
                console.log("Cleaning up...");
                dispatch(stopMessagesListening());
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    const addMessage = (message: ChatMessageAPIType) => {
        dispatch(sendMessage(message));
    }

    return (
        <div className={s.dialogs}>
            {status === 'error' && <div>Some error occured. Please refresh the page</div>}
            <div className={s.messages}>
                <Messages/>
                <AddMessageForm addMessage={addMessage}/>
            </div>
        </div>
    )
})
export default Dialogs;

const Messages: React.FC = React.memo(() => {
    const messages: ChatMessagesType[] = useSelector((state: AppStateType) => state.chatPage.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
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

    let messagesElement = messages.map((m, index) => <Message message={m.message} key={index} photo={m.photo} userName={m.userName} isMyMessage={true}/>);

    return <div style={{overflowY: 'auto'}} onScroll={scrollHandler} className={s.message}>
        {messagesElement}
        <div ref={messagesAnchorRef}></div>
    </div>
});
