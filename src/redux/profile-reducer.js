import {profileApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [{id: 1, message: "Hi, how are youuu?", likesCount: '23'}, {
        id: 2,
        message: "I am using props",
        likesCount: '11'
    }],
    newPostText: 'hii',
    profile: null,
    status: ""
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE, profile
    }
};

export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS, status
    }
};

export const getProfile = (userId) => {
    return (dispatch) => {
        if (!userId) {
            userId = 29145
        }
        profileApi.getProfile(userId).then((data) => {
            dispatch(setUserProfile(data));
        })
    }
};

export const getStatus = (userId) => {
    return (dispatch) => {
        profileApi.getStatus(userId).then((data) => {
            dispatch(setUserStatus(data));
        })
    }
};

export const updateStatus = (status) => {
    return (dispatch) => {
        profileApi.updateStatus(status).then((data) => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        })
    }
};

export default profileReducer;