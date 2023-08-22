import {updateObjectInArray} from "../components/common/utilities/object-helpers";
import {PhotosType} from "../APItypes/APItypes";
import {usersApi} from "../api/usersApi";
import {followApi} from "../api/followApi";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";


export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    currentPage: 1,
    totalUsersCount: 0,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'USERS/SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'USERS/SET_FILTER':
            return {
                ...state, filter: action.payload
            }
        case 'USERS/TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'USERS/SET_USERS', users} as const),
    setFilter: (filter: FilterType) => ({type: 'USERS/SET_FILTER', payload: filter} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount,} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching,} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'USERS/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

export let requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter))
        let data = await usersApi.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }
};

const toggleFollow = async (userId: number, followApi: FollowApiMethod, successAction: any, dispatch: any): Promise<void> => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await followApi(userId);
    if (data.resultCode === 0) {
        dispatch(successAction(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): Promise<void> => {
        return toggleFollow(userId, followApi.followUser, actions.followSuccess, dispatch);
    };
};

export const unfollow = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): Promise<void> => {
        return toggleFollow(userId, followApi.unfollowUser, actions.unfollowSuccess, dispatch);
    };
};

export default usersReducer;
type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter
export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>
type FollowApiMethod = typeof followApi.followUser | typeof followApi.unfollowUser;