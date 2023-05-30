const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
        userID: null,
        email: null,
        login: null,
        isAuthorized: false

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuthorized: true
            }
        default:
            return state;
    }
}

export let setAuthUserData = (userID, email, login) => {
    return {
        type: SET_USER_DATA,
        data: {userID, email, login}
    }
};

export default authReducer;