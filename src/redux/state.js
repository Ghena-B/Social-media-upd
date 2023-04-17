let state = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are youuu?", likesCount: '23'},
            {id: 2, message: "I am using props", likesCount: '11'}
        ]
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
        ]
    },
    sidebar: {
        activeUsers: [
            {id: 1, name: "Ghena", imgURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
            {id: 2, name: "Cristi", imgURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
            {id: 3, name: "Nicu", imgURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        ]
    }
}
export default state;