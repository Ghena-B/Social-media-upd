import {authApi} from "../api/authApi";
import {securityApi} from "../api/securityApi";
import {ResultCodes, ResultCodesWithCaptcha} from "../api/api";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuthorized: false,
    errorMessage: '',
    captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/GET_CAPTCHA_URL_SUCCESS':
        case 'AUTH/SET_USER_DATA':
            return {
                ...state, ...action.data
            }
        case 'AUTH/SET_ERROR':
            return {
                ...state, errorMessage: action.errorMessage
            }
        case 'AUTH/RESET_STATE':
            return initialState;
        default:
            return state;
    }
}


export const actions = {
    setError: (errorMessage: string) => {
        return {
            type: 'AUTH/SET_ERROR', errorMessage
        } as const
    },
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuthorized: boolean) => {
        return {
            type: 'AUTH/SET_USER_DATA', data: {userId, email, login, isAuthorized}
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: 'AUTH/GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl}
        } as const
    },
    resetAuthState: () => {
        return {
            type: 'AUTH/RESET_STATE'
        } as const
    }
}

export let getAuthUserData = (): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    let data = await authApi.authMe();
    if (data.resultCode === ResultCodes.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
};

export let login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        let data = await authApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodes.Success) {
            await dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired){
                await dispatch(getCaptchaUrl())
            }
            dispatch(actions.setError(data.messages[0]))
        }
    }
};

export let logout = (): ThunkType => {
    return async (dispatch) => {
        const data = await authApi.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.resetAuthState())
        }
    }
};

export let getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityApi.getCaptchaUrl();
            dispatch(actions.getCaptchaUrlSuccess(data.data.url))
    }
};


export default authReducer;

type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>
