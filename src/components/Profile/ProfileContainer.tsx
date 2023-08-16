import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "../../hoc/WithRouter";
import {getProfile, getStatus, updateProfileInfo, updateProfilePhoto, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../APItypes/APItypes";


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        const userId = this.props.router.params.userId;
        if (!userId) {
            if (!this.props.authUserId) return

            this.props.router.navigate(`/profile/${this.props.authUserId}`)
        } else {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }
    componentDidUpdate(prevProps: PropsType) {
        const userId = this.props.router.params.userId;
        if (this.props.authUserId !== prevProps.authUserId) {
            this.props.router.navigate(`/profile/${this.props.authUserId}`)
        } else if (userId !== prevProps.router.params.userId) {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }
    render() {
        const isOwner = this.props.router.params.userId == this.props.authUserId;
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                updateProfilePhoto={this.props.updateProfilePhoto}
                isOwner={isOwner}
                updateProfileInfo={this.props.updateProfileInfo}
            />
        )
    }

}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.userId
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updateProfilePhoto, updateProfileInfo}),
    withRouter,
)(ProfileContainer)

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authUserId: number | null
}
type MapDispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updateProfilePhoto: (file: File) => void
    updateProfileInfo: (profile: ProfileType) => Promise<any>
}
type OwnPropsType = {isOwner: boolean, router: RouterType}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

type RouterType = {
    params: {
        userId: number;
    };
    navigate: (path: string) => void;
};
