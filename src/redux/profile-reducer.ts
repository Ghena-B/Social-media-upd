import {PhotosType, PostsType, ProfileType} from "../APItypes/APItypes";
import {profileApi} from "../api/profileApi";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ResultCodes} from "../api/api";
import {ThunkDispatch} from "redux-thunk";

let initialState = {
    posts: [{id: 1, message: "Hi, how are youuu?", likesCount: '23'}, {
        id: 2,
        message: "I am using props",
        likesCount: '11'
    }] as Array<PostsType>,
    newPostText: 'hii',
    profile: null as ProfileType | null,
    status: "",
    errorMessage: ''
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            let newPost = {
                id: 5, message: action.newPostText, likesCount: '0'
            };
            return {
                ...state, posts: [...state.posts, newPost],
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            }
        case 'PROFILE/SET_USER_STATUS':
            return {
                ...state, status: action.status
            }
        case 'PROFILE/DELETE_POST':
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'PROFILE/SET_PHOTO_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case 'PROFILE/SET_ERROR':
            return {
                ...state, errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const),
    deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'PROFILE/SET_USER_STATUS', status} as const),
    setProfilePhoto: (photos: PhotosType) => ({type: 'PROFILE/SET_PHOTO_SUCCESS', photos} as const),
    setError: (errorMessage: string) => ({type: 'PROFILE/SET_ERROR', errorMessage} as const)
}

export const getProfile = (userId: number | null): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>, getState) => {
        if (!userId) {
            //userId = 29145
            dispatch(actions.setError("Invalid User ID"));
            return;
        }
        let data = await profileApi.getProfile(userId);
        dispatch(actions.setUserProfile(data));
    }
};

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        if (!userId) {
            dispatch(actions.setError("Invalid User ID"));
            return;
        }
        let data = await profileApi.getStatus(userId);
        dispatch(actions.setUserStatus(data));
    }
};

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        let data = await profileApi.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    }
};

export const updateProfilePhoto = (file: File): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        let data = await profileApi.updatePhoto(file);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setProfilePhoto(data.data.photos));
        }
    }
};
export const updateProfileInfo = (profile: ProfileType): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>, getState) => {
        const userId = getState().auth.userId;
        let data = await profileApi.updateUserInfo(profile);
        if (data.resultCode === 0) {
            await dispatch(getProfile(userId));
            return Promise.resolve();
        } else {
            dispatch(actions.setError(data.messages[0]))
            return Promise.reject(data.messages[0]);
        }
    }
};
export default profileReducer;

type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>