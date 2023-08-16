import {InferActionsTypes} from "./redux-store";

let initialState = {
    dialogs: [
        {id: 1, user: "Ghenaaa"},
        {id: 2, user: "Nicu"},
        {id: 3, user: "Max"},
        {id: 4, user: "Tudor"},
        {id: 5, user: "Mama"},
        {id: 6, user: "Tata"},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: "Salut, ce faci?"},
        {id: 2, message: "Mesaj 2"},
        {id: 3, message: "Mesaj 3"}
    ] as Array<MessagesType>,
    newMessageText: 'state'
};

const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            let newMessage = {
                id: 3,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        default: return state;
    }
}
export const actions = {
    sendMessageActionCreator: (newMessageText: string) => ({type: 'DIALOGS/ADD-MESSAGE', newMessageText} as const)
}

export default dialogsReducer;

export type ActionType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState;
export type DialogsType = {
    id: number
    user: string
}
export type MessagesType = {
    id: number
    message: string
}