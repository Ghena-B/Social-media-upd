import {authApi, followApi} from "../api/api";
import {followSuccess, toggleFollowingProgress} from "./users-reducer";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userID: null, email: null, login: null, isAuthorized: false

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state, ...action.data, isAuthorized: true
            }
        default:
            return state;
    }
}

export let setAuthUserData = (userID, email, login) => {
    return {
        type: SET_USER_DATA, data: {userID, email, login}
    }
};

export let getAuthUserData = () => {
    return (dispatch) => {
        authApi.authMe().then((data) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
};

export default authReducer;