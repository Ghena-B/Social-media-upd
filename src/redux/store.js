import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {

    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are youuu?", likesCount: '23'},
                {id: 2, message: "I am using props", likesCount: '11'}
            ],
            newPostText: 'hii'
        },
        dialogsPage: {
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
        },
        sidebar: {
            activeUsers: [
                {
                    id: 1,
                    name: "Ghena",
                    imgURL: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                },
                {id: 2, name: "Cristi", imgURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
                {
                    id: 3,
                    name: "Nicu",
                    imgURL: "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
                }
            ]
        },


    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}

export default store;