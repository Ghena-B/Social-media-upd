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

export let sendMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer;