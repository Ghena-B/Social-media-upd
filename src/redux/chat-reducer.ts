import {v1} from 'uuid';
import {chatApi, ChatMessageAPIType, StatusType} from '../api/chatApi';
import {BaseThunkType, InferActionsTypes} from './redux-store';

type ChatMessageType = ChatMessageAPIType & {id: string};

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            };
        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            };
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: []
            };
        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'STATUS_CHANGED', payload: {status}
    } as const),
    clearMessages: () => ({
        type: 'CLEAR_MESSAGES'
    } as const)
};

export const startMessagesListening = (): ThunkType => (dispatch) => {
    chatApi.start();
    chatApi.subscribe('messages-received', (messages: ChatMessageAPIType[]) => dispatch(actions.messagesReceived(messages)));
    chatApi.subscribe('status-changed', (status: StatusType) => dispatch(actions.statusChanged(status)));
};

export const stopMessagesListening = (): ThunkType => (dispatch) => {
    chatApi.unsubscribe('messages-received', (messages: ChatMessageAPIType[]) => dispatch(actions.messagesReceived(messages)));
    chatApi.unsubscribe('status-changed', (status: StatusType) => dispatch(actions.statusChanged(status)));
    chatApi.stop();
};

export const sendMessage = (message: ChatMessageAPIType): ThunkType => () => {
    chatApi.sendMessage(message);
};

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
