import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initializeSuccess: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZE_SUCCESS':
            return {
                ...state,
                initializeSuccess: true
            }
        default:
            return state;
    }
}
export let actions = {initializeSuccess: () => ({type: 'APP/INITIALIZE_SUCCESS'}) as const}

export let initializeApp = () => {
    return (dispatch: any) => {
        let initializePromise = dispatch(getAuthUserData());
        Promise.all([initializePromise]).then(() => {
                dispatch(actions.initializeSuccess())
            }
        )
    }
};

export default appReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>