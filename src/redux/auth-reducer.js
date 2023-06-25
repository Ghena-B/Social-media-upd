import {authApi} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR = 'SET_ERROR'


let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuthorized: false,
    errorMessage: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state, ...action.data
            }
        case SET_ERROR:
            return {
                    ...state, errorMessage: action.errorMessage
                }
        default:
            return state;
    }
}

export let setError = (errorMessage) => {
    return {
        type: SET_ERROR, errorMessage
    }
}

export let setAuthUserData = (userID, email, login, isAuthorized) => {
    return {
        type: SET_USER_DATA, data: {userID, email, login, isAuthorized}
    }
};

export let getAuthUserData = () => (dispatch) => {
          return authApi.authMe().then((data) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
};

export let login = (email, password, rememberMe) => {
    return (dispatch) => {

        authApi.login(email, password, rememberMe).then((data) => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                dispatch(setError(data.messages))
                /*appendErrors('login-form', 'root.login', {
                    type: 'manual',
                    message: data.messages
                })*/
            }
        })
    }
};

export let logout = () => {
    return (dispatch) => {
        authApi.logout().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
};

export default authReducer;