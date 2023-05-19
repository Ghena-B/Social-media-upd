const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
let initialState = {
    dialogs: [
        {id: 1, user: "Ghenaaa"},
        {id: 2, user: "Nicu"},
        {id: 3, user: "Max"},
        {id: 4, user: "Tudor"},
        {id: 5, user: "Mama"},
        {id: 6, user: "Tata"},
    ],
    messages: [
        {id: 1, message: "Salut, ce faci?"},
        {id: 2, message: "Mesaj 2"},
        {id: 3, message: "Mesaj 3"}
    ],
    newMessageText: 'state'
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 3,
                message: state.newMessageText
            };
            state.messages.push(newMessage);
            state.newMessageText = '';
            break;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            break;
        default: return state;
    } return state;
}

export let sendMessageActionCreator = () => ({type: ADD_MESSAGE});
export let updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    }
}
export default dialogsReducer;