let initialState = {
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
};

const sidebarReducer = (state = initialState, action) => {
    return state;
}
export default sidebarReducer;