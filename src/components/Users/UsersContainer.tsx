import {connect} from "react-redux";
import React from 'react';
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import {follow, requestUsers, unfollow, UsersType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";

type StateType = {}
class UsersC extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number | "...") => {
        if (typeof pageNumber === "number") {
            this.props.getUsers(pageNumber, this.props.pageSize)
        }
    }

    render() {
        return (<div>
                {this.props.isFetching ? (<Preloader/>) : (<Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress}
                    />)}
            </div>)
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users, //getUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

type MapStatePropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    currentPage: number
    pageSize: number
    followingInProgress: Array<number>
    isFetching: boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage:number, pageSize:number) => void
}
type OwnPropsType = {}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getUsers: requestUsers, follow, unfollow})(UsersC)
export default UsersContainer;