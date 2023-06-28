import {authApi, securityApi} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR = 'SET_ERROR';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuthorized: false,
    errorMessage: '',
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
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
export let getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: SET_USER_DATA, data: {captchaUrl}
    }
};

export let getAuthUserData = () => async (dispatch) => {
    let data = await authApi.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
};

export let login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let data = await authApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            dispatch(setError(data.messages))
        }
    }
};

export let logout = () => {
    return async (dispatch) => {
        const data = await authApi.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
};

export let getCaptchaUrl = () => {
    return async (dispatch) => {
        const data = await securityApi.getCaptchaUrl();
            dispatch(getCaptchaUrlSuccess(data.url))
    }
};

export default authReducer;