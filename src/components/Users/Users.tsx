import React from "react";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import {FilterType, UsersType} from "../../redux/users-reducer";
import {FilterUsersForm} from "../Forms/FilterUsersForm";

type PropsType = {
    onPageChanged: (page: number | "...") => void
    totalUsersCount: number
    currentPage: number
    pageSize: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = (props) => {
    return (<div>
        <FilterUsersForm onFilterChanged={props.onFilterChanged}/>
        <Paginator onPageChange={props.onPageChanged}
                   currentPage={props.currentPage}
                   totalCount={props.totalUsersCount}
                   pageSize={props.pageSize}
        />
        <div>
            {props.users.map(u => <User user={u}
                                        followingInProgress={props.followingInProgress}
                                        follow={props.follow}
                                        unfollow={props.unfollow}
            />)}
        </div>
    </div>)
}
export default Users;

