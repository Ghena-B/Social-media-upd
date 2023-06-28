import {profileApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';
const SET_ERROR = 'SET_ERROR';

let initialState = {
    posts: [{id: 1, message: "Hi, how are youuu?", likesCount: '23'}, {
        id: 2,
        message: "I am using props",
        likesCount: '11'
    }],
    newPostText: 'hii',
    profile: null,
    status: "",
    errorMessage: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, message: action.newPostText, likesCount: '0'
            };
            return {
                ...state, posts: [...state.posts, newPost],
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state, status: action.status
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case SET_ERROR:
            return {
                ...state, errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const setProfilePhoto = (photos) => ({type: SET_PHOTO_SUCCESS, photos});
export let setError = (errorMessage) => ({type: SET_ERROR, errorMessage});

export const getProfile = (userId) => {
    return async (dispatch) => {
        if (!userId) {
            userId = 29145
        }
        let data = await profileApi.getProfile(userId);
        dispatch(setUserProfile(data));
    }
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        let data = await profileApi.getStatus(userId);
        dispatch(setUserStatus(data));
    }
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        let data = await profileApi.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
};

export const updateProfilePhoto = (file) => {
    return async (dispatch) => {
        let data = await profileApi.updatePhoto(file);
        if (data.resultCode === 0) {
            dispatch(setProfilePhoto(data.data.photos));
        }
    }
};
export const updateProfileInfo = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let data = await profileApi.updateUserInfo(profile);
        if (data.resultCode === 0) {
            dispatch(getProfile(userId));
        } else {
            dispatch(setError(data.messages))
        }
    }
};
export default profileReducer;