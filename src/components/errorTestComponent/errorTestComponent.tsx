const ErrorTestComponent = () => {

    return <div>Test</div>

}
export default ErrorTestComponent;

/*import React, {useEffect} from "react";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import {FilterUsersForm} from "../Forms/FilterUsersForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {FilterType, requestUsers} from "../../redux/users-reducer";

type PropsType = {}

export const Users: React.FC<PropsType> = () => {
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number | "...") => {
        if (typeof pageNumber === "number") {
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }
    return (<div>
        <FilterUsersForm onFilterChanged={onFilterChanged}/>
        <Paginator onPageChange={onPageChanged}
                   currentPage={currentPage}
                   totalCount={totalUsersCount}
                   pageSize={pageSize}
        />
        <div>
            {users.map(u => <User user={u}
                                  followingInProgress={followingInProgress}
                                  follow={follow}
                                  unfollow={unfollow}
            />)}
        </div>
    </div>)
}

*/

//Contrainer

/*import {useSelector} from "react-redux";
import React from 'react';
import {Users} from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";

type UsersPagePropsType = {}
const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return (<div>
        {isFetching ? (<Preloader/>) : (<Users
        />)}
    </div>)
}
export default UsersPage;*/