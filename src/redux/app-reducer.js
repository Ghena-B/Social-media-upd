import {getAuthUserData} from "./auth-reducer";


const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

let initialState = {
    initializeSuccess: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initializeSuccess: true
            }

        default:
            return state;
    }
}

export let initializeSuccess = () => {
    return {
        type: INITIALIZE_SUCCESS
    }
}


export let initializeApp = () => {
    return (dispatch) => {
        let initializePromise = dispatch(getAuthUserData());
        Promise.all([initializePromise]).then(() => {
                dispatch(initializeSuccess())
        }
        )
    }
};

export default appReducer;