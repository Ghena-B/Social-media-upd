import s from "./Users.module.css";
import React from "react";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";

let Users = (props) => {
    return (<div>
        <Paginator onPageChange={props.onPageChanged}
                   currentPage={props.currentPage}
                   totalCount={props.totalUsersCount}
                   pageSize={props.pageSize}/>
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