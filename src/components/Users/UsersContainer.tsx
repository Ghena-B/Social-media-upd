import {connect} from "react-redux";
import React from 'react';
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, unfollow, UsersType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";

type StateType = {}
class UsersC extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onPageChanged = (pageNumber: number | "...") => {
        if (typeof pageNumber === "number") {
            this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
        }
    }
    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
    }

    render() {
        return (<div>
                {this.props.isFetching ? (<Preloader/>) : (<Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        onFilterChanged={this.onFilterChanged}
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
};

type MapStatePropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    currentPage: number
    pageSize: number
    followingInProgress: Array<number>
    isFetching: boolean
    filter: FilterType

}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage:number, pageSize:number, filter: FilterType) => void
}
type OwnPropsType = {}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getUsers: requestUsers, follow, unfollow})(UsersC)
export default UsersContainer;